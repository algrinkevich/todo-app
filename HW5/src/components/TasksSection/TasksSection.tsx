import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { TaskList } from "../TaskList/TaskList";
import { Task } from "../Task/Task";
import { CompletedTask } from "../CompletedTask/CompletedTask";
import { TasksSectionProps } from "../../types";
import { tasksSelector } from "../../slices/tasks";
import { querySelector } from "../../slices/search";

import "./TasksSection.css";

export const TasksSection = ({}: TasksSectionProps) => {
    const searchQuery = useSelector(querySelector);
    const tasks = useSelector(tasksSelector);
    const { tagName } = useParams();

    const notCompletedTasks = useMemo(
        () =>
            tasks
                .filter((task) => !task.isCompleted)
                .filter((task) =>
                    task.title.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .filter((task) => !tagName || task.tag === tagName)
                .map((task) => <Task key={task.id} task={task} />),
        [tasks, searchQuery, tagName]
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
