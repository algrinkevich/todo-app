import { HeadingRenderProps } from "../../types";
import { Component } from "../Component/Component";

export class Heading extends Component<HTMLHeadingElement> {
    constructor({ level }: { level: number }) {
        super();
        this.element = <HTMLHeadingElement>document.createElement(`h${level}`);
    }
    /**
     * @override
     * @param props
     * @param {HTMLElement[]} props.children
     * @param {string[]} props.styleClasses
     * @returns {HTMLElement}
     */
    render(props: HeadingRenderProps) {
        return super.render({
            children: [props.text],
            styleClasses: props.styleClasses,
        });
    }
}
