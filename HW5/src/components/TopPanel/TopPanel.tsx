import React from "react";
import { TopPanelProps } from "../../types";
import "./TopPanel.css";
import { InputText } from "../InputText/InputText";

export const TopPanel = ({
    onSearch,
    searchQuery,
    onNewTaskClick,
}: TopPanelProps) => {
    const onInput = (event: React.FormEvent<HTMLInputElement>) => {
        return onSearch(event.currentTarget.value);
    };
    return (
        <div className="top-panel">
            <InputText
                onInput={onInput}
                name="search"
                type="search"
                placeholder="Search Task"
                value={searchQuery}
            />
            <button
                className="new-task-btn top-panel__new-task-btn state-btn"
                onClick={onNewTaskClick}
            >
                + New Task
            </button>
        </div>
    );
};
