import { Component } from "../Component/Component";
import { DatePickerRenderProps } from "../../types";
import "./DatePicker.css";

export class DatePicker extends Component<HTMLInputElement> {
    constructor(props: DatePickerRenderProps) {
        super({
            styleClasses: ["date-picker", ...(props.styleClasses || [])],
        });
        this.element = document.createElement(`input`);
        this.element.name = props.name;
        this.element.type = "date";
        this.element.valueAsDate = new Date();
    }
    render() {
        return super.render({ children: [] });
    }
}
