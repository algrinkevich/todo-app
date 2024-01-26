import { TaskAppService } from "../../services/TaskAppService";
import { Header } from "../Header/Header";
import { TopPanel } from "../TopPanel/TopPanel";
import { TasksSection } from "../TasksSection/TasksSection";
import { PopupContainer } from "../PopupContainer/PopupContainer";
import { AddTaskPopup } from "../AddTaskPopup/AddTaskPopup";
import { TasksForTodayPopup } from "../TasksForTodayPopup/TasksForTodayPopup";
import { AppWrapper } from "../AppWrapper/AppWrapper";

import "./App.css";
import { Container } from "../Container/Container";
import { Task } from "../../types";

export class App extends Container {
    server: TaskAppService;
    openedFirstTimeADay: boolean;
    state: {
        tasks: Array<Task>;
        searchQuery: string;
        lastAction: string;
        showPopup: boolean;
        isLoaded: boolean;
    };

    constructor() {
        super({ styleClasses: ["app-container"] });
        const openedDate = new Date().toString().slice(0, 15);
        const previousOpenedDate = localStorage.getItem("lastOpened");
        localStorage.setItem("lastOpened", openedDate);

        this.state = {
            tasks: [],
            searchQuery: "",
            lastAction: null,
            showPopup: false,
            isLoaded: false,
        };
        this.server = new TaskAppService();
        this.server.getTasks().then((response) => {
            this.setState({
                ...this.state,
                tasks: response,
                isLoaded: true,
            });
        });
        // Cannot place it in state since it should be changed during rendering,
        // and this causes unexpected rerendering
        this.openedFirstTimeADay = openedDate !== previousOpenedDate;
    }

    render() {
        const children = [
            new Header().render(),

            new TopPanel({
                onSearch: this.updateQuery,
                searchQuery: this.state.searchQuery,
                isSearchFocused: this.state.lastAction === "Search Query",
                onNewTaskClick: this.showPopup,
            }).render(),

            new TasksSection({
                tasks: this.state.tasks,
                searchQuery: this.state.searchQuery,
                onDeleteTask: this.deleteTask,
                onCompleteTask: this.addCompletedTask,
            }).render(),
        ];
        if (this.state.showPopup) {
            children.push(
                new PopupContainer().render({
                    children: [
                        new AddTaskPopup({
                            onCancel: this.hidePopup,
                            onOk: this.addNewTask,
                        }).render(),
                    ],
                })
            );
        }
        const tasksForToday = this.getTasksForToday();
        if (this.openedFirstTimeADay && tasksForToday.length) {
            children.push(
                new PopupContainer().render({
                    children: [
                        new TasksForTodayPopup({
                            tasks: tasksForToday,
                            onOk: this.hideTodayTasksPopup,
                        }).render(),
                    ],
                })
            );
        }
        if (this.state.isLoaded) {
            this.openedFirstTimeADay = false;
        }
        return super.render({
            children: [
                new AppWrapper().render({
                    children,
                }),
            ],
        });
    }

    getTasksForToday = () => {
        const currentDate = new Date().toString().slice(0, 15);
        const todayTasks = this.state.tasks
            .filter((task) => {
                const newDate = new Date(task.plannedDate)
                    .toString()
                    .slice(0, 15);
                return newDate === currentDate && !task.isCompleted;
            })
            .map((task) => task.title);
        return todayTasks;
    };

    addNewTask = ({ title, date }: { title: string; date: string }) => {
        this.server
            .createTask({ title: title, isCompleted: false, plannedDate: date })
            .then((response) => {
                this.setState({
                    ...this.state,
                    lastAction: "Add Task",
                    tasks: [...this.state.tasks, response],
                    showPopup: false,
                });
            });
    };

    deleteTask = (taskToDelete: Task) => {
        this.server.deleteTask(taskToDelete).then(() => {
            this.setState({
                ...this.state,
                lastAction: "Delete Task",
                tasks: this.state.tasks.filter(
                    (task) => task.id !== taskToDelete.id
                ),
            });
        });
    };

    addCompletedTask = (taskToComplete: Task) => {
        const completedTask = { ...taskToComplete, isCompleted: true };

        this.server.updateTask(completedTask).then(() => {
            this.setState({
                ...this.state,
                lastAction: "Complete Task",
                tasks: this.state.tasks.map((task) => ({
                    ...task,
                    isCompleted:
                        task.isCompleted || task.id === completedTask.id,
                })),
            });
        });
    };

    updateQuery = (query: string) => {
        this.setState({
            ...this.state,
            lastAction: "Search Query",
            searchQuery: query,
        });
    };

    showPopup = () => {
        this.setState({
            ...this.state,
            showPopup: true,
        });
    };

    hidePopup = () => {
        this.setState({
            ...this.state,
            showPopup: false,
        });
    };

    hideTodayTasksPopup = () => {
        this.openedFirstTimeADay = false;
        this.update();
    };
}
