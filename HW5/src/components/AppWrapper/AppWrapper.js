import { Component } from "../Component/Component.js";

export class AppWrapper extends Component {
    /**
     * @override
     * @param props
     * @param {HTMLElement[]} props.children
     * @param {string[]} props.styleClasses
     * @returns {HTMLDivElement}
     */
    render(props) {
        return super.render({
            children: props.children,
            styleClasses: ["app-wrapper"],
        });
    }
}

