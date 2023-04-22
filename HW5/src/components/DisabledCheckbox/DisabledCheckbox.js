import { Checkbox } from "../Checkbox/Checkbox.js";

export class DisabledCheckbox extends Checkbox {
    /**
     * @override
     * @param props
     * @returns {HTMLElement}
     */
    render(props) {
        this.element.checked = "true";
        this.element.disabled = "true";
        return super.render({
            title: props.title,
        });
    }
}
