import { Component } from "../Component/Component";
import { Button } from "../Button/Button";
import { PopupButtonsContainer } from "../PopupButtonsContainer/PopupButtonsContainer";
import { TaskTitleInput } from "../TaskTitleInput/TaskTitleInput";
import { DatePicker } from "../DatePicker/DatePicker";
import { AddTaskFormRenderProps } from "../../types";

import "./AddTaskForm.css";

export class AddTaskForm extends Component<HTMLFormElement> {
    private taskFormProps: AddTaskFormRenderProps;

    constructor(props: AddTaskFormRenderProps) {
        super({
            styleClasses: ["create-task-form"],
        });
        this.taskFormProps = props;
        this.element = document.createElement(`form`);
    }

    render() {
        this.element.onsubmit = (event) => {
            event.preventDefault();
            if (!taskInput.value || !datePicker.value) {
                return;
            }
            this.taskFormProps.onClickAdd({
                title: taskInput.value,
                date: datePicker.value,
            });
        };

        const cancelButton = new Button({
            text: "Cancel",
            onClick: this.taskFormProps.onCancel,
            styleClasses: ["cancel-btn"],
            type: "reset",
        }).render();
        const addButton = new Button({
            text: "Add Task",
            enabled: false,
            styleClasses: ["general-btn", "confirm-btn"],
            type: "submit",
        }).render();
        const buttonsContainer = new PopupButtonsContainer().render({
            children: [cancelButton, addButton],
        });
        const taskInput = new TaskTitleInput({
            type: "text",
            addButton,
        }).render();
        const datePicker = new DatePicker({
            name: "planned-date",
            styleClasses: ["popup__date-picker"],
        }).render();
        return super.render({
            children: [taskInput, datePicker, buttonsContainer],
        });
    }
}
