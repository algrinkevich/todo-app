import { Component } from "../Component/Component.js";
import { Button } from "../Button/Button.js";
import { PopupButtonsContainer } from "../PopupButtonsContainer/PopupButtonsContainer.js";
import { TaskTitleInput } from "../TaskTitleInput/TaskTitleInput.js";
import { DatePicker } from "../DatePicker/DatePicker.js";

import "./AddTaskForm.css";

export class AddTaskForm extends Component {
    constructor() {
        super();
        this.element = document.createElement(`form`);
    }
    /**
     * @override
     * @param props
     * @returns {HTMLElement}
     */
    render(props) {
        this.element.onsubmit = (event) => {
            event.preventDefault();
            if (!taskInput.value || !datePicker.value) {
                return;
            }
            props.onClickAdd({
                title: taskInput.value,
                date: datePicker.value,
            });
        };

        const cancelButton = new Button().render({
            text: "Cancel",
            onClick: props.onCancel,
            styleClasses: ["cancel-btn"],
            type: "reset",
        });
        const addButton = new Button().render({
            text: "Add Task",
            enabled: false,
            styleClasses: ["general-btn", "confirm-btn"],
            type: "submit",
        });
        const buttonsContainer = new PopupButtonsContainer().render({
            children: [cancelButton, addButton],
        });
        const taskInput = new TaskTitleInput().render({
            type: "text",
            addButton,
        });
        const datePicker = new DatePicker().render({
            name: "planned-date",
            styleClasses: ["popup__date-picker"],
        });
        return super.render({
            children: [taskInput, datePicker, buttonsContainer],
            styleClasses: ["create-task-form"],
        });
    }
}

