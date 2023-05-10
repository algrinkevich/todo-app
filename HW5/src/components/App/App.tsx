import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Header } from "../Header/Header";
import { TopPanel } from "../TopPanel/TopPanel";
import { TasksSection } from "../TasksSection/TasksSection";
import { PopupContainer } from "../PopupContainer/PopupContainer";
import { AddTaskPopup } from "../AddTaskPopup/AddTaskPopup";
import { TasksForTodayPopup } from "../TasksForTodayPopup/TasksForTodayPopup";
import { Task } from "../../types";
import { AppDispatch } from "../../store";
import {
    showAddPopupSelector,
    showEditPopupSelector,
} from "../../slices/popups";
import {
    CURRENT_TASKS,
    fetchTasks,
    reinitFromLocalStorage,
    tasksSelector,
} from "../../slices/tasks";

import "./App.css";

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
    const dispatch = useDispatch<AppDispatch>();
    const tasks = useSelector(tasksSelector);
    const showAddPopup = useSelector(showAddPopupSelector);
    const showEditPopup = useSelector(showEditPopupSelector);
    const [openedFirstTimeADay, setOpenedFirstTimeADay] = useState(false);

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
        addEventListener("storage", (event) => {
            if (event.key === CURRENT_TASKS) {
                dispatch(reinitFromLocalStorage());
            }
        });
    }, []);

    useEffect(() => {
        dispatch(fetchTasks());
    }, []);

    const popups = [];
    if (showAddPopup) {
        popups.push(
            <PopupContainer>
                <AddTaskPopup mode="new" />
            </PopupContainer>
        );
    }
    if (showEditPopup) {
        popups.push(
            <PopupContainer>
                <AddTaskPopup mode="edit" />
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
        <Routes>
            <Route path="/" element={<Navigate to="/tasks" />} />
            <Route
                path="/tasks"
                element={
                    <div className="app-container">
                        <div className="app-wrapper">
                            <Header />
                            <TopPanel />
                            {...popups}
                            <Outlet />
                        </div>
                    </div>
                }
            >
                <Route path=":pathTagName" element={<TasksSection />} />
                <Route index element={<TasksSection />} />
            </Route>
        </Routes>
    );
};
