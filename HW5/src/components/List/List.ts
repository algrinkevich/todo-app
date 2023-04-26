import { ListRenderProps, RenderArgs } from "../../types";
import { Component } from "../Component/Component";
import { ListItem } from "../ListItem/ListItem";

export class List extends Component<HTMLUListElement> {
    constructor(props: ListRenderProps) {
        super({ styleClasses: props.styleClasses });
        this.element = document.createElement("ul");
    }

    render(args: RenderArgs) {
        return super.render({
            children: [
                ...args.children.map((item) => {
                    return new ListItem().render({ children: [item] });
                }),
            ],
        });
    }
}
