import { BaseTask } from "../BaseTask/BaseTask";
import { Checkbox } from "../Checkbox/Checkbox";
import { Label } from "../Label/Label";
import { DeleteIcon } from "../DeleteIcon/DeleteIcon";
import { TaskRenderProps } from "../../types";

export class Task extends BaseTask {
    /**
     * @override
     * @param props
     * @returns {HTMLElement}
     */
    render(props: TaskRenderProps) {
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
        });
    }
}
