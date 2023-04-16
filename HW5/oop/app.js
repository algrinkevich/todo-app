class App extends Component {
    constructor() {
        super();
        this.state = {
            tasks: [],
            searchQuery: "",
            lastAction: null,
            showPopup: false,
        };
        this.server = new TaskAppServer();
        this.server.getTasks().then((response) => {
            this.setState({
                ...this.state,
                tasks: response,
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
                tasks: this.state.tasks,
                searchQuery: this.state.searchQuery,
                onDeleteTask: this.deleteTask,
                onCompleteTask: this.addCompletedTask,
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
        this.server
            .createTask({ title: title, isCompleted: false })
            .then((response) => {
                this.setState({
                    ...this.state,
                    lastAction: "Add Task",
                    tasks: [...this.state.tasks, response],
                    showPopup: false,
                });
            });
    };

    deleteTask = (taskToDelete) => {
        this.server.deleteTask(taskToDelete).then((response) => {
            this.setState({
                ...this.state,
                lastAction: "Delete Task",
                tasks: this.state.tasks.filter(
                    (task) => task.id !== taskToDelete.id
                ),
            });
        });
    };

    addCompletedTask = (taskToComplete) => {
        const completedTask = { ...taskToComplete, isCompleted: true };

        this.server.updateTask(completedTask).then((response) => {
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
