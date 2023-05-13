import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import {
    useNavigate,
    useParams,
    useSearchParams,
    createSearchParams,
} from "react-router-dom";

import { InputText } from "../InputText/InputText";
import { TaskTagList } from "../TaskTagList/TaskTagList";
import { showAddPopup } from "../../slices/popups";
import {
    querySelector,
    setQuery,
    setTag,
    tagSelector,
} from "../../slices/search";
import { AppDispatch } from "../../store";

import "./TopPanel.css";


export const TopPanel = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const searchQuery = useSelector(querySelector);
    const tagName = useSelector(tagSelector);
    const [searchParams, _] = useSearchParams();
    const { pathTagName } = useParams();

    useEffect(() => {
        dispatch(setQuery(searchParams.get("q") || ""));
        dispatch(setTag(pathTagName));
    }, [pathTagName]);

    useEffect(() => {
        const navigateOptions = {
            search: `?${createSearchParams({ q: searchQuery })}`,
            pathname: tagName ? `/tasks/${tagName}` : "/tasks",
        };
        navigate(navigateOptions);
    }, [searchQuery, tagName]);

    const onTagChecked = useCallback(
        (name: string) => {
            dispatch(setTag(name));
        },
        [dispatch, setTag]
    );

    const onSearch = useCallback(
        (query: string) => {
            dispatch(setQuery(query));
        },
        [dispatch, setQuery]
    );

    const onButtonClick = useCallback(
        () => dispatch(showAddPopup()),
        [dispatch, showAddPopup]
    );
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
                    onClick={onButtonClick}
                >
                    + New Task
                </button>
            </div>
            <TaskTagList onChecked={onTagChecked} initTag={tagName} />
        </div>
    );
};
