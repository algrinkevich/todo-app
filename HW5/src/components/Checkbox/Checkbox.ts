import { Component } from "../Component/Component";
import { CheckboxRenderProps } from "../../types";
import "./Checkbox.css";

export class Checkbox extends Component<HTMLInputElement> {
    constructor() {
        super();
        this.element = document.createElement(`input`);
    }
    /**
     * @override
     * @param props
     * @returns {HTMLElement}
     */
    render(props: CheckboxRenderProps) {
        this.element.type = "checkbox";
        this.element.value = props.title;
        this.element.onchange = () => {
            if (this.element.checked) {
                props.onChecked(props.title);
            }
        };
        return super.render({
            children: [],
            styleClasses: ["checkbox"],
        });
    }
}