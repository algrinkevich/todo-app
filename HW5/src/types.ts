import { AddTaskPopup } from "./components/AddTaskPopup/AddTaskPopup";
import { TasksForTodayPopup } from "./components/TasksForTodayPopup/TasksForTodayPopup";

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

export interface ComponentRenderProps {
    onClick?: (event: Event) => void;
    styleClasses?: Array<string>;
    children?: Array<HTMLElement | string>;
}

export interface AddTaskFormRenderProps extends ComponentRenderProps {
    onCancel: (event: Event) => void;
    onClickAdd: (newTask: { title: string; date: string }) => void;
}

export interface AddTaskPopupRenderProps extends ComponentRenderProps {
    onCancel: (event: Event) => void;
    onOk: (arg: Object) => void;
}

export interface ButtonRenderProps extends ComponentRenderProps {
    type?: string;
    enabled?: boolean;
    text: string;
}

export interface CheckboxRenderProps extends ComponentRenderProps {
    title: string;
    onChecked?: (title: string) => void;
}

export interface BaseTaskRenderProps extends ComponentRenderProps {
    task: Task;
}

export interface TaskRenderProps extends BaseTaskRenderProps {
    onComplete: (task: Task) => void;
    onDelete: (task: Task) => void;
}

export interface BaseTaskListRenderProps extends ListRenderProps {
    tasks: Array<Task>;
}

export interface TaskListRenderProps extends BaseTaskListRenderProps {
    onDeleteTask: (task: Task) => void;
    onCompleteTask: (task: Task) => void;
    searchQuery: string;
}

export interface DatePickerRenderProps extends ComponentRenderProps {
    name: string;
}

export interface HeadingRenderProps extends ComponentRenderProps {
    text: string;
}

export interface ImageRenderProps extends ComponentRenderProps {
    src: string;
}

export interface InputTextRenderProps extends ComponentRenderProps {
    onInput?: (event: Event) => void;
    name?: string;
    type?: string;
    value?: string;
    placeholder?: string;
    setFocus?: boolean;
}

export interface LabelRenderProps extends ComponentRenderProps {
    title: string;
    date: string;
}

export interface ListRenderProps extends ComponentRenderProps {
    items?: Array<HTMLElement | string>;
}

export interface PopupContainerRenderProps extends ComponentRenderProps {
    popupComponent: AddTaskPopup | TasksForTodayPopup;
    onCancel?: (event: Event) => void;
    onOk: (arg: Object) => void;
}

export interface SearchRenderProps extends InputTextRenderProps {
    onSearch: (query: string) => void;
    query: string;
    isFocused: boolean;
}

export interface TaskTitleInputRenderProps extends InputTextRenderProps {
    addButton: HTMLButtonElement;
}

export interface TasksForTodayPopupRenderProps extends ComponentRenderProps {
    onOk: (arg: Object) => void;
}

export interface TasksSectionRenderProps extends ComponentRenderProps {
    tasks: Array<Task>;
    onDeleteTask: (task: Task) => void;
    onCompleteTask: (task: Task) => void;
    searchQuery: string;
}

export interface TextRenderProps extends ComponentRenderProps {
    text: string;
}

export interface TopPanelRenderProps extends ComponentRenderProps {
    onSearch: (query: string) => void;
    searchQuery: string;
    isSearchFocused: boolean;
    onNewTaskClick: (event: Event) => void;
}
