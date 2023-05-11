import { CompletedTaskProps } from "../../types";
import { BaseTask } from "../BaseTask/BaseTask";

import "./CompletedTask.css";


export const CompletedTask = ({ task }: CompletedTaskProps) => {
    return (
        <BaseTask
            task={task}
            isChecked
            isDisabled
            labelStyles={["task-row__title--completed"]}
        />
    );
};
