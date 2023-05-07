import { InputText } from "../InputText/InputText";
import { TopPanelProps } from "../../types";
import { TaskTagList } from "../TaskTagList/TaskTagList";
import "./TopPanel.css";

export const TopPanel = ({
    onSearch,
    searchQuery,
    onNewTaskClick,
}: TopPanelProps) => {
    return (
        <div className="top-panel">
            <div className="search-and-button-container">
                <InputText
                    onInput={onSearch}
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
            <TaskTagList onChecked={null} />
        </div>
    );
};
