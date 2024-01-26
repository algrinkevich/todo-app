import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { InputText } from "../InputText/InputText";
import { TaskTagList } from "../TaskTagList/TaskTagList";
import { addTask, updateTask } from "../../slices/tasks";
import { AddTaskPopupProps, Task } from "../../types";
import { AppDispatch } from "../../store";

import {
    editableTaskSelector,
    hideAddPopup,
    hideEditPopup,
} from "../../slices/popups";

import "./AddTaskPopup.css";

const getCurrentDate = () => {
    return new Date().toISOString().slice(0, 10);
};

export const AddTaskPopup = ({ mode }: AddTaskPopupProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const editableTask = useSelector(editableTaskSelector);
    const [title, setTitle] = useState(
        mode === "edit" ? editableTask.title : ""
    );
    const [tag, setTag] = useState(mode === "edit" ? editableTask.tag : null);
    const [taskDate, setTaskDate] = useState(
        mode === "new" ? getCurrentDate() : editableTask.plannedDate
    );
    let addButtonDisabled = mode !== "edit";
    addButtonDisabled = !(title && tag && taskDate);

    const onDatePickerChange = (event: React.FormEvent<HTMLInputElement>) => {
        setTaskDate(event.currentTarget.value);
    };

    const addTaskOnSubmit = useCallback(
        (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            if (!title || !taskDate || !tag) {
                return;
            }
            const taskInfo: Task = {
                title: title,
                plannedDate: taskDate,
                tag: tag,
                isCompleted: false,
            };

            if (mode === "new") {
                dispatch(hideAddPopup());
                dispatch(addTask(taskInfo));
            } else {
                taskInfo.id = editableTask.id;
                dispatch(hideEditPopup());
                dispatch(updateTask(taskInfo));
            }
        },
        [title, taskDate, tag]
    );

    const popupTitle = mode === "new" ? "Add New Task" : "Edit Task";
    const popupSaveTitle = mode === "new" ? "Add Task" : "Save";

    const onCancelButtonClick = () => {
        if (mode === "new") {
            dispatch(hideAddPopup());
        } else {
            dispatch(hideEditPopup());
        }
    };
    return (
        <>
            <h2>{popupTitle}</h2>
            <form className="create-task-form" onSubmit={addTaskOnSubmit}>
                <InputText
                    onInput={setTitle}
                    name="taskTitle"
                    type="text"
                    placeholder="Task Title"
                    styleClasses={["popup__input-text"]}
                    value={title}
                    autoFocus={true}
                />
                <div className="pickers-container">
                    <TaskTagList onChecked={setTag} initTag={tag} />
                    <input
                        className="popup__date-picker date-picker"
                        name="planned-date"
                        type="date"
                        defaultValue={taskDate}
                        onChange={onDatePickerChange}
                    />
                </div>

                <div className="buttons-container">
                    <button
                        className="cancel-btn"
                        type="reset"
                        onClick={onCancelButtonClick}
                    >
                        Cancel
                    </button>
                    <button
                        className="popup-ok-btn state-btn"
                        type="submit"
                        disabled={addButtonDisabled}
                    >
                        {popupSaveTitle}
                    </button>
                </div>
            </form>
        </>
    );
};
