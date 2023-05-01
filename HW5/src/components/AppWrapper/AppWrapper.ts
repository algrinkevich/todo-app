import { Container } from "../Container/Container";
import { ComponentProps, RenderArgs } from "../../types";

export class AppWrapper extends Container {
    constructor(props: ComponentProps = {}) {
        super({
            ...props,
            styleClasses: ["app-wrapper"],
            ...props.styleClasses,
        });
    }

    render(args: RenderArgs) {
        return super.render({
            children: args.children
        });
    }
}
