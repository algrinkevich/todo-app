import { ListProps } from "../../types";
import { List } from "../List/List";
import "./BaseTaskList.css";

export class BaseTaskList extends List {
    constructor(props: ListProps) {
        super({
            ...props,
            styleClasses: [...props.styleClasses, "task-section"],
        });
    }
}
