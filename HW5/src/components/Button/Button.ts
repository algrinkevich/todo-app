import { Component } from "../Component/Component";
import { ButtonProps, RenderArgs } from "../../types";

export class Button extends Component<HTMLButtonElement> {
    private componentProps: ButtonProps;

    constructor(props: ButtonProps) {
        super({ onClick: props.onClick, styleClasses: props.styleClasses });
        this.element = document.createElement("button");
        this.componentProps = { ...props };
    }

    render() {
        if (this.componentProps.type) {
            this.element.type = this.componentProps.type;
        }
        if (this.componentProps.enabled === false) {
            this.element.disabled = true;
        }
        return super.render({
            children: [this.componentProps.text],
        });
    }
}
