import { TextRenderProps } from "../../types";
import { Component } from "../Component/Component";

export class Text extends Component<HTMLParagraphElement> {
    /**
     * @override
     * @param props
     * @returns {HTMLElement}
     */
    constructor() {
        super();
        this.element = document.createElement(`p`);
    }
    render(props: TextRenderProps) {
        return super.render({
            children: [props.text],
            styleClasses: props.styleClasses,
        });
    }
}
