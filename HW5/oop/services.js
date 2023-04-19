class BaseService {
    handleResponse(response) {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json();
    }
}

class TaskAppService extends BaseService {
    BASE_URL = "http://localhost:3004";
    TASKS_URL = `${this.BASE_URL}/tasks`;

    getTasks() {
        return fetch(this.TASKS_URL).then(this.handleResponse);
    }

    createTask(task) {
        return fetch(this.TASKS_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: task.title,
                isCompleted: task.isCompleted,
                plannedDate: task.plannedDate,
            }),
        }).then(this.handleResponse);
    }

    deleteTask(task) {
        return fetch(`${this.TASKS_URL}/${task.id}`, {
            method: "DELETE",
        }).then(this.handleResponse);
    }

    updateTask(task) {
        return fetch(`${this.TASKS_URL}/${task.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task),
        }).then(this.handleResponse);
    }
}

class WeatherService extends BaseService {
    API_KEY = "aaf607ad42a54fe4985111445231604";
    BASE_URL = "http://api.weatherapi.com/v1";
    CURRENT_WEATHER_URL = `${this.BASE_URL}/current.json`;

    getWeather({ latitude, longitude }) {
        return fetch(
            `${this.CURRENT_WEATHER_URL}?key=${this.API_KEY}&q=${latitude},${longitude}`
        ).then(this.handleResponse);
    }
}
