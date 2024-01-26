import { BaseTask } from "../BaseTask/BaseTask";
import { Checkbox } from "../Checkbox/Checkbox";
import { Label } from "../Label/Label";
import { DeleteIcon } from "../DeleteIcon/DeleteIcon";
import { TaskProps } from "../../types";

export class Task extends BaseTask {
    private componenentProps: TaskProps;

    constructor(props: TaskProps) {
        super();
        this.componenentProps = { ...props };
    }

    render() {
        const formattedDate = this.formatTaskDate(
            this.componenentProps.task.plannedDate
        );
        return super.render({
            children: [
                new Checkbox({
                    title: this.componenentProps.task.title,
                    onChecked: () =>
                        this.componenentProps.onComplete(
                            this.componenentProps.task
                        ),
                }).render(),
                new Label({
                    date: formattedDate,
                    title: this.componenentProps.task.title,
                    styleClasses: ["task-row__title"],
                }).render(),
                new DeleteIcon({
                    onClick: () =>
                        this.componenentProps.onDelete(
                            this.componenentProps.task
                        ),
                }).render(),
            ],
        });
    }
}
