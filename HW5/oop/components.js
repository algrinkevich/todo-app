class Container extends Component {}

class Header extends Component {
    /**
     * @override
     * @param props
     * @returns {HTMLElement}
     */
    constructor() {
        super();
        this.element = document.createElement("header");
    }
    render(props) {
        return super.render({
            children: [
                new Heading({ level: 1 }).render({
                    text: "To Do List",
                    styleClasses: ["app-wraper__heading", "heading"],
                }),
                new WeatherWidget().render({
                    styleClasses: ["weather"],
                }),
            ],
            styleClasses: ["header"],
        });
    }
}

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
            styleClasses: props.styleClasses,
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
    constructor() {
        super();
        this.element = document.createElement("li");
    }
    render(props) {
        return super.render({
            children: props.children,
        });
    }
}

class Heading extends Component {
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
        if (props.setFocus) {
            setTimeout(() => {
                this.element.focus();
            }, 0);
        }
        return super.render({
            children: [],
            styleClasses: ["input-text", ...(props.styleClasses || [])],
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
            styleClasses: ["task-section"],
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
            styleClasses: ["task-section"],
        });
    }
}

class TasksSection extends Component {
    /**
     * @override
     * @param props
     * @returns {HTMLElement}
     */
    constructor() {
        super();
        this.element = document.createElement("section");
    }
    render(props) {
        return super.render({
            children: [
                new Heading({ level: 2 }).render({
                    text: "All Tasks",
                    styleClasses: ["tasks-section__subheading", "subheading"],
                }),
                new TaskList().render({
                    tasks: props.tasks.filter((task) => !task.isCompleted),
                    onDeleteTask: props.onDeleteTask,
                    onCompleteTask: props.onCompleteTask,
                    searchQuery: props.searchQuery,
                }),
                new Heading({ level: 2 }).render({
                    text: "Completed Tasks",
                    styleClasses: ["tasks-section__subheading", "subheading"],
                }),
                new CompletedTaskList().render({
                    tasks: props.tasks.filter((task) => task.isCompleted),
                }),
            ],
            styleClasses: ["tasks-section"],
        });
    }
}

class BaseTask extends Component {
    formatTaskDate(taskDate) {
        let plannedDate = new Date(taskDate);
        plannedDate.setHours(0);
        const currentDate = new Date();
        currentDate.setHours(0);
        currentDate.setMinutes(0);
        currentDate.setSeconds(0);
        currentDate.setMilliseconds(0);
        const tomorrowDate = new Date(currentDate);
        tomorrowDate.setDate(currentDate.getDate() + 1);
        const afterTomorrowDate = new Date(tomorrowDate);
        afterTomorrowDate.setDate(tomorrowDate.getDate() + 1);

        let formattedDate = null;

        if (plannedDate < tomorrowDate && plannedDate >= currentDate) {
            formattedDate = "Today";
        } else if (
            plannedDate >= tomorrowDate &&
            plannedDate < afterTomorrowDate
        ) {
            formattedDate = "Tomorrow";
        } else {
            let options = {
                weekday: "long",
                day: "numeric",
                month: "long",
            };
            const [weekdayPart, _, monthPart, __, dayPart] =
                new Intl.DateTimeFormat("en-US", options).formatToParts(
                    plannedDate
                );
            formattedDate = `${weekdayPart.value}, ${
                dayPart.value
            } ${monthPart.value.slice(0, 3)}`;
        }
        return formattedDate;
    }
}

