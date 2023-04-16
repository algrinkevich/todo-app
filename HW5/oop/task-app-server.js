class TaskAppServer {
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

    handleResponse(response) {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json();
    }
}
