import { useEffect, useState } from "react";
import { TaskTagEnum } from "../../types";
import { TaskTag } from "../TaskTag/TaskTag";
import "./TaskTagList.css";

export const TaskTagList = ({
    onChecked,
}: {
    onChecked: (tagName: string) => void;
}) => {
    const [checkedTag, setCheckedTag] = useState(null);
    const onCheckedWrapper = (name: string, isChecked: boolean) => {
        const newTagName = isChecked ? name : null;
        setCheckedTag(newTagName);
        onChecked(newTagName);
    };

    return (
        <div className="tags-container">
            {Object.values(TaskTagEnum).map((value: TaskTagEnum) => {
                return (
                    <TaskTag
                        key={value}
                        name={value}
                        onChange={onCheckedWrapper}
                        isSelectable={true}
                        isDisabled={false}
                        isChecked={value === checkedTag}
                    />
                );
            })}
        </div>
    );
};
