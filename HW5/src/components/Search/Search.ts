import { SearchRenderProps } from "../../types";
import { InputText } from "../InputText/InputText";

export class Search extends InputText {
    /**
     * @override
     * @param props
     * @returns {HTMLElement}
     */
    render(props: SearchRenderProps) {
        return super.render({
            placeholder: props.placeholder,
            onInput: () => props.onSearch(this.element.value),
            name: "search",
            type: "search",
            value: props.query,
            setFocus: props.isFocused,
        });
    }
}
