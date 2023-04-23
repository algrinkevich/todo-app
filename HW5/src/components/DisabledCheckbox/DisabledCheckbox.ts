import { CheckboxRenderProps } from "../../types";
import { Checkbox } from "../Checkbox/Checkbox";

export class DisabledCheckbox extends Checkbox {
    /**
     * @override
     * @param props
     * @returns {HTMLElement}
     */
    render(props: CheckboxRenderProps) {
        this.element.checked = true;
        this.element.disabled = true;
        return super.render({
            title: props.title,
        });
    }
}
