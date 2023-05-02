import { TaskAppService } from "../../services/TaskAppService";
import { Header } from "../Header/Header";
import { TopPanel } from "../TopPanel/TopPanel";
import { TasksSection } from "../TasksSection/TasksSection";
import { PopupContainer } from "../PopupContainer/PopupContainer";
import { AddTaskPopup } from "../AddTaskPopup/AddTaskPopup";
import { TasksForTodayPopup } from "../TasksForTodayPopup/TasksForTodayPopup";

import "./App.css";
import { Task } from "../../types";
import { useEffect, useState } from "react";

const getOpenedDate = () => {
    return new Date().toString().slice(0, 15);
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

    const updateQuery = (query: string) => {
        setSearchQuery(() => query);
    };

    const deleteTask = (taskToDelete: Task) => {
        server.deleteTask(taskToDelete).then(() => {
            setTasks(() => tasks.filter((task) => task.id !== taskToDelete.id));
        });
    };

    const addCompletedTask = (taskToComplete: Task) => {
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
    };

    const addNewTask = ({ title, date }: { title: string; date: string }) => {
        server
            .createTask({ title: title, isCompleted: false, plannedDate: date })
            .then((response) => {
                setTasks(() => [...tasks, response]);
                setShowPopup(() => false);
            });
    };

    const getTasksForToday = () => {
        const currentDate = getOpenedDate();
        const todayTasks = tasks
            .filter((task) => {
                const newDate = new Date(task.plannedDate)
                    .toString()
                    .slice(0, 15);
                return newDate === currentDate && !task.isCompleted;
            })
            .map((task) => task.title);
        return todayTasks;
    };

    const popups = [];
    if (showPopup) {
        popups.push(
            <PopupContainer>
                <AddTaskPopup
                    onOk={addNewTask}
                    onCancel={() => setShowPopup(false)}
                />
            </PopupContainer>
        );
    }
    const tasksForToday = getTasksForToday();
    if (openedFirstTimeADay && tasksForToday.length) {
        popups.push(
            <PopupContainer>
                <TasksForTodayPopup
                    tasks={tasksForToday}
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
                    onNewTaskClick={() => setShowPopup(true)}
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
