import { Component } from "../Component/Component.js";
import { Search } from "../Search/Search.js";
import { Button } from "../Button/Button.js";
import "./TopPanel.css";

export class TopPanel extends Component {
    /**
     * @override
     * @param props
     * @returns {HTMLElement}
     */
    render(props) {
        return super.render({
            children: [
                new Search().render({
                    placeholder: "Search Task",
                    onSearch: props.onSearch,
                    query: props.searchQuery,
                    isFocused: props.isSearchFocused,
                }),
                new Button().render({
                    text: "+ New Task",
                    onClick: props.onNewTaskClick,
                    styleClasses: [
                        "new-task-btn",
                        "top-panel__new-task-btn",
                        "confirm-btn",
                    ],
                }),
            ],
            styleClasses: ["top-panel"],
        });
    }
}
