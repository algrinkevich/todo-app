import { BaseService } from "./BaseService.js";

const WEATHER_SERVICE_BASE_URL = "http://api.weatherapi.com/v1";
const WEATHER_SERVICE_API_KEY = "aaf607ad42a54fe4985111445231604";

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

export { WeatherService };