class Button extends Component {
    constructor() {
        super();
        this.element = document.createElement("button");
    }

    /**
     * @override
     * @param props
     * @param props.text {string}
     * @param props.onClick {function}
     * @returns {HTMLElement}
     */
    render(props) {
        if (props.type) {
            this.element.type = props.type;
        }
        if (props.enabled === false) {
            this.element.disabled = "true";
        }
        return super.render({
            onClick: props.onClick,
            children: props.text,
            styleClasses: props.styleClasses,
        });
    }
}

class AppWrapper extends Component {
    render(props) {
        return super.render({
            children: props.children,
            styleClasses: ["app-wrapper"],
        });
    }
}

class List extends Component {
    constructor() {
        super();
        this.element = document.createElement("ul");
    }

    /**
     * @override
     * @param props
     * @param props.items {string[]}
     * @param props.addItem {function}
     * @returns {HTMLElement}
     */
    render(props) {
        return super.render({
            children: [
                ...props.items.map((item) => {
                    return new ListItem().render({ children: [item] });
                }),
            ],
        });
    }
}

class ListItem extends Component {
    render(props) {
        return super.render({
            children: props.children,
        });
    }
}

class Header extends Component {
    constructor({ level }) {
        super();
        this.element = document.createElement(`h${level}`);
    }

    render(props) {
        return super.render({
            children: [props.text],
            styleClasses: props.styleClasses,
        });
    }
}

class InputText extends Component {
    constructor() {
        super();
        this.element = document.createElement(`input`);
    }

    render(props) {
        this.element.oninput = props.onInput;
        this.element.name = props.name;
        this.element.type = props.type;
        this.element.value = props.value;
        this.element.autocomplete = "off";
        this.element.placeholder = props.placeholder;
        this.element.classList.add("input-text");
        if (props.setFocus) {
            setTimeout(() => {
                this.element.focus();
            }, 0);
        }
        return super.render({
            children: [],
        });
    }
}

class Search extends InputText {
    render(props) {
        return super.render({
            placeholder: props.placeholder,
            onInput: () => props.onSearch(this.element.value),
            name: "search",
            type: "search",
            value: props.query,
            setFocus: props.isFocused,
        });
    }
}

class TopPanel extends Component {
    render(props) {
        return super.render({
            children: [
                new Search().render({
                    placeholder: "Search Task",
                    onSearch: props.onSearch,
                    query: props.searchQuery,
                    isFocused: props.isSearchFocused,
                }),
                new Button().render({
                    text: "+ New Task",
                    onClick: props.onNewTaskClick,
                    styleClasses: [
                        "new-task-btn",
                        "top-panel__new-task-btn",
                        "confirm-btn",
                    ],
                }),
            ],
            styleClasses: ["top-panel"],
        });
    }
}

class TaskList extends List {
    render(props) {
        return super.render({
            items: props.tasks
                .filter((title) =>
                    title
                        .toLowerCase()
                        .includes(props.searchQuery.toLowerCase())
                )
                .map((title) =>
                    new Task().render({
                        title: title,
                        onDelete: props.onDeleteTask,
                        onComplete: props.onCompleteTask,
                    })
                ),
            styleClasses: "task-section",
        });
    }
}

class TasksSection extends Component {
    render(props) {
        return super.render({
            children: [
                new Header({ level: 2 }).render({
                    text: "All Tasks",
                    styleClasses: ["tasks-section__subheader"],
                }),
                new TaskList().render({
                    tasks: props.allTasks,
                    onDeleteTask: props.onDeleteTask,
                    onCompleteTask: props.onCompleteTask,
                    searchQuery: props.searchQuery
                }),
                new Header({ level: 2 }).render({
                    text: "Completed Tasks",
                    styleClasses: ["tasks-section__subheader"],
                }),
                new List().render({
                    items: props.completedTasks.map((title) =>
                        new CompletedTask().render({
                            title: title,
                        })
                    ),
                    styleClasses: "task-section",
                }),
            ],
            styleClasses: ["tasks-section"],
        });
    }
}

