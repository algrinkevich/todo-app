import { Heading } from "../Heading/Heading";
import { AddTaskForm } from "../AddTaskForm/AddTaskForm";
import { AddTaskPopupProps, RenderArgs } from "../../types";
import { BasePopup } from "../BasePopup/BasePopup";

export class AddTaskPopup extends BasePopup {
    private componentProps: AddTaskPopupProps;

    constructor(props: AddTaskPopupProps) {
        super({});
        this.componentProps = props;
    }

    render() {
        return super.render({
            children: [
                new Heading({ level: 2, text: "Add New Task" }).render(),
                new AddTaskForm({
                    onCancel: this.componentProps.onCancel,
                    onClickAdd: this.componentProps.onOk,
                }).render(),
            ],
        });
    }
}
