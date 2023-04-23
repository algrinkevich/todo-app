import { ComponentRenderProps } from "../../types";
import { Container } from "../Container/Container";
import "./PopupButtonsContainer.css";

export class PopupButtonsContainer extends Container {
    render(props: ComponentRenderProps) {
        return super.render({
            children: props.children,
            styleClasses: ["buttons-container"],
        });
    }
}
