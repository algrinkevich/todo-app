import { CompletedTask } from "../CompletedTask/CompletedTask";
import { BaseTaskListProps } from "../../types";
import "../BaseTaskList/BaseTaskList.css";

export const CompletedTaskList = ({ tasks }: BaseTaskListProps) => {
    const taskComponents = tasks.map((task) => (
        <CompletedTask key={task.id} task={task} />
    ));

    return <ul className="task-section">{taskComponents}</ul>;
};
