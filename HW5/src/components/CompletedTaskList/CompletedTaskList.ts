import { List } from "../List/List";
import { CompletedTask } from "../CompletedTask/CompletedTask";
import { BaseTaskListRenderProps } from "../../types";

export class CompletedTaskList extends List {
    /**
     * @override
     * @param props
     * @returns {HTMLElement}
     */
    render(props: BaseTaskListRenderProps) {
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
