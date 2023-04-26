import { TaskListRenderProps } from "../../types";
import { List } from "../List/List";
import { Task } from "../Task/Task";

export class TaskList extends List {
    private componentProps: TaskListRenderProps;

    constructor(props: TaskListRenderProps) {
        super({ styleClasses: ["task-section"] });
        this.componentProps = { ...props };
    }
    render() {
        return super.render({
            children: this.componentProps.tasks
                .filter((task) =>
                    task.title
                        .toLowerCase()
                        .includes(this.componentProps.searchQuery.toLowerCase())
                )
                .map((task) =>
                    new Task({
                        task: task,
                        onDelete: this.componentProps.onDeleteTask,
                        onComplete: this.componentProps.onCompleteTask,
                    }).render()
                ),
        });
    }
}
