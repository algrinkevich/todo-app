class WeatherServer {
    API_KEY = "aaf607ad42a54fe4985111445231604";
    BASE_URL = "http://api.weatherapi.com/v1";
    CURRENT_WEATHER_URL = `${this.BASE_URL}/current.json`;

    getWeather({ latitude, longitude }) {
        return fetch(
            `${this.CURRENT_WEATHER_URL}?key=${this.API_KEY}&q=${latitude},${longitude}`
        ).then(this.handleResponse);
    }

    handleResponse(response) {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    }
}
