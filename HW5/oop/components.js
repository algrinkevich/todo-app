class Button extends Component {
    constructor() {
        super();
        this.element = document.createElement("button");
    }

    /**
     * @override
     * @param props
     * @param {string} props.text
     * @param {function} props.onClick
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
    /**
     * @override
     * @param props
     * @param {HTMLElement[]} props.children
     * @param {string[]} props.styleClasses
     * @returns {HTMLDivElement}
     */
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
     * @param {string[]} props.items
     * @param {HTMLElement[]} props.children
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
    /**
     * @override
     * @param props
     * @param {HTMLElement[]} props.children
     * @returns {HTMLElement}
     */
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
    /**
     * @override
     * @param props
     * @param {HTMLElement[]} props.children
     * @param {string[]} props.styleClasses
     * @returns {HTMLElement}
     */
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
    /**
     * @override
     * @param props
     * @param {function} props.onInput
     * @param {string} props.name
     * @param {string} props.type
     * @param {string} props.value
     * @param {string} props.placeholder
     * @param {boolean} props.setFocus
     * @returns {HTMLElement}
     */
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
    /**
     * @override
     * @param props
     * @returns {HTMLElement}
     */
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
    /**
     * @override
     * @param props
     * @returns {HTMLElement}
     */
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
    /**
     * @override
     * @param props
     * @returns {HTMLElement}
     */
    render(props) {
        return super.render({
            items: props.tasks
                .filter((task) =>
                    task.title
                        .toLowerCase()
                        .includes(props.searchQuery.toLowerCase())
                )
                .map((task) =>
                    new Task().render({
                        task: task,
                        onDelete: props.onDeleteTask,
                        onComplete: props.onCompleteTask,
                    })
                ),
            styleClasses: "task-section",
        });
    }
}

class CompletedTaskList extends List {
    /**
     * @override
     * @param props
     * @returns {HTMLElement}
     */
    render(props) {
        return super.render({
            items: props.tasks.map((task) =>
                new CompletedTask().render({
                    task,
                })
            ),
            styleClasses: "task-section",
        });
    }
}

class TasksSection extends Component {
    /**
     * @override
     * @param props
     * @returns {HTMLElement}
     */
    render(props) {
        return super.render({
            children: [
                new Header({ level: 2 }).render({
                    text: "All Tasks",
                    styleClasses: ["tasks-section__subheader"],
                }),
                new TaskList().render({
                    tasks: props.tasks.filter((task) => !task.isCompleted),
                    onDeleteTask: props.onDeleteTask,
                    onCompleteTask: props.onCompleteTask,
                    searchQuery: props.searchQuery,
                }),
                new Header({ level: 2 }).render({
                    text: "Completed Tasks",
                    styleClasses: ["tasks-section__subheader"],
                }),
                new CompletedTaskList().render({
                    tasks: props.tasks.filter((task) => task.isCompleted),
                }),
            ],
            styleClasses: ["tasks-section"],
        });
    }
}

class CompletedTask extends Component {
    /**
     * @override
     * @param props
     * @returns {HTMLElement}
     */
    render(props) {
        return super.render({
            children: [
                new DisabledCheckbox().render({
                    title: props.task.title,
                }),
                new Label().render({
                    title: props.task.title,
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
    /**
     * @override
     * @param props
     * @returns {HTMLElement}
     */
    render(props) {
        return super.render({
            children: [
                new Checkbox().render({
                    title: props.task.title,
                    onChecked: props.onComplete,
                }),
                new Label().render({
                    title: props.task.title,
                    styleClasses: ["task-row__title"],
                }),
                new DeleteIcon().render({
                    onClick: () => props.onDelete(props.task.title),
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
    /**
     * @override
     * @param props
     * @returns {HTMLElement}
     */
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
    /**
     * @override
     * @param props
     * @returns {HTMLElement}
     */
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
    /**
     * @override
     * @param props
     * @returns {HTMLElement}
     */
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
    /**
     * @override
     * @param props
     * @returns {HTMLElement}
     */
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
    /**
     * @override
     * @param props
     * @returns {HTMLElement}
     */
    render(props) {
        return super.render({
            styleClasses: ["bucket-icon"],
            onClick: props.onClick,
            src: "images/bucket.svg",
        });
    }
}

class PopupContainer extends Component {
    /**
     * @override
     * @param props
     * @returns {HTMLElement}
     */
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
    /**
     * @override
     * @param props
     * @returns {HTMLElement}
     */
    render(props) {
        return super.render({
            children: [
                new Header({ level: 1 }).render({
                    text: "Add New Task",
                }),
                new AddTaskForm().render({
                    onCancel: props.onCancel,
                    onClickAdd: props.onClickAdd,
                }),
            ],
            styleClasses: ["popup"],
        });
    }
}

class Overlay extends Component {
    /**
     * @override
     * @param props
     * @returns {HTMLElement}
     */
    render(props) {
        return super.render({
            children: [],
            styleClasses: ["overlay"],
        });
    }
}

class TaskTitleInput extends InputText {
    /**
     * @override
     * @param props
     * @returns {HTMLElement}
     */
    render(props) {
        return super.render({
            placeholder: "Task Title",
            onInput: () => {
                if (this.element.value) {
                    props.addButton.removeAttribute("disabled");
                } else {
                    props.addButton.disabled = "true";
                }
            },
            value: "",
            name: "taskTitle",
            setFocus: true,
        });
    }
}

class AddTaskForm extends Component {
    constructor() {
        super();
        this.element = document.createElement(`form`);
    }
    /**
     * @override
     * @param props
     * @returns {HTMLElement}
     */
    render(props) {
        this.element.onsubmit = (event) => {
            event.preventDefault();
            if (!taskInput.value) {
                return;
            }
            props.onClickAdd(taskInput.value);
        };
        const cancelButton = new Button().render({
            text: "Cancel",
            onClick: props.onCancel,
            styleClasses: ["cancel-btn"],
            type: "reset",
        });
        const addButton = new Button().render({
            text: "Add Task",
            enabled: false,
            styleClasses: ["add-task-btn", "confirm-btn"],
            type: "submit",
        });
        const taskInput = new TaskTitleInput().render({
            addButton,
        });
        return super.render({
            children: [taskInput, cancelButton, addButton],
        });
    }
}
