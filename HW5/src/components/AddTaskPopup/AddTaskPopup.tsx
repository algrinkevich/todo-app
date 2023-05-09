import React, { useCallback, useRef, useState } from "react";
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

    const [addButtonDisabled, setAddButtonDisabled] = useState(mode !== "edit");
    const [title, setTitle] = useState(
        mode === "edit" ? editableTask.title : ""
    );
    const [tag, setTag] = useState(mode === "edit" ? editableTask.tag : null);
    const refDatePicker = useRef(null);

    const changeButtonState = useCallback((value: string) => {
        if (value) {
            setAddButtonDisabled(() => false);
        } else {
            setAddButtonDisabled(() => true);
        }
        setTitle(() => value);
    }, []);

    const addTaskOnSubmit = useCallback(
        (event: React.FormEvent<HTMLFormElement>) => {
            const date = refDatePicker.current.valueAsDate
                .toISOString()
                .slice(0, 10);
            event.preventDefault();
            if (!title || !date || !tag) {
                return;
            }
            const taskInfo: Task = {
                title: title,
                plannedDate: date,
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
        [title, refDatePicker, tag]
    );

    const popupTitle = mode === "new" ? "Add New Task" : "Edit Task";
    const popupSaveTitle = mode === "new" ? "Add Task" : "Save";

    const defaultDate =
        mode === "new" ? getCurrentDate() : editableTask.plannedDate;

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
                    onInput={changeButtonState}
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
                        defaultValue={defaultDate}
                        ref={refDatePicker}
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
