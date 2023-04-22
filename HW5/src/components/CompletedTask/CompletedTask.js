import { BaseTask } from "../BaseTask/BaseTask.js";
import { DisabledCheckbox } from "../DisabledCheckbox/DisabledCheckbox.js";
import { Label } from "../Label/Label.js";
import "./CompletedTask.css";

export class CompletedTask extends BaseTask {
    /**
     * @override
     * @param props
     * @returns {HTMLElement}
     */
    render(props) {
        const formattedDate = this.formatTaskDate(props.task.plannedDate);
        return super.render({
            children: [
                new DisabledCheckbox().render({
                    title: props.task.title,
                }),
                new Label().render({
                    date: formattedDate,
                    title: props.task.title,
                    styleClasses: [
                        "task-row__title",
                        "task-row__title--completed",
                    ],
                }),
            ],
        });
    }
}
