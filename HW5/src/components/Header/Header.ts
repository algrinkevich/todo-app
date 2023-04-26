import { Component } from "../Component/Component";
import { Heading } from "../Heading/Heading";
import { WeatherWidget } from "../WeatherWidget/WeatherWidget";
import "./Header.css";

export class Header extends Component<HTMLHeadElement> {
    constructor() {
        super({ styleClasses: ["header"] });
        this.element = document.createElement("header");
    }

    render() {
        return super.render({
            children: [
                new Heading({
                    level: 1,
                    text: "To Do List",
                    styleClasses: ["app-wraper__heading", "heading"],
                }).render(),
                new WeatherWidget().render(),
            ],
        });
    }
}
