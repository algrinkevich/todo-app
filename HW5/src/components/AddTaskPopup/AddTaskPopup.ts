import { Heading } from "../Heading/Heading";
import { AddTaskForm } from "../AddTaskForm/AddTaskForm";
import { Container } from "../Container/Container";
import { AddTaskPopupProps, RenderArgs } from "../../types";

export class AddTaskPopup extends Container {
    private componentProps: AddTaskPopupProps;

    constructor(props: AddTaskPopupProps) {
        super({
            styleClasses: ["popup"],
        });
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
