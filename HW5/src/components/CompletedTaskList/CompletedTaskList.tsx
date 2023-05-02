import { CompletedTask } from "../CompletedTask/CompletedTask";
import { CompletedTaskListProps } from "../../types";
import "../BaseTaskList/BaseTaskList.css";

export const CompletedTaskList = ({ tasks }: CompletedTaskListProps) => {
    const taskComponents = tasks.map((task) => (
        <CompletedTask key={task.id} task={task} />
    ));

    return <ul className="task-section">{taskComponents}</ul>;
};
