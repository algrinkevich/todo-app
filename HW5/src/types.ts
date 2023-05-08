import React from "react";

export interface CityCoords {
    latitude: number;
    longitude: number;
}

export enum TaskTagEnum {
    Health = "health",
    Work = "work",
    Home = "home",
    Other = "other",
}

export interface Task {
    title: string;
    isCompleted: boolean;
    plannedDate: string;
    tag: TaskTagEnum;
    id?: number;
}

export interface WeatherResponse {
    current: {
        temp_c: number;
        condition: {
            icon: string;
        };
    };
    location: { name: string };
}

export interface WeatherWidgetState {
    temperature: string;
    icon: string;
    city: string;
}

export interface DeleteIconProps {
    onClick?: () => void;
}

export interface AddTaskPopupProps {
    onCancel: () => void;
    onOk: (arg: Object) => void;
    mode: 'edit' | 'new';
    task?: Task;
}

export interface BaseTaskProps {
    task: Task;
    isChecked: boolean;
    isDisabled: boolean;
    onChange?: (event: React.FormEvent<HTMLInputElement>) => void;
    children?: React.ReactNode;
    labelStyles?: string[];
}

export interface TaskProps {
    task: Task;
    onComplete: (task: Task) => void;
    onDelete: (task: Task) => void;
    onEdit: (task: Task) => void;
}

export interface CompletedTaskProps {
    task: Task;
}

export interface InputTextProps {
    onInput: (text: string) => void;
    name: string;
    type: string;
    value: string;
    placeholder: string;
    styleClasses?: string[];
    autoFocus?: boolean;
}

export interface PopupContainerProps {
    children: React.ReactNode;
}

export interface TasksForTodayPopupProps {
    onOk: () => void;
    taskTitles: string[];
}

export interface TasksSectionProps {
    tasks: Array<Task>;
    onDeleteTask: (task: Task) => void;
    onEditTask: (task: Task) => void;
    onCompleteTask: (task: Task) => void;
    searchQuery: string;
    searchTag: TaskTagEnum
}

export interface TopPanelProps {
    onSearch: (query: string) => void;
    searchQuery: string;
    onNewTaskClick: (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => void;
    onTagChecked?: (tagName: string) => void;
}
