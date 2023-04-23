import { Container } from "../Container/Container";
import { ComponentRenderProps } from "../../types";

export class AppWrapper extends Container {
    /**
     * @override
     * @param props
     * @param {HTMLElement[]} props.children
     * @param {string[]} props.styleClasses
     * @returns {HTMLDivElement}
     */
    render(props: ComponentRenderProps) {
        return super.render({
            children: props.children,
            styleClasses: ["app-wrapper"],
        });
    }
}

