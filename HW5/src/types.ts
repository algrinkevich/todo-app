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

export interface AddTaskFormRenderProps {
    onCancel: (event: Event) => void;
    onClickAdd: (newTask: { title: string; date: string }) => void;
}

export interface AddTaskPopupRenderProps {
    onCancel: (event: Event) => void;
    onOk: (arg: Object) => void;
}

export interface ButtonRenderProps {
    type?: string;
    enabled?: boolean;
    text: string;
    onClick?: (event: Event) => void;
    styleClasses: string[];
}

export interface CheckboxRenderProps {
    title: string;
    onChecked?: (title: string) => void;
}

export interface BaseTaskRenderProps {
    task: Task;
}

export interface TaskRenderProps extends BaseTaskRenderProps {
    onComplete: (task: Task) => void;
    onDelete: (task: Task) => void;
}

export interface BaseTaskListRenderProps {
    tasks: Task[];
}

export interface TaskListRenderProps extends BaseTaskListRenderProps {
    onDeleteTask: (task: Task) => void;
    onCompleteTask: (task: Task) => void;
    searchQuery: string;
}

export interface DatePickerRenderProps {
    name: string;
    styleClasses: string[];
}

export interface HeadingRenderProps {
    text: string;
    level: number;
    styleClasses?: string[];
}

export interface ImageRenderProps {
    src: string;
    styleClasses: string[];
    onClick?: (event: Event) => void;
}

export interface InputTextRenderProps {
    onInput: (event: Event) => void;
    name: string;
    type: string;
    value: string;
    placeholder: string;
    setFocus: boolean;
    styleClasses?: string[];
}

export interface LabelRenderProps {
    title: string;
    date: string;
    styleClasses: string[];
}

export interface ListRenderProps {
    styleClasses: string[];
}

export interface PopupContainerRenderProps {
    popupComponent: AddTaskPopup | TasksForTodayPopup;
}

export interface SearchRenderProps {
    onSearch: (query: string) => void;
    query: string;
    isFocused: boolean;
    placeholder: string;
}

export interface TaskTitleInputRenderProps {
    addButton: HTMLButtonElement;
    type: string;
}

export interface TasksForTodayPopupRenderProps {
    onOk: (arg: Object) => void;
    tasks: Array<string>;
}

export interface TasksSectionRenderProps {
    tasks: Array<Task>;
    onDeleteTask: (task: Task) => void;
    onCompleteTask: (task: Task) => void;
    searchQuery: string;
}

export interface TextRenderProps {
    text: string;
    styleClasses: string[];
}

export interface TopPanelRenderProps {
    onSearch: (query: string) => void;
    searchQuery: string;
    isSearchFocused: boolean;
    onNewTaskClick: (event: Event) => void;
}
