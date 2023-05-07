import { TaskTagEnum } from "../../types";
import "./TaskTag.css";

const NAME_TO_CLASS_MAPPING = {
    health: {
        containerClass: "radio-container--health-tag",
        radioClass: "radio-button--health-tag",
    },
    work: {
        containerClass: "radio-container--work-tag",
        radioClass: "radio-button--work-tag",
    },
    home: {
        containerClass: "radio-container--home-tag",
        radioClass: "radio-button--home-tag",
    },
    other: {
        containerClass: "radio-container--other-tag",
        radioClass: "radio-button--other-tag",
    },
};

export const TaskTag = ({
    name,
    onChecked = null,
    isSelectable,
    isDisabled,
}: {
    name: TaskTagEnum;
    onChecked?: (tagName: string) => void;
    isSelectable: boolean;
    isDisabled: boolean;
}) => {
    return (
        <label
            className={[
                "radio-container",
                NAME_TO_CLASS_MAPPING[name].containerClass,
                isDisabled ? "radio-container--disabled" : "",
            ].join(" ")}
            htmlFor={name}
        >
            {name}
            <input
                disabled={!isSelectable}
                type="radio"
                id={name}
                className={`${NAME_TO_CLASS_MAPPING[name].radioClass} radio-button`}
                name="task-tag"
                onChange={() => onChecked && onChecked(name)}
            />
        </label>
    );
};
