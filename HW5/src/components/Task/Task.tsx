import { BaseTask } from "../BaseTask/BaseTask";
import { Checkbox } from "../Checkbox/Checkbox";
import { Label } from "../Label/Label";
import { DeleteIcon } from "../DeleteIcon/DeleteIcon";
import { TaskProps } from "../../types";
import React from "react";

export const Task = ({ task, onComplete, onDelete }: TaskProps) => {
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

    const onChange = (event: React.FormEvent<HTMLInputElement>) => {
        if (event.currentTarget.checked) {
            onComplete(task);
        }
    };

    const onDeleteIconClick = () => onDelete(task);

    return (
        <div className="task-row">
            <input
                className="checkbox"
                type="checkbox"
                value={task.title}
                onChange={onChange}
            />
            <label className="task-row__title">
                {task.title}
                <p className="task-row__date">{formattedDate}</p>
            </label>
            <DeleteIcon onClick={onDeleteIconClick} />
        </div>
    );
};
