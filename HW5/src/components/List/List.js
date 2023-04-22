import { Component } from "../Component/Component.js";
import { ListItem } from "../ListItem/ListItem.js";

export class List extends Component {
    constructor() {
        super();
        this.element = document.createElement("ul");
    }
    /**
     * @override
     * @param props
     * @param {string[]} props.items
     * @param {HTMLElement[]} props.children
     * @returns {HTMLElement}
     */
    render(props) {
        return super.render({
            children: [
                ...props.items.map((item) => {
                    return new ListItem().render({ children: [item] });
                }),
            ],
            styleClasses: props.styleClasses,
        });
    }
}
