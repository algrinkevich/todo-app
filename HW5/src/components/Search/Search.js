import { InputText } from "../InputText/InputText.js";

export class Search extends InputText {
    /**
     * @override
     * @param props
     * @returns {HTMLElement}
     */
    render(props) {
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
