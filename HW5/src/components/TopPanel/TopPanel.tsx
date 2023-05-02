import React from "react";
import { TopPanelProps } from "../../types";
import "./TopPanel.css";

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
            <input
                placeholder="Search Task"
                name="search"
                type="search"
                value={searchQuery}
                onInput={onInput}
                autoComplete="off"
                className="input-text"
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
