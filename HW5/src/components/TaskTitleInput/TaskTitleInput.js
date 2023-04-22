import { InputText } from "../InputText/InputText.js";
import "./TaskTitleInput.css";

export class TaskTitleInput extends InputText {
    /**
     * @override
     * @param props
     * @returns {HTMLElement}
     */
    render(props) {
        return super.render({
            placeholder: "Task Title",
            onInput: () => {
                if (this.element.value) {
                    props.addButton.removeAttribute("disabled");
                } else {
                    props.addButton.disabled = "true";
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
