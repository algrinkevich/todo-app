import { ButtonProps } from "../../types";
import { Button } from "../Button/Button";
import "./CancelButton.css";

export class CancelButton extends Button {
    constructor(props: ButtonProps) {
        super({
            ...props,
            styleClasses: [...props.styleClasses, "cancel-btn"],
        });
    }
}
