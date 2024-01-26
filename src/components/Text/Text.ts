import { TextProps } from "../../types";
import { Component } from "../Component/Component";

export class Text extends Component<HTMLParagraphElement> {
    private componentProps: TextProps;

    constructor(props: TextProps) {
        super({ styleClasses: props.styleClasses });
        this.element = document.createElement(`p`);
        this.componentProps = { ...props };
    }
    render() {
        return super.render({
            children: [this.componentProps.text],
        });
    }
}
