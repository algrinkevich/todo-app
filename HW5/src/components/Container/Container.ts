import { Component } from "../Component/Component";

export class Container extends Component<HTMLDivElement> {
    constructor() {
        super();
        this.element = document.createElement("div");
    }
}
