class TaskAppServer {
    constructor() {}
    getTasks() {
        return fetch("http://localhost:3004/tasks").then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return response.json();
        });
    }

    createTask(title) {
        return fetch("http://localhost:3004/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: title,
                isCompleted: false,
            }),
        }).then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return response.json();
        });
    }
}

class App extends Component {
    constructor() {
        super();
        this.state = {
            allTasks: ["Task 1 Title", "Task 2 Title", "Task 3 Title"],
            completedTasks: [
                "Completed Task 1 Title",
                "Completed Task 2 Title",
                "Completed Task 3 Title",
            ],
            searchQuery: "",
            lastAction: null,
            showPopup: false,
        };
        this.server = new TaskAppServer();
        this.server.getTasks().then((response) => {
            this.setState({
                ...this.state,
                allTasks: response.map((item) => item.title),
            });
        });
    }
    /**
     * @override
     * @returns {HTMLElement}
     */
    render() {
        const children = [
            new Header({ level: 1 }).render({
                text: "To Do List",
                styleClasses: ["app-wraper__header"],
            }),

            new TopPanel().render({
                onSearch: this.updateQuery,
                searchQuery: this.state.searchQuery,
                isSearchFocused: this.state.lastAction === "Search Query",
                onNewTaskClick: this.showPopup,
            }),

            new TasksSection().render({
                allTasks: this.state.allTasks,
                searchQuery: this.state.searchQuery,
                onDeleteTask: this.deleteTask,
                onCompleteTask: this.addCompletedTask,
                completedTasks: this.state.completedTasks,
            }),
        ];
        if (this.state.showPopup) {
            children.push(
                new PopupContainer().render({
                    onCancel: this.hidePopup,
                    onClickAdd: this.addNewTask,
                })
            );
        }
        return super.render({
            children: [
                new AppWrapper().render({
                    children,
                }),
            ],
            styleClasses: ["app-container"],
        });
    }

    addNewTask = (title) => {
        this.server.createTask(title).then((response) => {
            this.setState({
                ...this.state,
                lastAction: "Add Task",
                allTasks: [...this.state.allTasks, title],
                showPopup: false,
            });
        });
    };

    deleteTask = (title) => {
        this.setState({
            ...this.state,
            lastAction: "Delete Task",
            allTasks: this.state.allTasks.filter((task) => task !== title),
        });
    };

    addCompletedTask = (title) => {
        this.setState({
            ...this.state,
            lastAction: "Complete Task",
            allTasks: this.state.allTasks.filter((task) => task !== title),
            completedTasks: [...this.state.completedTasks, title],
        });
    };

    updateQuery = (query) => {
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
}

document.body.appendChild(new App().render());
