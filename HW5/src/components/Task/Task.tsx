import { DeleteIcon } from "../DeleteIcon/DeleteIcon";
import { TaskProps } from "../../types";
import React from "react";
import { BaseTask } from "../BaseTask/BaseTask";

export const Task = ({ task, onComplete, onDelete }: TaskProps) => {
    const onChange = (event: React.FormEvent<HTMLInputElement>) => {
        if (event.currentTarget.checked) {
            onComplete(task);
        }
    };

    const onDeleteIconClick = () => onDelete(task);

    return (
        <BaseTask
            task={task}
            isChecked={false}
            isDisabled={false}
            onChange={onChange}
        >
            <DeleteIcon onClick={onDeleteIconClick} />
        </BaseTask>
    );
};
