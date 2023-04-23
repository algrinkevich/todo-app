import { Component } from "../Component/Component";
import { Heading } from "../Heading/Heading";
import { TaskList } from "../TaskList/TaskList";
import { CompletedTaskList } from "../CompletedTaskList/CompletedTaskList";
import "./TasksSection.css";
import { TasksSectionRenderProps } from "../../types";

export class TasksSection extends Component<HTMLElement> {
    /**
     * @override
     * @param props
     * @returns {HTMLElement}
     */
    constructor() {
        super();
        this.element = document.createElement("section");
    }
    render(props: TasksSectionRenderProps) {
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
