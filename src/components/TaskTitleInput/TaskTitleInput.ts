import { TaskTitleInputProps } from "../../types";
import { InputText } from "../InputText/InputText";
import "./TaskTitleInput.css";

export class TaskTitleInput extends InputText {
    constructor(props: TaskTitleInputProps) {
        super({
            placeholder: "Task Title",
            onInput: () => {
                if (this.element.value) {
                    props.addButton.removeAttribute("disabled");
                } else {
                    props.addButton.disabled = true;
                }
            },
            value: "",
            name: "taskTitle",
            setFocus: true,
            type: "text",
            styleClasses: ["popup__input-text"],
        });
    }
}