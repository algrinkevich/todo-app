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
    }

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
                onNewTaskClick: this.showPopup
            }),

            new TasksSection().render({
                allTasks: this.state.allTasks,
                searchQuery: this.state.searchQuery,
                onDeleteTask: this.deleteTask,
                onCompleteTask: this.addCompletedTask,
                completedTasks: this.state.completedTasks
            }),
        ];
        if (this.state.showPopup) {
            children.push(new PopupContainer().render({
                onCancel: this.hidePopup,
                onClickAdd: this.addNewTask
            }));
        }
        return super.render({
            children: [new AppWrapper().render({
                children
            })],
            styleClasses: ["app-container"]
        });
    }

    addNewTask = (title) => {
        this.setState({
            ...this.state,
            lastAction: "Add Task",
            allTasks: [...this.state.allTasks, title],
            showPopup: false
        });
    }
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
            showPopup: true
        })
    };

    hidePopup = () => {
        this.setState({
            ...this.state,
            showPopup: false
        })
    };
}

document.body.appendChild(new App().render());
