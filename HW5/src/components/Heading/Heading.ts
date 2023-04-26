import { HeadingProps } from "../../types";
import { Component } from "../Component/Component";

export class Heading extends Component<HTMLHeadingElement> {
    private componentProps: HeadingProps;

    constructor(props: HeadingProps) {
        super({ styleClasses: props.styleClasses });
        this.element = <HTMLHeadingElement>(
            document.createElement(`h${props.level}`)
        );
        this.componentProps = { ...props };
    }

    render() {
        return super.render({
            children: [this.componentProps.text],
        });
    }
}
