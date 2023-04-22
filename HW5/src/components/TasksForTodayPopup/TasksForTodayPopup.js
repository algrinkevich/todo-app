import { Component } from "../Component/Component.js";
import { Heading } from "../Heading/Heading.js";
import { Text } from "../Text/Text.js";
import { List } from "../List/List.js";
import { Button } from "../Button/Button.js";
import "./TasksForTodayPopup.css";

export class TasksForTodayPopup extends Component {
    constructor(tasks) {
        super();
        this.tasks = tasks;
    }
    getGreeting() {
        const currenHours = new Date().getHours();
        if (currenHours >= 5 && currenHours < 12) {
            return "Good Morning";
        } else if (currenHours >= 12 && currenHours < 17) {
            return "Good Afternoon";
        } else if (currenHours >= 17 && currenHours < 21) {
            return "Good Evening";
        } else {
            return "Good Night";
        }
    }
    /**
     * @override
     * @param props
     * @returns {HTMLElement}
     */
    render(props) {
        return super.render({
            children: [
                new Heading({ level: 2 }).render({
                    text: this.getGreeting(),
                }),
                new Text().render({
                    text: "You have the next planned tasks for today:",
                    styleClasses: ["popup__text"],
                }),
                new List().render({
                    items: this.tasks,
                    styleClasses: ["popup__tasks-list"],
                }),
                new Button().render({
                    text: "Ok",
                    enabled: true,
                    styleClasses: [
                        "general-btn",
                        "confirm-btn",
                        "element-whole-width",
                    ],
                    type: "button",
                    onClick: props.onOk,
                }),
            ],
            styleClasses: ["popup"],
        });
    }
}
