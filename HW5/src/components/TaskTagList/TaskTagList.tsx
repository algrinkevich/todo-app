import { TaskTagEnum } from "../../types";
import { TaskTag } from "../TaskTag/TaskTag";
import "./TaskTagList.css";


export const TaskTagList = ({onChecked}: {onChecked: (tagName: string) => void}) => {
    return (
        <div className="tags-container">
            {Object.values(TaskTagEnum).map((value: TaskTagEnum) => (
                <TaskTag
                    key={value}
                    name={value}
                    onChecked={onChecked}
                    isSelectable={true}
                    isDisabled={false}
                />
            ))}
        </div>
    );
};
