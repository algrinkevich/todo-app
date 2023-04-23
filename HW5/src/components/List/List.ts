import { ListRenderProps } from "../../types";
import { Component } from "../Component/Component";
import { ListItem } from "../ListItem/ListItem";

export class List extends Component<HTMLUListElement> {
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
    render(props: ListRenderProps) {
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
