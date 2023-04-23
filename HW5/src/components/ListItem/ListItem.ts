import { ComponentRenderProps } from "../../types";
import { Component } from "../Component/Component";

export class ListItem extends Component<HTMLLIElement> {
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
    render(props: ComponentRenderProps) {
        return super.render({
            children: props.children,
        });
    }
}
