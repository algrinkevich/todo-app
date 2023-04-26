import { BaseTask } from "../BaseTask/BaseTask";
import { DisabledCheckbox } from "../DisabledCheckbox/DisabledCheckbox";
import { Label } from "../Label/Label";
import { BaseTaskRenderProps } from "../../types";
import "./CompletedTask.css";

export class CompletedTask extends BaseTask {
    private componentProps: BaseTaskRenderProps;

    constructor(props: BaseTaskRenderProps) {
        super();
        this.componentProps = { ...props };
    }

    render() {
        const formattedDate = this.formatTaskDate(
            this.componentProps.task.plannedDate
        );
        return super.render({
            children: [
                new DisabledCheckbox({
                    title: this.componentProps.task.title,
                }).render(),
                new Label({
                    date: formattedDate,
                    title: this.componentProps.task.title,
                    styleClasses: [
                        "task-row__title",
                        "task-row__title--completed",
                    ],
                }).render(),
            ],
        });
    }
}
