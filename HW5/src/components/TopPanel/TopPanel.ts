import { Search } from "../Search/Search";
import { Button } from "../Button/Button";
import "./TopPanel.css";
import { Container } from "../Container/Container";
import { TopPanelRenderProps } from "../../types";

export class TopPanel extends Container {
    /**
     * @override
     * @param props
     * @returns {HTMLElement}
     */
    render(props: TopPanelRenderProps) {
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
