import { TaskTagEnum } from "../../types";
import "./TaskTag.css";

const NAME_TO_CLASS_MAPPING = {
    health: {
        tagClass: "task-tag--health-tag",
        radioClass: "radio-button--health-tag",
    },
    work: {
        tagClass: "task-tag--work-tag",
        radioClass: "radio-button--work-tag",
    },
    home: {
        tagClass: "task-tag--home-tag",
        radioClass: "radio-button--home-tag",
    },
    other: {
        tagClass: "task-tag--other-tag",
        radioClass: "radio-button--other-tag",
    },
};

export const TaskTag = ({
    name,
    onChange = null,
    isSelectable,
    isDisabled,
    isChecked = false,
}: {
    name: TaskTagEnum;
    onChange?: (tagName: string, checked: boolean) => void;
    isSelectable: boolean;
    isDisabled: boolean;
    isChecked?: boolean;
}) => {
    return (
        <div
            className={[
                "task-tag",
                NAME_TO_CLASS_MAPPING[name].tagClass,
                isDisabled ? "task-tag--disabled" : "",
            ].join(" ")}
            data-checked={isChecked}
            onClick={(event) => {
                if (!isSelectable) {
                    return;
                }
                const isNowChecked = !(
                    event.currentTarget.dataset.checked === "true"
                );
                event.currentTarget.dataset.checked = isNowChecked.toString();
                if (onChange) {
                    onChange(name, isNowChecked);
                }
            }}
        >
            {name}
        </div>
    );
};
