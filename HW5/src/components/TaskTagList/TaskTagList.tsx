import { useEffect, useState } from "react";
import { TaskTagEnum } from "../../types";
import { TaskTag } from "../TaskTag/TaskTag";
import "./TaskTagList.css";

export const TaskTagList = ({
    onChecked,
    initTag = null
}: {
    onChecked: (tagName: TaskTagEnum) => void;
    initTag?: TaskTagEnum;
}) => {
    const [checkedTag, setCheckedTag] = useState(initTag);
    const onCheckedWrapper = (name: TaskTagEnum, isChecked: boolean) => {
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
