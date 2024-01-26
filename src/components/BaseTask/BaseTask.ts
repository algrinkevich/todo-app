import { BaseTaskProps } from "../../types";
import { TaskTag } from "../TaskTag/TaskTag";

import "./BaseTask.css";


export const BaseTask = ({
    task,
    isChecked,
    isDisabled,
    onChange,
    children,
    labelStyles,
}: BaseTaskProps) => {
    const alignDateWithDay = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    };

    const formatTaskDate = (plannedDateString: string) => {
        let plannedDate = alignDateWithDay(new Date(plannedDateString));
        const currentDate = alignDateWithDay(new Date());
        const tomorrowDate = new Date(currentDate);
        tomorrowDate.setDate(currentDate.getDate() + 1);
        const afterTomorrowDate = new Date(tomorrowDate);
        afterTomorrowDate.setDate(tomorrowDate.getDate() + 1);

        let formattedDate = null;

        if (plannedDate < tomorrowDate && plannedDate >= currentDate) {
            formattedDate = "Today";
        } else if (
            plannedDate >= tomorrowDate &&
            plannedDate < afterTomorrowDate
        ) {
            formattedDate = "Tomorrow";
        } else {
            const options = {
                weekday: "long",
                day: "numeric",
                month: "long",
            } as const;
            const [weekdayPart, _, monthPart, __, dayPart] =
                new Intl.DateTimeFormat("en-US", options).formatToParts(
                    plannedDate
                );
            formattedDate = `${weekdayPart.value}, ${
                dayPart.value
            } ${monthPart.value.slice(0, 3)}`;
        }
        return formattedDate;
    };

    const formattedDate = formatTaskDate(task.plannedDate);

    return (
        <div className="task-row">
            <input
                checked={isChecked}
                disabled={isDisabled}
                className="checkbox"
                type="checkbox"
                value={task.title}
                onChange={onChange}
            />
            <label
                className={["task-row__title", ...(labelStyles || [])].join(
                    " "
                )}
            >
                {task.title}
                <div className="tag-and-date-container">
                    <TaskTag
                        name={task.tag}
                        isSelectable={false}
                        isDisabled={isDisabled}
                    />
                    <p className="task-row__date">{formattedDate}</p>
                </div>
            </label>
            {children}
        </div>
    );
};
