import { ComponentProps } from "../../types";
import { Component } from "../Component/Component";

export class Container extends Component<HTMLDivElement> {
    constructor(props: ComponentProps = {}) {
        super(props);
        this.element = document.createElement("div");
    }
}
