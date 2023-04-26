import { Heading } from "../Heading/Heading";
import { Text } from "../Text/Text";
import { List } from "../List/List";
import { Button } from "../Button/Button";
import "./TasksForTodayPopup.css";
import { Container } from "../Container/Container";
import { Task, TasksForTodayPopupProps } from "../../types";

export class TasksForTodayPopup extends Container {
    private componentProps: TasksForTodayPopupProps;

    constructor(props: TasksForTodayPopupProps) {
        super({ styleClasses: ["popup"] });
        this.componentProps = { ...props };
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
    render() {
        return super.render({
            children: [
                new Heading({ level: 2, text: this.getGreeting() }).render(),
                new Text({
                    text: "You have the next planned tasks for today:",
                    styleClasses: ["popup__text"],
                }).render(),
                new List({
                    styleClasses: ["popup__tasks-list"],
                }).render({ children: this.componentProps.tasks }),
                new Button({
                    text: "Ok",
                    enabled: true,
                    styleClasses: [
                        "general-btn",
                        "confirm-btn",
                        "element-whole-width",
                    ],
                    type: "button",
                    onClick: this.componentProps.onOk,
                }).render(),
            ],
        });
    }
}
