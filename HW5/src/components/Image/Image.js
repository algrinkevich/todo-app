import { Component } from "../Component/Component.js";

export class Image extends Component {
    constructor() {
        super();
        this.element = document.createElement(`img`);
    }
    /**
     * @override
     * @param props
     * @returns {HTMLElement}
     */
    render(props) {
        this.element.src = props.src;
        return super.render({
            children: [],
            styleClasses: props.styleClasses,
            onClick: props.onClick,
        });
    }
}
