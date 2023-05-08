import { DeleteIcon } from "../DeleteIcon/DeleteIcon";
import { BaseTask } from "../BaseTask/BaseTask";
import { TaskProps } from "../../types";
import React, { useCallback } from "react";
import { EditIcon } from "../EditIcon/EditIcon";

export const Task = ({ task, onComplete, onDelete, onEdit }: TaskProps) => {
    const onChange = useCallback((event: React.FormEvent<HTMLInputElement>) => {
        if (event.currentTarget.checked) {
            onComplete(task);
        }
    }, [task, onComplete]);
    const onDeleteIconClick = useCallback(() => onDelete(task), [task, onDelete]);
    const onEditIconClick = useCallback(() => onEdit(task), [task, onEdit]);

    return (
        <BaseTask
            task={task}
            isChecked={false}
            isDisabled={false}
            onChange={onChange}
        >
            <EditIcon onClick={onEditIconClick} />
            <DeleteIcon onClick={onDeleteIconClick} />
        </BaseTask>
    );
};
