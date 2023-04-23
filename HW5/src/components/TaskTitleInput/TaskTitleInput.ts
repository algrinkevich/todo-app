import { TaskTitleInputRenderProps } from "../../types";
import { InputText } from "../InputText/InputText";
import "./TaskTitleInput.css";

export class TaskTitleInput extends InputText {
    /**
     * @override
     * @param props
     * @returns {HTMLElement}
     */
    render(props: TaskTitleInputRenderProps) {
        return super.render({
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
