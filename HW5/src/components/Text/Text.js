import { Component } from "../Component/Component.js";

export class Text extends Component {
    /**
     * @override
     * @param props
     * @returns {HTMLElement}
     */
    constructor() {
        super();
        this.element = document.createElement(`p`);
    }
    render(props) {
        return super.render({
            children: [props.text],
            styleClasses: props.styleClasses,
        });
    }
}
