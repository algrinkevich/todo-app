import React, { useCallback, useRef, useState } from "react";

import { AddTaskPopupProps } from "../../types";
import { InputText } from "../InputText/InputText";

import "./AddTaskPopup.css";


const getCurrentDate = () => {
    return new Date().toISOString().slice(0, 10);
};

export const AddTaskPopup = ({ onCancel, onOk }: AddTaskPopupProps) => {
    const [addButtonDisabled, setAddButtonDisabled] = useState(true);
    const [title, setTitle] = useState("");
    const refDatePicker = useRef(null);

    const changeButtonState = useCallback((value: string) => {
        if (value) {
            setAddButtonDisabled(() => false);
        } else {
            setAddButtonDisabled(() => true);
        }
        setTitle(() => value);
    }, []);

    const addTask = useCallback(
        (event: React.FormEvent<HTMLFormElement>) => {
            const date = refDatePicker.current?.valueAsDate
                ?.toISOString()
                .slice(0, 10);
            event.preventDefault();
            if (!title || !date) {
                return;
            }
            onOk({
                title: title,
                date: date,
            });
        },
        [title, refDatePicker, onOk]
    );

    return (
        <>
            <h2>Add New Task</h2>
            <form className="create-task-form" onSubmit={addTask}>
                <InputText
                    onInput={changeButtonState}
                    name="taskTitle"
                    type="text"
                    placeholder="Task Title"
                    styleClasses={["popup__input-text"]}
                    value={title}
                    autoFocus={true}
                />
                <input
                    className="popup__date-picker date-picker"
                    name="planned-date"
                    type="date"
                    defaultValue={getCurrentDate()}
                    ref={refDatePicker}
                />
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
                        Add Task
                    </button>
                </div>
            </form>
        </>
    );
};
