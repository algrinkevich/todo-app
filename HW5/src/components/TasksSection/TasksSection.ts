import { Component } from "../Component/Component";
import { Heading } from "../Heading/Heading";
import { TaskList } from "../TaskList/TaskList";
import { CompletedTaskList } from "../CompletedTaskList/CompletedTaskList";
import "./TasksSection.css";
import { TasksSectionRenderProps } from "../../types";

export class TasksSection extends Component<HTMLElement> {
    private componentProps: TasksSectionRenderProps;

    constructor(props: TasksSectionRenderProps) {
        super({ styleClasses: ["tasks-section"] });
        this.element = document.createElement("section");
        this.componentProps = { ...props };
    }
    render() {
        return super.render({
            children: [
                new Heading({
                    level: 2,
                    text: "All Tasks",
                    styleClasses: ["tasks-section__subheading", "subheading"],
                }).render(),
                new TaskList({
                    tasks: this.componentProps.tasks.filter(
                        (task) => !task.isCompleted
                    ),
                    onDeleteTask: this.componentProps.onDeleteTask,
                    onCompleteTask: this.componentProps.onCompleteTask,
                    searchQuery: this.componentProps.searchQuery,
                }).render(),
                new Heading({
                    level: 2,
                    text: "Completed Tasks",
                    styleClasses: ["tasks-section__subheading", "subheading"],
                }).render(),
                new CompletedTaskList({
                    tasks: this.componentProps.tasks.filter((task) => task.isCompleted),
                }).render(),
            ],
        });
    }
}
