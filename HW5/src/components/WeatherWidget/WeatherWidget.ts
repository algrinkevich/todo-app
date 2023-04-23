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
        super();
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
                new Image().render({
                    src: this.state.icon,
                    styleClasses: ["weather__icon"],
                }),
                new Heading({ level: 3 }).render({
                    text: `${this.state.temperature}°`,
                    styleClasses: ["weather__temperature"],
                }),
                new Text().render({
                    text: this.state.city,
                    styleClasses: ["weather__city"],
                }),
            ];
        }
        return super.render({
            children: children,
            styleClasses: ["weather"],
        });
    }
}
