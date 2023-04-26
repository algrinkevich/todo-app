import { LabelProps } from "../../types";
import { Component } from "../Component/Component";
import { Text } from "../Text/Text";
import "./Label.css";

export class Label extends Component<HTMLLabelElement> {
    private componentProps: LabelProps;

    constructor(props: LabelProps) {
        super({ styleClasses: props.styleClasses });
        this.element = document.createElement(`label`);
        this.componentProps = { ...props };
    }

    render() {
        return super.render({
            children: [
                this.componentProps.title,
                new Text({
                    text: this.componentProps.date,
                    styleClasses: ["task-row__date"],
                }).render(),
            ],
        });
    }
}
