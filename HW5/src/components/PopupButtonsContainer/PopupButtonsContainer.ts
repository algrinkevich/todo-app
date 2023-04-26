import { ComponentProps } from "../../types";
import { Container } from "../Container/Container";
import "./PopupButtonsContainer.css";

export class PopupButtonsContainer extends Container {
    constructor(props: ComponentProps = {}) {
        super({
            ...props,
            styleClasses: ["buttons-container", ...(props.styleClasses || [])],
        });
    }
}
