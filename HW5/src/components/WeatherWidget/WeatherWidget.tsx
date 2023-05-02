import { WeatherService } from "../../services/WeatherService";
import { WeatherResponse, CityCoords, WeatherWidgetState } from "../../types";
import { useEffect, useState } from "react";
import "./WeatherWidget.css";

export const WeatherWidget = () => {
    const [weather, setWeather] = useState<WeatherWidgetState>({
        temperature: null,
        icon: null,
        city: null,
    });
    const server = new WeatherService();

    const updateWeather = ({ latitude, longitude }: CityCoords) => {
        server
            .getWeather({
                latitude: latitude,
                longitude: longitude,
            })
            .then((response: WeatherResponse) => {
                setWeather({
                    temperature: response.current.temp_c,
                    icon: response.current.condition.icon,
                    city: response.location.name,
                });
            });
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                updateWeather({
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude,
                });
            },
            (error) => {
                const TBILISI_LATITUDE = 41.6938;
                const TBILISI_LONGITUDE = 44.8015;
                updateWeather({
                    latitude: TBILISI_LATITUDE,
                    longitude: TBILISI_LONGITUDE,
                });
            }
        );
    }, []);
    return (
        <div className="weather">
            <img src={weather.icon} className="weather__icon" />
            <h3 className="weather__temperature">{weather.temperature}°</h3>
            <p className="weather__city">{weather.city}</p>
        </div>
    );
};
