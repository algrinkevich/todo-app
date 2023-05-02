import React from "react";
import { AddTaskPopup } from "./components/AddTaskPopup/AddTaskPopup";
import { TasksForTodayPopup } from "./components/TasksForTodayPopup/TasksForTodayPopup";

export interface RenderArgs {
    children: Array<HTMLElement | string>;
}

export interface CityCoords {
    latitude: number;
    longitude: number;
}

export interface Task {
    title: string;
    isCompleted: boolean;
    plannedDate: string;
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
    temperature: number;
    icon: string;
    city: string;
}

export interface ComponentProps {
    onClick?: () => void;
    styleClasses?: Array<string>;
    children?: Array<HTMLElement | string>;
}

export interface AddTaskFormProps {
    onCancel: () => void;
    onClickAdd: (newTask: { title: string; date: string }) => void;
}

export interface AddTaskPopupProps {
    onCancel: () => void;
    onOk: (arg: Object) => void;
}

export interface ButtonProps {
    type?: string;
    enabled?: boolean;
    text: string;
    onClick?: () => void;
    styleClasses: string[];
}

export interface CheckboxProps {
    title: string;
    onChecked?: (title: string) => void;
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
}

export interface CompletedTaskProps {
    task: Task;
}

export interface CompletedTaskListProps {
    tasks: Task[];
}

export interface TaskListProps {
    tasks: Task[];
    onDeleteTask: (task: Task) => void;
    onCompleteTask: (task: Task) => void;
    searchQuery: string;
}

export interface DatePickerProps {
    name: string;
    styleClasses: string[];
}

export interface HeadingProps {
    text: string;
    level: number;
    styleClasses?: string[];
}

export interface ImageProps {
    src: string;
    styleClasses: string[];
    onClick?: () => void;
}

export interface InputTextProps {
    onInput: (event: Event) => void;
    name: string;
    type: string;
    value: string;
    placeholder: string;
    setFocus: boolean;
    styleClasses?: string[];
}

export interface LabelProps {
    title: string;
    date: string;
    styleClasses: string[];
}

export interface ListProps {
    styleClasses: string[];
}

export interface PopupContainerProps {
    children: React.ReactNode;
}

export interface SearchProps {
    onSearch: (query: string) => void;
    query: string;
    isFocused: boolean;
    placeholder: string;
}

export interface TaskTitleInputProps {
    addButton: HTMLButtonElement;
    type: string;
}

export interface TasksForTodayPopupProps {
    onOk: () => void;
    tasks: Array<string>;
}

export interface TasksSectionProps {
    tasks: Array<Task>;
    onDeleteTask: (task: Task) => void;
    onCompleteTask: (task: Task) => void;
    searchQuery: string;
}

export interface TextProps {
    text: string;
    styleClasses: string[];
}

export interface TopPanelProps {
    onSearch: (query: string) => void;
    searchQuery: string;
    onNewTaskClick: (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => void;
}
