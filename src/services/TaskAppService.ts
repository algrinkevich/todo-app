import { BaseService } from "./BaseService";
import { Task } from "../types";


const TASK_SERVICE_BASE_URL = "http://localhost:3004";

export class TaskAppService extends BaseService {
    TASK_API_PREFIX = "tasks";

    constructor(baseUrl = TASK_SERVICE_BASE_URL) {
        super(baseUrl);
    }

    getTasks(): Promise<Array<Task>> {
        return super.get(this.TASK_API_PREFIX);
    }

    createTask(task: Task): Promise<Task> {
        return super.post(this.TASK_API_PREFIX, {
            title: task.title,
            isCompleted: task.isCompleted,
            plannedDate: task.plannedDate,
            tag: task.tag,
        });
    }

    deleteTask(task: Task) {
        return super
            .delete(`${this.TASK_API_PREFIX}/${task.id}`)
            .then(() => task);
    }

    updateTask(task: Task): Promise<Task> {
        return super.put(`${this.TASK_API_PREFIX}/${task.id}`, task);
    }
}
