import { TaskList } from "../TaskList/TaskList";
import { CompletedTaskList } from "../CompletedTaskList/CompletedTaskList";
import { TasksSectionProps } from "../../types";
import "./TasksSection.css";

export const TasksSection = ({
    tasks,
    onDeleteTask,
    onCompleteTask,
    searchQuery,
}: TasksSectionProps) => {
    const notCompletedTasks = tasks.filter((task) => !task.isCompleted);
    const completedTasks = tasks.filter((task) => task.isCompleted);

    return (
        <section className="tasks-section">
            <h2 className="tasks-section__subheading subheading">All Tasks</h2>
            <TaskList
                tasks={notCompletedTasks}
                onDeleteTask={onDeleteTask}
                onCompleteTask={onCompleteTask}
                searchQuery={searchQuery}
            />
            <h2 className="tasks-section__subheading subheading">
                Completed Tasks
            </h2>
            <CompletedTaskList tasks={completedTasks} />
        </section>
    );
};
