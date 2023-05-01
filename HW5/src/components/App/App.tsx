import { TaskAppService } from "../../services/TaskAppService";
import { Header } from "../Header/Header";
import { TopPanel } from "../TopPanel/TopPanel";
import { TasksSection } from "../TasksSection/TasksSection";
import { PopupContainer } from "../PopupContainer/PopupContainer";
import { AddTaskPopup } from "../AddTaskPopup/AddTaskPopup";
import { TasksForTodayPopup } from "../TasksForTodayPopup/TasksForTodayPopup";

import "./App.css";
import { Task } from "../../types";
import { useEffect, useRef, useState } from "react";

const getOpenedDate = () => {
    return new Date().toString().slice(0, 15);
};

export function App() {
    const [tasks, setTasks] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [lastAction, setLastAction] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [openedFirstTimeADay, setOpenedFirstTimeADay] = useState(false);

    const server = new TaskAppService();

    useEffect(() => {
        localStorage.setItem("lastOpened", getOpenedDate());
    }, []);

    useEffect(() => {
        const previousOpenedDate = localStorage.getItem("lastOpened");
        setOpenedFirstTimeADay(getOpenedDate() !== previousOpenedDate);
    }, []);

    useEffect(() => {
        server.getTasks().then((response) => setTasks(response));
    }, []);

    const updateQuery = (query: string) => {
        setLastAction(() => "Search Query");
        setSearchQuery(() => query);
    };

    const deleteTask = (taskToDelete: Task) => {
        server.deleteTask(taskToDelete).then(() => {
            setLastAction(() => "Delete Task");
            setTasks(() => tasks.filter((task) => task.id !== taskToDelete.id));
        });
    };

    const addCompletedTask = (taskToComplete: Task) => {
        const completedTask = { ...taskToComplete, isCompleted: true };

        server.updateTask(completedTask).then(() => {
            setLastAction(() => "Complete Task");
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
                setLastAction(() => "Add Task");
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

    const ref = useRef(null);

    useEffect(() => {
        ref.current.innerHTML = "";
        const children = [
            new Header().render(),

            new TopPanel({
                onSearch: updateQuery,
                searchQuery: searchQuery,
                isSearchFocused: lastAction === "Search Query",
                onNewTaskClick: () => setShowPopup(true),
            }).render(),

            new TasksSection({
                tasks: tasks,
                searchQuery: searchQuery,
                onDeleteTask: deleteTask,
                onCompleteTask: addCompletedTask,
            }).render(),
        ];
        if (showPopup) {
            children.push(
                new PopupContainer().render({
                    children: [
                        new AddTaskPopup({
                            onCancel: () => setShowPopup(false),
                            onOk: addNewTask,
                        }).render(),
                    ],
                })
            );
        }
        const tasksForToday = getTasksForToday();
        if (openedFirstTimeADay && tasksForToday.length) {
            children.push(
                new PopupContainer().render({
                    children: [
                        new TasksForTodayPopup({
                            tasks: tasksForToday,
                            onOk: () => setOpenedFirstTimeADay(false),
                        }).render(),
                    ],
                })
            );
        }
        ref.current.append(...children);
    }, [tasks, searchQuery, lastAction, openedFirstTimeADay, showPopup]);

    return (
        <div className="app-container">
            <div className="app-wrapper" ref={ref}></div>
        </div>
    );
}
