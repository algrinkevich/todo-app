import { TasksForTodayPopupProps } from "../../types";
import "./TasksForTodayPopup.css";

export const TasksForTodayPopup = ({
    taskTitles,
    onOk,
}: TasksForTodayPopupProps) => {
    const getGreeting = () => {
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
    };
    const listItems = taskTitles.map((title) => <li>{title}</li>);
    return (
        <>
            <h2>{getGreeting()}</h2>
            <p className="popup__text">
                You have the next planned tasks for today:
            </p>
            <ul className="popup__tasks-list">{...listItems}</ul>
            <button
                className="popup-ok-btn state-btn element-whole-width"
                type="button"
                onClick={onOk}
            >
                Ok
            </button>
        </>
    );
};
