import { ComponentProps, RenderArgs } from "../../types";

export class Component<HTMLElementType extends HTMLElement> {
    state: Object;
    private props: ComponentProps;
    element: HTMLElementType;

    constructor(props: ComponentProps = {}) {
        this.state = {};
        this.props = { ...props };
    }

    setState(state: Object) {
        this.state = { ...this.state, ...state };
        this.update();
    }

    render({ children = [] }: RenderArgs) {
        this.props.children = children;
        this.element.onclick = this.props.onClick;
        this.element.innerHTML = "";
        if (this.props.styleClasses) {
            this.element.classList.add(...this.props.styleClasses);
        }
        this.element.append(...children);
        return this.element;
    }

    update() {
        this.render({ children: this.props.children });
    }
}
