import { TaskList } from "../TaskList/TaskList";
import { Task } from "../Task/Task";
import { CompletedTask } from "../CompletedTask/CompletedTask";
import { TasksSectionProps } from "../../types";
import "./TasksSection.css";
import { useMemo } from "react";

export const TasksSection = ({
    tasks,
    onDeleteTask,
    onCompleteTask,
    searchQuery,
    searchTag
}: TasksSectionProps) => {
    const notCompletedTasks = useMemo(
        () =>
            tasks
                .filter((task) => !task.isCompleted)
                .filter((task) =>
                    task.title.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .filter(task => !searchTag || task.tag === searchTag)
                .map((task) => (
                    <Task
                        key={task.id}
                        task={task}
                        onDelete={onDeleteTask}
                        onComplete={onCompleteTask}
                    />
                )),
        [tasks, searchQuery, searchTag, onDeleteTask, onCompleteTask]
    );
    const completedTasks = useMemo(
        () =>
            tasks
                .filter((task) => task.isCompleted)
                .map((task) => <CompletedTask key={task.id} task={task} />),
        [tasks]
    );

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
