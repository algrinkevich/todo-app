import { WeatherService } from "../../services/WeatherService";
import { Image } from "../Image/Image";
import { Heading } from "../Heading/Heading";
import { Text } from "../Text/Text";
import "./WeatherWidget.css";
import { WeatherResponse, CityCoords, WeatherWidgetState } from "../../types";
import { Container } from "../Container/Container";

export class WeatherWidget extends Container {
    state: WeatherWidgetState;
    server: WeatherService;

    constructor() {
        super({ styleClasses: ["weather"] });
        this.state = { temperature: null, icon: null, city: null };
        this.server = new WeatherService();

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                this.updateWeather({
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude,
                });
            },
            (error) => {
                const TBILISI_LATITUDE = 41.6938;
                const TBILISI_LONGITUDE = 44.8015;
                this.updateWeather({
                    latitude: TBILISI_LATITUDE,
                    longitude: TBILISI_LONGITUDE,
                });
            }
        );
    }

    updateWeather({ latitude, longitude }: CityCoords) {
        this.server
            .getWeather({
                latitude: latitude,
                longitude: longitude,
            })
            .then((response: WeatherResponse) => {
                this.setState({
                    ...this.state,
                    temperature: response.current.temp_c,
                    icon: response.current.condition.icon,
                    city: response.location.name,
                });
            });
    }

    render() {
        let children: Array<HTMLElement> = [];
        if (this.state.icon) {
            children = [
                new Image({
                    src: this.state.icon,
                    styleClasses: ["weather__icon"],
                }).render(),
                new Heading({
                    level: 3,
                    text: `${this.state.temperature}°`,
                    styleClasses: ["weather__temperature"],
                }).render(),
                new Text({
                    text: this.state.city,
                    styleClasses: ["weather__city"],
                }).render(),
            ];
        }
        return super.render({
            children: children,
        });
    }
}
