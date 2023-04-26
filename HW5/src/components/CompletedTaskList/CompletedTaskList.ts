import { List } from "../List/List";
import { CompletedTask } from "../CompletedTask/CompletedTask";
import { BaseTaskListProps } from "../../types";
import { BaseTaskList } from "../BaseTaskList/BaseTaskList";

export class CompletedTaskList extends BaseTaskList {
    private componentProps: BaseTaskListProps;

    constructor(props: BaseTaskListProps) {
        super({
            styleClasses: [],
        });
        this.componentProps = { ...props };
    }

    render() {
        return super.render({
            children: this.componentProps.tasks.map((task) =>
                new CompletedTask({
                    task,
                }).render()
            ),
        });
    }
}
