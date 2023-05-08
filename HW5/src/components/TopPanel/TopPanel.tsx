import { InputText } from "../InputText/InputText";
import { TaskTagEnum, TopPanelProps } from "../../types";
import { TaskTagList } from "../TaskTagList/TaskTagList";

import { useNavigate, useParams } from "react-router-dom";
import "./TopPanel.css";

export const TopPanel = ({
    onSearch,
    onTagChecked,
    searchQuery,
    onNewTaskClick,
}: TopPanelProps) => {
    const navigate = useNavigate();
    const onTagCheckedWrapper = (name: string) => {
        if (!name) {
            navigate("/tasks");
        } else {
            navigate(`/tasks/${name}`);
        }
        onTagChecked && onTagChecked(name);
    };
    const {tagName} = useParams();
    let searchTag: TaskTagEnum = null;
    if (tagName) {
        [searchTag] = Object.values(TaskTagEnum).filter((value) => value === tagName);
    }
  
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
            <TaskTagList onChecked={onTagCheckedWrapper} initTag={searchTag} />
        </div>
    );
};
