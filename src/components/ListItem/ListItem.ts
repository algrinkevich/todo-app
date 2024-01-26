import { ComponentProps } from "../../types";
import { Component } from "../Component/Component";

export class ListItem extends Component<HTMLLIElement> {
    constructor(props: ComponentProps = {}) {
        super(props);
        this.element = document.createElement("li");
    }
}
