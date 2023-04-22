import { Component } from "../Component/Component.js";

export class ListItem extends Component {
    /**
     * @override
     * @param props
     * @param {HTMLElement[]} props.children
     * @returns {HTMLElement}
     */
    constructor() {
        super();
        this.element = document.createElement("li");
    }
    render(props) {
        return super.render({
            children: props.children,
        });
    }
}
