import { TaskAppService } from "../../services/TaskAppService";
import { Header } from "../Header/Header";
import { TopPanel } from "../TopPanel/TopPanel";
import { TasksSection } from "../TasksSection/TasksSection";
import { PopupContainer } from "../PopupContainer/PopupContainer";
import { AddTaskPopup } from "../AddTaskPopup/AddTaskPopup";
import { TasksForTodayPopup } from "../TasksForTodayPopup/TasksForTodayPopup";

import { Task, TaskTagEnum } from "../../types";
import { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";
import {
    Routes,
    Route,
    Outlet,
    useSearchParams,
    Navigate,
} from "react-router-dom";

const getOpenedDate = () => {
    return new Date().toString().slice(0, 15);
};

const getTasksForToday = (tasks: Task[]) => {
    const currentDate = getOpenedDate();
    const todayTasks = tasks
        .filter((task) => {
            const newDate = new Date(task.plannedDate).toString().slice(0, 15);
            return newDate === currentDate && !task.isCompleted;
        })
        .map((task) => task.title);
    return todayTasks;
};

export const App = () => {
    const [tasks, setTasks] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [editableTask, setEditableTask] = useState(null);
    const [openedFirstTimeADay, setOpenedFirstTimeADay] = useState(false);

    const [searchParams, _] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");

    const server = new TaskAppService();

    useEffect(() => {
        const previousOpenedDate = localStorage.getItem("lastOpened");
        setOpenedFirstTimeADay(
            () => openedFirstTimeADay || getOpenedDate() !== previousOpenedDate
        );
        if (tasks.length) {
            localStorage.setItem("lastOpened", getOpenedDate());
        }
    }, [tasks]);

    useEffect(() => {
        let isCanceled = false;
        server.getTasks().then((response) => {
            if (isCanceled) {
                return;
            }
            setTasks(response);
        });
        return () => {
            isCanceled = true;
        };
    }, []);

    const updateQuery = useCallback((query: string) => {
        setSearchQuery(() => query);
    }, []);

    const deleteTask = useCallback(
        (taskToDelete: Task) => {
            server.deleteTask(taskToDelete).then(() => {
                setTasks(() =>
                    tasks.filter((task) => task.id !== taskToDelete.id)
                );
            });
        },
        [tasks]
    );

    const addCompletedTask = useCallback(
        (taskToComplete: Task) => {
            const completedTask = { ...taskToComplete, isCompleted: true };

            server.updateTask(completedTask).then(() => {
                setTasks(() =>
                    tasks.map((task) => ({
                        ...task,
                        isCompleted:
                            task.isCompleted || task.id === completedTask.id,
                    }))
                );
            });
        },
        [tasks]
    );

    const addNewTask = useCallback(
        ({
            title,
            plannedDate,
            tag,
        }: {
            title: string;
            plannedDate: string;
            tag: TaskTagEnum;
        }) => {
            server
                .createTask({
                    title: title,
                    isCompleted: false,
                    plannedDate: plannedDate,
                    tag: tag,
                })
                .then((response) => {
                    setTasks(() => [...tasks, response]);
                    setShowPopup(() => false);
                });
        },
        [tasks]
    );

    const updateTask = useCallback(
        (task: Task) => {
            server.updateTask(task).then((response) => {
                const newTasks = tasks.map((task) =>
                    task.id === response.id ? response : task
                );
                setTasks(() => newTasks);
                setEditableTask((): null => null);
            });
        },
        [tasks]
    );

    const handleShowPopup = useCallback(() => setShowPopup(true), []);
    const handleHidePopup = useCallback(() => setShowPopup(false), []);
    const resetEditableTask = useCallback(() => {
        setEditableTask(null);
    }, []);

    const handleShowEditPopup = useCallback(
        (task: Task) => setEditableTask(task),
        []
    );

    const popups = [];
    if (showPopup) {
        popups.push(
            <PopupContainer>
                <AddTaskPopup
                    mode="new"
                    onOk={addNewTask}
                    onCancel={handleHidePopup}
                />
            </PopupContainer>
        );
    }
    if (editableTask) {
        popups.push(
            <PopupContainer>
                <AddTaskPopup
                    mode="edit"
                    onOk={updateTask}
                    onCancel={resetEditableTask}
                    task={editableTask}
                />
            </PopupContainer>
        );
    }

    const tasksForToday = useMemo(
        () => getTasksForToday(tasks),
        [tasks, getOpenedDate()]
    );
    if (openedFirstTimeADay && tasksForToday.length) {
        popups.push(
            <PopupContainer>
                <TasksForTodayPopup
                    taskTitles={tasksForToday}
                    onOk={() => setOpenedFirstTimeADay(false)}
                />
            </PopupContainer>
        );
    }

    const makeTaskSection = (searchTag?: TaskTagEnum) => {
        return (
            <TasksSection
                tasks={tasks}
                searchQuery={searchQuery}
                onDeleteTask={deleteTask}
                onCompleteTask={addCompletedTask}
                searchTag={searchTag}
                onEditTask={handleShowEditPopup}
            />
        );
    };

    return (
        <Routes>
            <Route path="/" element={<Navigate to="/tasks" />} />
            <Route
                path="/tasks"
                element={
                    <div className="app-container">
                        <div className="app-wrapper">
                            <Header />
                            <TopPanel
                                onSearch={updateQuery}
                                searchQuery={searchQuery}
                                onNewTaskClick={handleShowPopup}
                            />
                            {...popups}
                            <Outlet />
                        </div>
                    </div>
                }
            >
                <Route path=":tagName" element={makeTaskSection()} />
                <Route index element={makeTaskSection()} />
            </Route>
        </Routes>
        // <div className="app-container">
        //     <div className="app-wrapper">
        //         <Header />
        //         <TopPanel
        //             onSearch={updateQuery}
        //             searchQuery={searchQuery}
        //             onNewTaskClick={handleShowPopup}
        //             onTagChecked={updateSearchTag}
        //         />
        //         <TasksSection
        //             tasks={tasks}
        //             searchQuery={searchQuery}
        //             onDeleteTask={deleteTask}
        //             onCompleteTask={addCompletedTask}
        //             searchTag={searchTag}
        //             onEditTask={handleShowEditPopup}
        //         />
        //         {...popups}
        //     </div>
        // </div>
    );
};
