import { BaseTask } from "../BaseTask/BaseTask.js";
import { Checkbox } from "../Checkbox/Checkbox.js";
import { Label } from "../Label/Label.js";
import { DeleteIcon } from "../DeleteIcon/DeleteIcon.js";

export class Task extends BaseTask {
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
        });
    }
}
