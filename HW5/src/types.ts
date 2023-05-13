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

export interface PopupsState {
    showAddPopup: boolean;
    editableTask: Task
}

export interface SearchState {
    query: string;
    tag: TaskTagEnum;
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
    mode: "edit" | "new";
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
