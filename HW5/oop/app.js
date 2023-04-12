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

    render(props) {
        console.log(this.state.items);

        const deleteTask = (title) => {
            this.setState({
                ...this.state,
                lastAction: "Delete Task",
                allTasks: this.state.allTasks.filter((task) => task !== title),
            });
        };

        const addNewTask = (title) => {
            this.setState({
                ...this.state,
                lastAction: "Add Task",
                allTasks: [...this.state.allTasks, title],
                showPopup: false
            });
        }

        const addCompletedTask = (title) => {
            this.setState({
                ...this.state,
                lastAction: "Complete Task",
                allTasks: this.state.allTasks.filter((task) => task !== title),
                completedTasks: [...this.state.completedTasks, title],
            });
        };

        const updateQuery = (query) => {
            this.setState({
                ...this.state,
                lastAction: "Search Query",
                searchQuery: query,
            });
        };

        const showPopup = () => {
            this.setState({
                ...this.state,
                showPopup: true
            })
        };

        const hidePopup = () => {
            this.setState({
                ...this.state,
                showPopup: false
            })
        };

        const children = [
            new Header({ level: 1 }).render({
                text: "To Do List",
                styleClasses: ["app-wraper__header"],
            }),

            new TopPanel().render({
                children: [
                    new Search().render({
                        placeholder: "Search Task",
                        onSearch: updateQuery,
                        query: this.state.searchQuery,
                        isFocused: this.state.lastAction === "Search Query",
                    }),
                    new Button().render({
                        text: "+ New Task",
                        onClick: showPopup,
                        styleClasses: [
                            "new-task-btn",
                            "top-panel__new-task-btn",
                            "confirm-btn",
                        ],
                    }),
                ],
            }),

            new TasksSection().render({
                children: [
                    new Header({ level: 2 }).render({
                        text: "All Tasks",
                        styleClasses: ["tasks-section__subheader"],
                    }),
                    new List().render({
                        //items: createTasks(),
                        items: this.state.allTasks
                            .filter((title) =>
                                title
                                    .toLowerCase()
                                    .includes(
                                        this.state.searchQuery.toLowerCase()
                                    )
                            )
                            .map((title) =>
                                new Task().render({
                                    title: title,
                                    onDelete: deleteTask,
                                    onComplete: addCompletedTask,
                                })
                            ),
                        styleClasses: "task-section",
                    }),
                    new Header({ level: 2 }).render({
                        text: "Completed Tasks",
                        styleClasses: ["tasks-section__subheader"],
                    }),
                    new List().render({
                        // items: createTasks(),
                        items: this.state.completedTasks.map((title) =>
                            new CompletedTask().render({
                                title: title,
                            })
                        ),
                        styleClasses: "task-section",
                    }),
                ],
            }),
        ];
        if (this.state.showPopup) {
            children.push(new PopupContainer().render({
                onCancel: hidePopup,
                onClickAdd: addNewTask
            }));
        }
        return super.render({
            children: [new AppWrapper().render({
                children
            })],
            styleClasses: ["app-container"]
        });
    }

    addItem = () => {
        this.setState({
            items: [
                ...this.state.items,
                "item" + (this.state.items.length + 1),
            ],
        });
    };
}

document.body.appendChild(new App().render());
