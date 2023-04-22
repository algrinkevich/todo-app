import { Component } from "../Component/Component.js";

export class Button extends Component {
    constructor() {
        super();
        this.element = document.createElement("button");
    }
    /**
     * @override
     * @param props
     * @param {string} props.text
     * @param {function} props.onClick
     * @returns {HTMLElement}
     */
    render(props) {
        if (props.type) {
            this.element.type = props.type;
        }
        if (props.enabled === false) {
            this.element.disabled = "true";
        }
        return super.render({
            onClick: props.onClick,
            children: props.text,
            styleClasses: props.styleClasses,
        });
    }
}

