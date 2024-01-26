import { useMemo } from "react";

import { TasksForTodayPopupProps } from "../../types";

import "./TasksForTodayPopup.css";

const getGreeting = (currenHours: number) => {
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

export const TasksForTodayPopup = ({
    taskTitles,
    onOk,
}: TasksForTodayPopupProps) => {
    const currenHours = new Date().getHours();
    const greeting = useMemo(() => getGreeting(currenHours), [currenHours]);
    const listItems = useMemo(
        () => taskTitles.map((title, index) => <li key={index}>{title}</li>),
        [taskTitles]
    );
    return (
        <>
            <h2>{greeting}</h2>
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