class CompletedTask extends BaseTask {
    /**
     * @override
     * @param props
     * @returns {HTMLElement}
     */
    render(props) {
        const formattedDate = this.formatTaskDate(props.task.plannedDate);
        return super.render({
            children: [
                new DisabledCheckbox().render({
                    title: props.task.title,
                }),
                new Label().render({
                    date: formattedDate,
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

class Task extends BaseTask {
    /**
     * @override
     * @param props
     * @returns {HTMLElement}
     */
    render(props) {
        const formattedDate = this.formatTaskDate(props.task.plannedDate);
        return super.render({
            children: [
                new Checkbox().render({
                    title: props.task.title,
                    onChecked: () => props.onComplete(props.task),
                }),
                new Label().render({
                    date: formattedDate,
                    title: props.task.title,
                    styleClasses: ["task-row__title"],
                }),
                new DeleteIcon().render({
                    onClick: () => props.onDelete(props.task),
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
            children: [
                props.title,
                new Text().render({
                    text: props.date,
                    styleClasses: ["task-row__date"],
                }),
            ],
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
                props.popupComponent.render({
                    onCancel: props.onCancel,
                    onClickAdd: props.onClickAdd,
                }),
                new Overlay().render({}),
            ],
        });
    }
}
class AddTaskPopup extends Component {
    /**
     * @override
     * @param props
     * @returns {HTMLElement}
     */
    render(props) {
        return super.render({
            children: [
                new Heading({ level: 2 }).render({
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

class TasksForTodayPopup extends Component {
    constructor(tasks) {
        super();
        this.tasks = tasks;
    }

    getTasksForToday() {
        const currentDate = new Date();
        const todayTasks = [];
        currentDate.setHours(0);
        currentDate.setMinutes(0);
        currentDate.setSeconds(0);
        currentDate.setMilliseconds(0);
        for (let task of this.tasks) {
            let copyTask = { ...task };
            const newDate = new Date(copyTask.plannedDate);
            newDate.setHours(0);
            newDate.setMinutes(0);
            newDate.setSeconds(0);

            if (newDate.toString() === currentDate.toString()) {
                todayTasks.push(copyTask.title);
            }
        }
        return new List().render({
            items: todayTasks,
            styleClasses: ["popup__tasks-list"],
        });
    }
    /**
     * @override
     * @param props
     * @returns {HTMLElement}
     */
    render(props) {
        return super.render({
            children: [
                new Heading({ level: 2 }).render({
                    text: "Good Morning",
                }),
                new Text().render({
                    text: "You have the next planned tasks for today:",
                    styleClasses: ["popup__text"],
                }),

                this.getTasksForToday(),

                new Button().render({
                    text: "Ok",
                    enabled: true,
                    styleClasses: [
                        "general-btn",
                        "confirm-btn",
                        "element-whole-width",
                    ],
                    type: "button",
                    onClick: props.onClickAdd,
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
            type: "text",
            styleClasses: ["popup__input-text"],
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
            if (!taskInput.value || !datePicker.value) {
                return;
            }
            props.onClickAdd({
                title: taskInput.value,
                date: datePicker.value,
            });
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
            styleClasses: ["general-btn", "confirm-btn"],
            type: "submit",
        });
        const buttonsContainer = new Container().render({
            children: [cancelButton, addButton],
            styleClasses: ["buttons-container"],
        });
        const taskInput = new TaskTitleInput().render({
            type: "text",
            addButton,
        });
        const datePicker = new DatePicker().render({
            name: "planned-date",
            styleClasses: ["date-picker", "popup__date-picker"],
        });
        return super.render({
            children: [taskInput, datePicker, buttonsContainer],
            styleClasses: ["create-task-form"],
        });
    }
}

class Text extends Component {
    /**
     * @override
     * @param props
     * @returns {HTMLElement}
     */
    constructor() {
        super();
        this.element = document.createElement(`p`);
    }
    render(props) {
        return super.render({
            children: [props.text],
            styleClasses: props.styleClasses,
        });
    }
}

class WeatherWidget extends Component {
    constructor() {
        super();
        this.state = { temperature: null, icon: null, city: null };
        this.server = new WeatherService();

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                this.updateWeather({
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude,
                });
            },
            (error) => {
                const TBILISI_LATITUDE = 41.6938;
                const TBILISI_LONGITUDE = 44.8015;
                this.updateWeather({
                    latitude: TBILISI_LATITUDE,
                    longitude: TBILISI_LONGITUDE,
                });
            }
        );
    }

    updateWeather({ latitude, longitude }) {
        this.server
            .getWeather({
                latitude: latitude,
                longitude: longitude,
            })
            .then((response) => {
                this.setState({
                    ...this.state,
                    temperature: response.current.temp_c,
                    icon: response.current.condition.icon,
                    city: response.location.name,
                });
            });
    }

    render(props) {
        let children = [];
        if (this.state.icon) {
            children = [
                new Image().render({
                    src: this.state.icon,
                    styleClasses: ["weather__icon"],
                }),
                new Heading({ level: 3 }).render({
                    text: `${this.state.temperature}°`,
                    styleClasses: ["weather__temperature"],
                }),
                new Text().render({
                    text: this.state.city,
                    styleClasses: ["weather__city"],
                }),
            ];
        }
        return super.render({
            children: children,
            styleClasses: props.styleClasses,
        });
    }
}

class DatePicker extends Component {
    /**
     * @override
     * @param props
     * @returns {HTMLElement}
     */
    constructor() {
        super();
        this.element = document.createElement(`input`);
    }
    render(props) {
        this.element.name = props.name;
        this.element.type = "date";
        this.element.valueAsDate = new Date();

        return super.render({
            children: [],
            styleClasses: props.styleClasses,
        });
    }
}
