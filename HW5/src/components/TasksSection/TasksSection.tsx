import { TaskList } from "../TaskList/TaskList";
import { Task } from "../Task/Task";
import { CompletedTask } from "../CompletedTask/CompletedTask";
import { TasksSectionProps } from "../../types";
import "./TasksSection.css";

export const TasksSection = ({
    tasks,
    onDeleteTask,
    onCompleteTask,
    searchQuery,
}: TasksSectionProps) => {
    const notCompletedTasks = tasks
        .filter((task) => !task.isCompleted)
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
    const completedTasks = tasks
        .filter((task) => task.isCompleted)
        .map((task) => <CompletedTask key={task.id} task={task} />);

    return (
        <section className="tasks-section">
            <h2 className="tasks-section__subheading subheading">All Tasks</h2>
            <TaskList>{...notCompletedTasks}</TaskList>
            <h2 className="tasks-section__subheading subheading">
                Completed Tasks
            </h2>
            <TaskList>{...completedTasks}</TaskList>
        </section>
    );
};
