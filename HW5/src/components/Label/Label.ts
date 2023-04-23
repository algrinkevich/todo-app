import { LabelRenderProps } from "../../types";
import { Component } from "../Component/Component";
import { Text } from "../Text/Text";
import "./Label.css";

export class Label extends Component<HTMLLabelElement> {
    constructor() {
        super();
        this.element = document.createElement(`label`);
    }
    /**
     * @override
     * @param props
     * @returns {HTMLElement}
     */
    render(props: LabelRenderProps) {
        return super.render({
            children: [
                props.title,
                new Text().render({
                    text: props.date,
                    styleClasses: ["task-row__date"],
                }),
            ],
            styleClasses: props.styleClasses,
        });
    }
}
