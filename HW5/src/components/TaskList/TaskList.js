import { List } from "../List/List.js";
import { Task } from "../Task/Task.js";

export class TaskList extends List {
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
