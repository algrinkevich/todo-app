import { TextRenderProps } from "../../types";
import { Component } from "../Component/Component";

export class Text extends Component<HTMLParagraphElement> {
    private componentProps: TextRenderProps;

    constructor(props: TextRenderProps) {
        super({ styleClasses: props.styleClasses });
        this.element = document.createElement(`p`);
        this.componentProps = {...props};
    }
    render() {
        return super.render({
            children: [this.componentProps.text],
        });
    }
}
