import { Component } from "../Component/Component.js";
import { Heading } from "../Heading/Heading.js";
import { AddTaskForm } from "../AddTaskForm/AddTaskForm.js";

export class AddTaskPopup extends Component {
    /**
     * @override
     * @param props
     * @returns {HTMLElement}
     */
    render(props) {
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

