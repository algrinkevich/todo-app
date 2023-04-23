import { InputTextRenderProps } from "../../types";
import { Component } from "../Component/Component";
import "./InputText.css";

export class InputText extends Component<HTMLInputElement> {
    constructor() {
        super();
        this.element = document.createElement(`input`);
    }
    /**
     * @override
     * @param props
     * @param {function} props.onInput
     * @param {string} props.name
     * @param {string} props.type
     * @param {string} props.value
     * @param {string} props.placeholder
     * @param {boolean} props.setFocus
     * @returns {HTMLElement}
     */
    render(props: InputTextRenderProps) {
        this.element.oninput = props.onInput;
        this.element.name = props.name;
        this.element.type = props.type;
        this.element.value = props.value;
        this.element.autocomplete = "off";
        this.element.placeholder = props.placeholder;
        if (props.setFocus) {
            setTimeout(() => {
                this.element.focus();
            }, 0);
        }
        return super.render({
            children: [],
            styleClasses: ["input-text", ...(props.styleClasses || [])],
        });
    }
}
