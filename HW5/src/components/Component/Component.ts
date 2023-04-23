import { ComponentRenderProps } from "../../types";

export class Component<HTMLElementType extends HTMLElement> {
    state: Object;
    props: ComponentRenderProps;
    element: HTMLElementType;

    constructor() {
        this.state = {};
        this.props = {};
    }

    setState(state: Object) {
        this.state = { ...this.state, ...state };
        this.update();
    }
    /**
     *
     * @param props
     * @returns {HTMLElement}
     */
    render(props: ComponentRenderProps = {}) {
        this.props = { ...props };
        this.element.onclick = props.onClick;
        this.element.innerHTML = "";
        if (props.styleClasses) {
            this.element.classList.add(...props.styleClasses);
        }
        this.element.append(...props.children);
        return this.element;
    }

    update() {
        this.render(this.props);
    }
}
