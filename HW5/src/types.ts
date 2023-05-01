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
    onClick?: (event: Event) => void;
    styleClasses?: Array<string>;
    children?: Array<HTMLElement | string>;
}

export interface AddTaskFormProps {
    onCancel: (event: Event) => void;
    onClickAdd: (newTask: { title: string; date: string }) => void;
}

export interface AddTaskPopupProps {
    onCancel: (event: Event) => void;
    onOk: (arg: Object) => void;
}

export interface ButtonProps {
    type?: string;
    enabled?: boolean;
    text: string;
    onClick?: (event: Event) => void;
    styleClasses: string[];
}

export interface CheckboxProps {
    title: string;
    onChecked?: (title: string) => void;
}

export interface BaseTaskProps {
    task: Task;
}

export interface TaskProps extends BaseTaskProps {
    onComplete: (task: Task) => void;
    onDelete: (task: Task) => void;
}

export interface BaseTaskListProps {
    tasks: Task[];
}

export interface TaskListProps extends BaseTaskListProps {
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
    onClick?: (event: Event) => void;
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
    popupComponent: AddTaskPopup | TasksForTodayPopup;
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
    onOk: (arg: Object) => void;
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
    isSearchFocused: boolean;
    onNewTaskClick: (event: Event) => void;
}
