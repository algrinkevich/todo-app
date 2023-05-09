import {
    Routes,
    Route,
    Outlet,
    useSearchParams,
    Navigate,
} from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Header } from "../Header/Header";
import { TopPanel } from "../TopPanel/TopPanel";
import { TasksSection } from "../TasksSection/TasksSection";
import { PopupContainer } from "../PopupContainer/PopupContainer";
import { AddTaskPopup } from "../AddTaskPopup/AddTaskPopup";
import { TasksForTodayPopup } from "../TasksForTodayPopup/TasksForTodayPopup";
import { Task, TaskTagEnum } from "../../types";
import { AppDispatch } from "../../store";
import {
    showAddPopupSelector,
    showEditPopupSelector,
} from "../../slices/popups";
import { fetchTasks, tasksSelector } from "../../slices/tasks";

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

    const [searchParams, _] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");

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
        dispatch(fetchTasks());
    }, []);

    const updateQuery = useCallback((query: string) => {
        setSearchQuery(() => query);
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

    const makeTaskSection = (searchTag?: TaskTagEnum) => {
        return <TasksSection searchQuery={searchQuery} searchTag={searchTag} />;
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
    );
};
