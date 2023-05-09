import React, { useCallback } from "react";
import { useDispatch } from "react-redux";

import { DeleteIcon } from "../DeleteIcon/DeleteIcon";
import { EditIcon } from "../EditIcon/EditIcon";
import { BaseTask } from "../BaseTask/BaseTask";
import { AppDispatch } from "../../store";
import { deleteTask, updateTask } from "../../slices/tasks";
import { TaskProps } from "../../types";
import { showEditPopup } from "../../slices/popups";

export const Task = ({ task }: TaskProps) => {
    const dispatch = useDispatch<AppDispatch>();

    const onChange = useCallback(
        (event: React.FormEvent<HTMLInputElement>) => {
            if (event.currentTarget.checked) {
                const completedTask = { ...task, isCompleted: true };
                dispatch(updateTask(completedTask));
            }
        },
        [task, dispatch]
    );
    const onDeleteIconClick = useCallback(
        () => dispatch(deleteTask(task)),
        [task, dispatch]
    );
    const onEditIconClick = useCallback(
        () => dispatch(showEditPopup(task)),
        [task, dispatch]
    );

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
