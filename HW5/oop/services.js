const TASK_SERVICE_BASE_URL = "http://localhost:3004";
const WEATHER_SERVICE_BASE_URL = "http://api.weatherapi.com/v1";
const WEATHER_SERVICE_API_KEY = "aaf607ad42a54fe4985111445231604";

class BaseService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    get(path) {
        return fetch(`${this.baseUrl}/${path}`).then(this.handleResponse);
    }

    post(path, data) {
        return fetch(`${this.baseUrl}/${path}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then(this.handleResponse);
    }

    put(path, data) {
        return fetch(`${this.baseUrl}/${path}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then(this.handleResponse);
    }

    delete(path) {
        return fetch(`${this.baseUrl}/${path}`, {
            method: "DELETE",
        }).then(this.handleResponse);
    }

    handleResponse(response) {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json();
    }
}

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

class WeatherService extends BaseService {
    constructor(baseUrl = WEATHER_SERVICE_BASE_URL) {
        super(baseUrl);
    }

    getWeather({ latitude, longitude }) {
        return super.get(
            `current.json?key=${WEATHER_SERVICE_API_KEY}&q=${latitude},${longitude}`
        );
    }
}
