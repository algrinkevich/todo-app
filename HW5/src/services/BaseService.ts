export class BaseService {
    baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    get(path: string) {
        return fetch(`${this.baseUrl}/${path}`).then(this.handleResponse);
    }

    post(path: string, data: Object) {
        return fetch(`${this.baseUrl}/${path}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then(this.handleResponse);
    }

    put(path: string, data: Object) {
        return fetch(`${this.baseUrl}/${path}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then(this.handleResponse);
    }

    delete(path: string) {
        return fetch(`${this.baseUrl}/${path}`, {
            method: "DELETE",
        }).then(this.handleResponse);
    }

    handleResponse(response: Response) {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    }
}
