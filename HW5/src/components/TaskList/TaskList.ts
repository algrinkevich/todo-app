import { TaskListProps } from "../../types";
import { BaseTaskList } from "../BaseTaskList/BaseTaskList";
import { Task } from "../Task/Task";

export class TaskList extends BaseTaskList {
    private componentProps: TaskListProps;

    constructor(props: TaskListProps) {
        super({ styleClasses: [] });
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
