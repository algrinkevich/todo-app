import { Component } from "../Component/Component";
import { DatePickerRenderProps } from "../../types";
import "./DatePicker.css";

export class DatePicker extends Component<HTMLInputElement> {
    /**
     * @override
     * @param props
     * @returns {HTMLElement}
     */
    constructor() {
        super();
        this.element = document.createElement(`input`);
    }
    render(props: DatePickerRenderProps) {
        this.element.name = props.name;
        this.element.type = "date";
        this.element.valueAsDate = new Date();

        return super.render({
            children: [],
            styleClasses: ["date-picker", ...(props.styleClasses || [])],
        });
    }
}
