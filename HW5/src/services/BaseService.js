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

export { BaseService };