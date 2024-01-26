import { Component } from "../Component/Component";
import { CheckboxProps } from "../../types";
import "./Checkbox.css";

export class Checkbox extends Component<HTMLInputElement> {
    private componentProps: CheckboxProps;

    constructor(props: CheckboxProps) {
        super({ styleClasses: ["checkbox"] });
        this.element = document.createElement(`input`);
        this.componentProps = { ...props };
    }

    render() {
        this.element.type = "checkbox";
        this.element.value = this.componentProps.title;
        this.element.onchange = () => {
            if (this.element.checked) {
                this.componentProps.onChecked(this.componentProps.title);
            }
        };
        return super.render({
            children: [],
        });
    }
}