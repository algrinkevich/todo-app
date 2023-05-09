import React, { useCallback, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { InputText } from "../InputText/InputText";
import { TaskTagList } from "../TaskTagList/TaskTagList";
import { addTask, updateTask } from "../../slices/tasks";
import { AddTaskPopupProps, Task } from "../../types";
import { AppDispatch } from "../../store";

import "./AddTaskPopup.css";

const getCurrentDate = () => {
    return new Date().toISOString().slice(0, 10);
};

export const AddTaskPopup = ({
    onCancel,
    onOk,
    mode,
    task,
}: AddTaskPopupProps) => {
    const dispatch = useDispatch<AppDispatch>();

    const [addButtonDisabled, setAddButtonDisabled] = useState(mode !== "edit");
    const [title, setTitle] = useState(mode === "edit" ? task.title : "");
    const [tag, setTag] = useState(mode === "edit" ? task.tag : null);
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
            if (task) {
                taskInfo.id = task.id;
            }
            const action =
                mode === "new" ? addTask(taskInfo) : updateTask(taskInfo);
            dispatch(action);
            onOk(taskInfo);
        },
        [title, refDatePicker, tag, onOk]
    );

    const popupTitle = mode === "new" ? "Add New Task" : "Edit Task";
    const popupSaveTitle = mode === "new" ? "Add Task" : "Save";

    const defaultDate = mode === "new" ? getCurrentDate() : task.plannedDate;

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
                        onClick={onCancel}
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
