import { ImageRenderProps } from "../../types";
import { Component } from "../Component/Component";

export class Image extends Component<HTMLImageElement> {
    constructor() {
        super();
        this.element = document.createElement(`img`);
    }
    /**
     * @override
     * @param props
     * @returns {HTMLElement}
     */
    render(props: ImageRenderProps) {
        this.element.src = props.src;
        return super.render({
            children: [],
            styleClasses: props.styleClasses,
            onClick: props.onClick,
        });
    }
}
