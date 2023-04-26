import { CheckboxProps } from "../../types";
import { Checkbox } from "../Checkbox/Checkbox";

export class DisabledCheckbox extends Checkbox {
    constructor(props: CheckboxProps) {
        super({
            title: props.title,
        });
        this.element.checked = true;
        this.element.disabled = true;
    }
}
