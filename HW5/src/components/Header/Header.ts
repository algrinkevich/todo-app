import { Component } from "../Component/Component";
import { Heading } from "../Heading/Heading";
import { WeatherWidget } from "../WeatherWidget/WeatherWidget";
import "./Header.css";

export class Header extends Component<HTMLHeadElement> {
    constructor() {
        super();
        this.element = document.createElement("header");
    }
    
    render() {
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
