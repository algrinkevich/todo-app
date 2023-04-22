import { BaseService } from "./BaseService.js";

const TASK_SERVICE_BASE_URL = "http://localhost:3004";

class TaskAppService extends BaseService {
    TASK_API_PREFIX = "tasks";

    constructor(baseUrl = TASK_SERVICE_BASE_URL) {
        super(baseUrl);
    }

    getTasks() {
        return super.get(this.TASK_API_PREFIX);
    }

    createTask(task) {
        return super.post(this.TASK_API_PREFIX, {
            title: task.title,
            isCompleted: task.isCompleted,
            plannedDate: task.plannedDate,
        });
    }

    deleteTask(task) {
        return super.delete(`${this.TASK_API_PREFIX}/${task.id}`);
    }

    updateTask(task) {
        return super.put(`${this.TASK_API_PREFIX}/${task.id}`, task);
    }
}

export { TaskAppService };
