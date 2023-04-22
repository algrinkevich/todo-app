import { Component } from "../Component/Component.js";

export class Heading extends Component {
    constructor({ level }) {
        super();
        this.element = document.createElement(`h${level}`);
    }
    /**
     * @override
     * @param props
     * @param {HTMLElement[]} props.children
     * @param {string[]} props.styleClasses
     * @returns {HTMLElement}
     */
    render(props) {
        return super.render({
            children: [props.text],
            styleClasses: props.styleClasses,
        });
    }
}
