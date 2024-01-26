import { InputTextProps } from "../../types";
import { Component } from "../Component/Component";
import "./InputText.css";

export class InputText extends Component<HTMLInputElement> {
    private componentProps: InputTextProps;

    constructor(props: InputTextProps) {
        super({ styleClasses: ["input-text", ...(props.styleClasses || [])] });
        this.element = document.createElement(`input`);
        this.componentProps = { ...props };
    }

    render() {
        this.element.oninput = this.componentProps.onInput;
        this.element.name = this.componentProps.name;
        this.element.type = this.componentProps.type;
        this.element.value = this.componentProps.value;
        this.element.autocomplete = "off";
        this.element.placeholder = this.componentProps.placeholder;
        if (this.componentProps.setFocus) {
            setTimeout(() => {
                this.element.focus();
            }, 0);
        }
        return super.render({
            children: [],
        });
    }
}
