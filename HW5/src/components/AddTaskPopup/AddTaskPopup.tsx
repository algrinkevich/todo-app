import { AddTaskPopupProps } from "../../types";
import "../BasePopup/BasePopup.css";
import "../AddTaskForm/AddTaskForm.css";
import "../CancelButton/CancelButton.css";
import "../Button/Button.css";
import "../DatePicker/DatePicker.css";
import "../TaskTitleInput/TaskTitleInput.css";

import "../PopupButtonsContainer/PopupButtonsContainer.css";
import React, { useState } from "react";
import { InputText } from "../InputText/InputText";

export const AddTaskPopup = ({ onCancel, onOk }: AddTaskPopupProps) => {
    const getCurrentDate = () => {
        return new Date().toISOString().slice(0, 10);
    };

    const [addButtonDisabled, setAddButtonDisabled] = useState(true);
    const [title, setTitle] = useState("");
    const [date, setDate] = useState(getCurrentDate());

    const changeButtonState = (event: React.FormEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value;
        if (value) {
            setAddButtonDisabled(() => false);
        } else {
            setAddButtonDisabled(() => true);
        }
        setTitle(() => value);
    };

    const addTask = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!title || !date) {
            return;
        }
        onOk({
            title: title,
            date: date,
        });
    };

    const setSelectedDate = (event: React.FormEvent<HTMLInputElement>) => {
        setDate(event.currentTarget.valueAsDate.toISOString().slice(0, 10));
    };

    return (
        <div className="popup">
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
                    defaultValue={date}
                    onInput={setSelectedDate}
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
        </div>
    );
};
