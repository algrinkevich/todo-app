import { DeleteIcon } from "../DeleteIcon/DeleteIcon";
import { BaseTask } from "../BaseTask/BaseTask";
import { TaskProps } from "../../types";
import React, { useCallback } from "react";

export const Task = ({ task, onComplete, onDelete }: TaskProps) => {
    const onChange = useCallback((event: React.FormEvent<HTMLInputElement>) => {
        if (event.currentTarget.checked) {
            onComplete(task);
        }
    }, [task, onComplete]);
    const onDeleteIconClick = useCallback(() => onDelete(task), [task, onDelete]);

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