class CompletedTask extends Component {
    render(props) {
        return super.render({
            children: [
                new DisabledCheckbox().render({
                    title: props.title,
                }),
                new Label().render({
                    title: props.title,
                    styleClasses: [
                        "task-row__title",
                        "task-row__title--completed",
                    ],
                }),
            ],
            styleClasses: ["task-row"],
        });
    }
}

class Task extends Component {
    render(props) {
        return super.render({
            children: [
                new Checkbox().render({
                    title: props.title,
                    onChecked: props.onComplete,
                }),
                new Label().render({
                    title: props.title,
                    styleClasses: ["task-row__title"],
                }),
                new DeleteIcon().render({
                    onClick: () => props.onDelete(props.title),
                }),
            ],
            styleClasses: ["task-row"],
        });
    }
}

class Checkbox extends Component {
    constructor() {
        super();
        this.element = document.createElement(`input`);
    }
    render(props) {
        this.element.type = "checkbox";
        this.element.value = props.title;
        this.element.onchange = () => {
            if (this.element.checked) {
                props.onChecked(props.title);
            }
        };
        return super.render({
            children: [],
            styleClasses: ["checkbox"],
        });
    }
}

class DisabledCheckbox extends Checkbox {
    render(props) {
        this.element.checked = "true";
        this.element.disabled = "true";
        return super.render({
            title: props.title,
        });
    }
}

class Label extends Component {
    constructor() {
        super();
        this.element = document.createElement(`label`);
    }
    render(props) {
        return super.render({
            children: [props.title],
            styleClasses: props.styleClasses,
        });
    }
}

class Image extends Component {
    constructor() {
        super();
        this.element = document.createElement(`img`);
    }
    render(props) {
        this.element.src = props.src;
        return super.render({
            children: [],
            styleClasses: props.styleClasses,
            onClick: props.onClick,
        });
    }
}

class DeleteIcon extends Image {
    render(props) {
        return super.render({
            styleClasses: ["bucket-icon"],
            onClick: props.onClick,
            src: "bucket.svg",
        });
    }
}

class PopupContainer extends Component {
    render(props) {
        return super.render({
            children: [
                new Popup().render({
                    onCancel: props.onCancel,
                    onClickAdd: props.onClickAdd,
                }),
                new Overlay().render({}),
            ],
        });
    }
}
class Popup extends Component {
    render(props) {
        return super.render({
            children: [
                new Header({ level: 1 }).render({
                    text: "Add New Task",
                }),
                new Form().render({
                    onCancel: props.onCancel,
                    onClickAdd: props.onClickAdd,
                }),
            ],
            styleClasses: ["popup"],
        });
    }
}

class Overlay extends Component {
    render(props) {
        return super.render({
            children: [],
            styleClasses: ["overlay"],
        });
    }
}

class Form extends Component {
    constructor() {
        super();
        this.element = document.createElement(`form`);
    }
    render(props) {
        this.element.onsubmit = (event) => {
            event.preventDefault();
            if (!taskInput.value) {
                return;
            }
            props.onClickAdd(taskInput.value);
        };
        const taskInput = new InputText().render({
            placeholder: "Task Title",
            onInput: () => {
                if (taskInput.value) {
                    addButton.removeAttribute("disabled");
                } else {
                    addButton.disabled = "true";
                }
            },
            value: "",
            name: "taskTitle",
            setFocus: true,
        });
        const [cancelButton, addButton] = [
            new Button().render({
                text: "Cancel",
                onClick: props.onCancel,
                styleClasses: ["cancel-btn"],
                type: "reset",
            }),
            new Button().render({
                text: "Add Task",
                enabled: false,
                styleClasses: ["add-task-btn", "confirm-btn"],
                type: "submit",
            }),
        ];
        return super.render({
            children: [taskInput, cancelButton, addButton],
        });
    }
}
