import { List } from "../List/List.js";
import { CompletedTask } from "../CompletedTask/CompletedTask.js";

export class CompletedTaskList extends List {
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
