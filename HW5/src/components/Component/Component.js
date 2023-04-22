export class Component {
    constructor() {
        this.state = {};
        this.props = {};
        this.element = document.createElement("div");
    }

    setState(state) {
        this.state = { ...this.state, ...state };
        this.update();
    }

    /**
     *
     * @param props
     * @returns {HTMLElement}
     */
    render(props = {}) {
        this.props = { ...props };
        const div = this.element;
        div.onclick = props.onClick;
        div.innerHTML = "";
        if (props.styleClasses) {
            div.classList.add(...props.styleClasses);
        }
        div.append(...props.children);
        return div;
    }

    update() {
        this.render(this.props);
    }
}
