import { TaskListProps } from "../../types";
import { Task } from "../Task/Task";

export const TaskList = ({
    tasks,
    searchQuery,
    onDeleteTask,
    onCompleteTask,
}: TaskListProps) => {
    const taskComponents = tasks
        .filter((task) =>
            task.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map((task) => (
            <Task
                key={task.id}
                task={task}
                onDelete={onDeleteTask}
                onComplete={onCompleteTask}
            />
        ));
    return <ul className="task-section">{taskComponents}</ul>;
};
