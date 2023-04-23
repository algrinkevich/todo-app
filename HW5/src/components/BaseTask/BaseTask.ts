import { Container } from "../Container/Container";
import { ComponentRenderProps } from "../../types";
import "./BaseTask.css";

export class BaseTask extends Container {
    alignDateWithDay(date: Date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }

    formatTaskDate(plannedDateString: string) {
        let plannedDate = this.alignDateWithDay(new Date(plannedDateString));
        const currentDate = this.alignDateWithDay(new Date());
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
    }

    render(props: ComponentRenderProps) {
        return super.render({
            children: props.children,
            styleClasses: ["task-row"],
        });
    }
}
