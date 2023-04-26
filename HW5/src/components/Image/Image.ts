import { ImageProps } from "../../types";
import { Component } from "../Component/Component";

export class Image extends Component<HTMLImageElement> {
    constructor(props: ImageProps) {
        super({ styleClasses: props.styleClasses, onClick: props.onClick });
        this.element = document.createElement(`img`);
        this.element.src = props.src;
    }
    render() {
        return super.render({ children: [] });
    }
}
