import { TaskAppService } from "../../services/TaskAppService";
import { Header } from "../Header/Header";
import { TopPanel } from "../TopPanel/TopPanel";
import { TasksSection } from "../TasksSection/TasksSection";
import { PopupContainer } from "../PopupContainer/PopupContainer";
import { AddTaskPopup } from "../AddTaskPopup/AddTaskPopup";
import { TasksForTodayPopup } from "../TasksForTodayPopup/TasksForTodayPopup";

import "./App.css";
import { Task } from "../../types";
import { useCallback, useEffect, useMemo, useState } from "react";

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
    const [searchQuery, setSearchQuery] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [openedFirstTimeADay, setOpenedFirstTimeADay] = useState(false);

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
        server.getTasks().then((response) => setTasks(response));
    }, []);

    const updateQuery = useCallback((query: string) => {
        setSearchQuery(() => query);
    }, []);

    const deleteTask = useCallback((taskToDelete: Task) => {
        server.deleteTask(taskToDelete).then(() => {
            setTasks(() => tasks.filter((task) => task.id !== taskToDelete.id));
        });
    }, [tasks]);

    const addCompletedTask = useCallback((taskToComplete: Task) => {
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
    }, [tasks]);

    const addNewTask = useCallback(
        ({ title, date }: { title: string; date: string }) => {
            server
                .createTask({
                    title: title,
                    isCompleted: false,
                    plannedDate: date,
                })
                .then((response) => {
                    setTasks(() => [...tasks, response]);
                    setShowPopup(() => false);
                });
        },
        [tasks]
    );

    const handleShowPopup = useCallback(() => setShowPopup(true), []);
    const handleHidePopup = useCallback(() => setShowPopup(false), []);

    const popups = [];
    if (showPopup) {
        popups.push(
            <PopupContainer>
                <AddTaskPopup onOk={addNewTask} onCancel={handleHidePopup} />
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

    return (
        <div className="app-container">
            <div className="app-wrapper">
                <Header />
                <TopPanel
                    onSearch={updateQuery}
                    searchQuery={searchQuery}
                    onNewTaskClick={handleShowPopup}
                />
                <TasksSection
                    tasks={tasks}
                    searchQuery={searchQuery}
                    onDeleteTask={deleteTask}
                    onCompleteTask={addCompletedTask}
                />
                {...popups}
            </div>
        </div>
    );
};
