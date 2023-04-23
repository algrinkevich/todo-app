import { Heading } from "../Heading/Heading";
import { AddTaskForm } from "../AddTaskForm/AddTaskForm";
import { Container } from "../Container/Container";
import { AddTaskPopupRenderProps } from "../../types";

export class AddTaskPopup extends Container {
    /**
     * @override
     * @param props
     * @returns {HTMLElement}
     */
    render(props: AddTaskPopupRenderProps) {
        return super.render({
            children: [
                new Heading({ level: 2 }).render({
                    text: "Add New Task",
                }),
                new AddTaskForm().render({
                    onCancel: props.onCancel,
                    onClickAdd: props.onOk,
                }),
            ],
            styleClasses: ["popup"],
        });
    }
}

