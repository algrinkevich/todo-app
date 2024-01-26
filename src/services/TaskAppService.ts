import { BaseService } from "./BaseService";
import { Task } from "../types";
import config, { BackendType } from "../config";


const TASK_SERVICE_BASE_URL = "http://localhost:3004";
const LS_TASKS_KEY = "backend-tasks";

export class TaskAppService extends BaseService {
    TASK_API_PREFIX = "tasks";

    constructor(baseUrl = TASK_SERVICE_BASE_URL) {
        super(baseUrl);
    }

    getTasks(): Promise<Array<Task>> {
        if (config.backend === BackendType.LOCAL_STORAGE) {
            return Promise.resolve(JSON.parse(localStorage.getItem(LS_TASKS_KEY)) || []);
        }
        return super.get(this.TASK_API_PREFIX);
    }

    createTask(task: Task): Promise<Task> {
        if (config.backend === BackendType.LOCAL_STORAGE) {
            return this.getTasks().then(tasks => {
                const maxId = Math.max(...tasks.map(task => task.id));
                const newTask = {...task, id: maxId + 1};
                const newTasks = [...tasks, newTask];
                localStorage.setItem(LS_TASKS_KEY, JSON.stringify(newTasks))
                return newTask;
            });
        }
        return super.post(this.TASK_API_PREFIX, {
            title: task.title,
            isCompleted: task.isCompleted,
            plannedDate: task.plannedDate,
            tag: task.tag,
        });
    }

    deleteTask(task: Task) {
        if (config.backend === BackendType.LOCAL_STORAGE) {
            return this.getTasks().then(tasks => {
                const newTasks = tasks.filter(t => t.id !== task.id);
                localStorage.setItem(LS_TASKS_KEY, JSON.stringify(newTasks));
                return task;
            })
        }
        return super
            .delete(`${this.TASK_API_PREFIX}/${task.id}`)
            .then(() => task);
    }

    updateTask(task: Task): Promise<Task> {
        if (config.backend === BackendType.LOCAL_STORAGE) {
            return this.getTasks().then(tasks => {
                const newTasks = tasks.map(t => t.id === task.id ? task : t);
                localStorage.setItem(LS_TASKS_KEY, JSON.stringify(newTasks));
                return task;                
            })
        }
        return super.put(`${this.TASK_API_PREFIX}/${task.id}`, task);
    }
}
