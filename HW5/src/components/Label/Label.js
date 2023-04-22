import { Component } from "../Component/Component.js";
import { Text } from "../Text/Text.js";
import "./Label.css";

export class Label extends Component {
    constructor() {
        super();
        this.element = document.createElement(`label`);
    }
    /**
     * @override
     * @param props
     * @returns {HTMLElement}
     */
    render(props) {
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
