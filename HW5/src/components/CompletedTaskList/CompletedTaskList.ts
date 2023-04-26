import { List } from "../List/List";
import { CompletedTask } from "../CompletedTask/CompletedTask";
import { BaseTaskListRenderProps } from "../../types";

export class CompletedTaskList extends List {
    private componentProps: BaseTaskListRenderProps;

    constructor(props: BaseTaskListRenderProps) {
        super({
            styleClasses: ["task-section"],
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
