import { ComponentProps } from "../../types";
import { Container } from "../Container/Container";
import "./BasePopup.css";

export class BasePopup extends Container {
    constructor(props: ComponentProps) {
        super({ ...props, styleClasses: [...(props.styleClasses || []), "popup"] });
    }
}
