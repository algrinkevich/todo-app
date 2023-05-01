import { SearchProps } from "../../types";
import { InputText } from "../InputText/InputText";

export class Search extends InputText {
    constructor(props: SearchProps) {
        super({
            placeholder: props.placeholder,
            onInput: () => props.onSearch(this.element.value),
            name: "search",
            type: "search",
            value: props.query,
            setFocus: props.isFocused,
        });
    }
}
