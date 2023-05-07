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
    onChecked,
}: {
    name: TaskTagEnum;
    onChecked: (tagName: string) => void;
}) => {
    return (
        <label
            className={`radio-container ${NAME_TO_CLASS_MAPPING[name].containerClass}`}
            htmlFor={name}
        >
            {name}
            <input
                type="radio"
                id={name}
                className={`radio-button ${NAME_TO_CLASS_MAPPING[name].radioClass}`}
                name="task-tag"
                onChange={() => onChecked(name)}
            />
        </label>
    );
};
