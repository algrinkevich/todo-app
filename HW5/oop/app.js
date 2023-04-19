class App extends Component {
    constructor() {
        super();
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
    /**
     * @override
     * @returns {HTMLElement}
     */
    render() {
        const children = [
            new Header().render(),

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
                    popupComponent: new AddTaskPopup(),
                    onCancel: this.hidePopup,
                    onOk: this.addNewTask,
                })
            );
        }
        const tasksForToday = this.getTasksForToday();
        if (this.openedFirstTimeADay && tasksForToday.length) {
            children.push(
                new PopupContainer().render({
                    popupComponent: new TasksForTodayPopup(tasksForToday),
                    onOk: this.hideTodayTasksPopup,
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
            styleClasses: ["app-container"],
        });
    }

    getTasksForToday = () => {
        const currentDate = new Date().toString().slice(0, 15);
        const todayTasks = [];
        for (let task of this.state.tasks) {
            const newDate = new Date(task.plannedDate).toString().slice(0, 15);
            if (newDate === currentDate) {
                todayTasks.push(task.title);
            }
        }
        return todayTasks;
    };

    addNewTask = ({ title, date }) => {
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

    hideTodayTasksPopup = () => {
        this.openedFirstTimeADay = false;
        this.update();
    };
}

document.body.appendChild(new App().render());
