import { Component } from "../Component/Component.js";
import { Heading } from "../Heading/Heading.js";
import { TaskList } from "../TaskList/TaskList.js";
import { CompletedTaskList } from "../CompletedTaskList/CompletedTaskList.js";
import "./TasksSection.css";

export class TasksSection extends Component {
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
