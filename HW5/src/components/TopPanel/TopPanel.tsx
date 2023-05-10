import { useDispatch } from "react-redux";
import {
    useNavigate,
    useParams,
    useSearchParams,
    createSearchParams,
} from "react-router-dom";

import { InputText } from "../InputText/InputText";
import { TaskTagEnum } from "../../types";
import { TaskTagList } from "../TaskTagList/TaskTagList";
import { showAddPopup } from "../../slices/popups";
import { setQuery } from "../../slices/search";
import { AppDispatch } from "../../store";

import "./TopPanel.css";
import { useEffect } from "react";

export const TopPanel = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [searchParams, _] = useSearchParams();
    const searchQuery = searchParams.get("q") || "";

    useEffect(() => {
        dispatch(setQuery(searchQuery));
    }, []);

    const onTagCheckedWrapper = (name: string) => {
        const navigateOptions = {
            search: `?${createSearchParams(searchParams)}`,
            pathname: name ? `/tasks/${name}` : "/tasks",
        };
        navigate(navigateOptions);
    };

    const { tagName } = useParams();
    let searchTag: TaskTagEnum = null;
    if (tagName) {
        [searchTag] = Object.values(TaskTagEnum).filter(
            (value) => value === tagName
        );
    }

    const onSearchWrapper = (query: string) => {
        const navigateOptions = {
            search: `?${createSearchParams({ q: query })}`,
            pathname: tagName ? `/tasks/${tagName}` : "/tasks",
        };
        navigate(navigateOptions);
        dispatch(setQuery(query));
    };

    const onButtonClick = () => dispatch(showAddPopup());

    return (
        <div className="top-panel">
            <div className="search-and-button-container">
                <InputText
                    onInput={onSearchWrapper}
                    name="search"
                    type="search"
                    placeholder="Search Task"
                    value={searchQuery}
                />
                <button
                    className="new-task-btn top-panel__new-task-btn state-btn"
                    onClick={onButtonClick}
                >
                    + New Task
                </button>
            </div>
            <TaskTagList onChecked={onTagCheckedWrapper} initTag={searchTag} />
        </div>
    );
};
