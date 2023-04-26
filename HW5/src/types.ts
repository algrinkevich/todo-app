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

export interface AddTaskFormRenderProps extends ComponentProps {
    onCancel: (event: Event) => void;
    onClickAdd: (newTask: { title: string; date: string }) => void;
}

export interface AddTaskPopupRenderProps extends ComponentProps {
    onCancel: (event: Event) => void;
    onOk: (arg: Object) => void;
}

export interface ButtonRenderProps extends ComponentProps {
    type?: string;
    enabled?: boolean;
    text: string;
}

export interface CheckboxRenderProps extends ComponentProps {
    title: string;
    onChecked?: (title: string) => void;
}

export interface BaseTaskRenderProps extends ComponentProps {
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

export interface DatePickerRenderProps extends ComponentProps {
    name: string;
}

export interface HeadingRenderProps extends ComponentProps {
    text: string;
    level: number;
}

export interface ImageRenderProps extends ComponentProps {
    src: string;
}

export interface InputTextRenderProps extends ComponentProps {
    onInput?: (event: Event) => void;
    name?: string;
    type?: string;
    value?: string;
    placeholder?: string;
    setFocus?: boolean;
}

export interface LabelRenderProps extends ComponentProps {
    title: string;
    date: string;
}

export interface ListRenderProps extends ComponentProps {
    items?: Array<HTMLElement | string>;
}

export interface PopupContainerRenderProps extends ComponentProps {
    popupComponent: AddTaskPopup | TasksForTodayPopup;
}

export interface SearchRenderProps extends InputTextRenderProps {
    onSearch: (query: string) => void;
    query: string;
    isFocused: boolean;
}

export interface TaskTitleInputRenderProps extends InputTextRenderProps {
    addButton: HTMLButtonElement;
}

export interface TasksForTodayPopupRenderProps extends ComponentProps {
    onOk: (arg: Object) => void;
    tasks: Array<string>;
}

export interface TasksSectionRenderProps extends ComponentProps {
    tasks: Array<Task>;
    onDeleteTask: (task: Task) => void;
    onCompleteTask: (task: Task) => void;
    searchQuery: string;
}

export interface TextRenderProps extends ComponentProps {
    text: string;
}

export interface TopPanelRenderProps extends ComponentProps {
    onSearch: (query: string) => void;
    searchQuery: string;
    isSearchFocused: boolean;
    onNewTaskClick: (event: Event) => void;
}
