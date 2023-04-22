import { Component } from "../Component/Component.js";
import { Heading } from "../Heading/Heading.js";
import { WeatherWidget } from "../WeatherWidget/WeatherWidget.js";
import "./Header.css";

export class Header extends Component {
    /**
     * @override
     * @param props
     * @returns {HTMLElement}
     */
    constructor() {
        super();
        this.element = document.createElement("header");
    }
    render(props) {
        return super.render({
            children: [
                new Heading({ level: 1 }).render({
                    text: "To Do List",
                    styleClasses: ["app-wraper__heading", "heading"],
                }),
                new WeatherWidget().render(),
            ],
            styleClasses: ["header"],
        });
    }
}
