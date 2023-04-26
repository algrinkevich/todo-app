import { Search } from "../Search/Search";
import { Button } from "../Button/Button";
import "./TopPanel.css";
import { Container } from "../Container/Container";
import { TopPanelProps } from "../../types";

export class TopPanel extends Container {
    private componentProps: TopPanelProps;

    constructor(props: TopPanelProps) {
        super({ styleClasses: ["top-panel"] });
        this.componentProps = { ...props };
    }

    render() {
        return super.render({
            children: [
                new Search({
                    placeholder: "Search Task",
                    onSearch: this.componentProps.onSearch,
                    query: this.componentProps.searchQuery,
                    isFocused: this.componentProps.isSearchFocused,
                }).render(),
                new Button({
                    text: "+ New Task",
                    onClick: this.componentProps.onNewTaskClick,
                    styleClasses: [
                        "new-task-btn",
                        "top-panel__new-task-btn",
                        "confirm-btn",
                    ],
                }).render(),
            ],
        });
    }
}
