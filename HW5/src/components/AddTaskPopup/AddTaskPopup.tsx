import { AddTaskPopupProps } from "../../types";
import React, { useCallback, useRef, useState } from "react";
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
            const date = refDatePicker.current.valueAsDate
                .toISOString()
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
                <div className="pickers-container">
                    <div className="tags-container">
                        <label
                            className="radio-container radio-container--health-tag"
                            htmlFor="health"
                        >
                            health
                            <input
                                type="radio"
                                id="health"
                                className="radio-button radio-button--health-tag"
                                name="task-tag"
                            />
                        </label>
                        <label
                            className="radio-container radio-container--work-tag"
                            htmlFor="work"
                        >
                            work
                            <input
                                type="radio"
                                id="work"
                                className="radio-button radio-button--work-tag"
                                name="task-tag"
                            />
                        </label>
                        <label
                            className="radio-container radio-container--home-tag"
                            htmlFor="home"
                        >
                            home
                            <input
                                type="radio"
                                id="home"
                                className="radio-button radio-button--home-tag"
                                name="task-tag"
                            />
                        </label>
                        <label
                            className="radio-container radio-container--other-tag"
                            htmlFor="other"
                        >
                            other
                            <input
                                type="radio"
                                id="other"
                                className="radio-button radio-button--other-tag"
                                name="task-tag"
                            />
                        </label>
                    </div>

                    <input
                        className="popup__date-picker date-picker"
                        name="planned-date"
                        type="date"
                        defaultValue={getCurrentDate()}
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
                        Add Task
                    </button>
                </div>
            </form>
        </>
    );
};
