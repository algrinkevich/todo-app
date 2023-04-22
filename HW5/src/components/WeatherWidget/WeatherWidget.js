import { WeatherService } from "../../services/WeatherService.js";
import { Component } from "../Component/Component.js";
import { Image } from "../Image/Image.js";
import { Heading } from "../Heading/Heading.js";
import { Text } from "../Text/Text.js";
import "./WeatherWidget.css";

export class WeatherWidget extends Component {
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

    updateWeather({ latitude, longitude }) {
        this.server
            .getWeather({
                latitude: latitude,
                longitude: longitude,
            })
            .then((response) => {
                this.setState({
                    ...this.state,
                    temperature: response.current.temp_c,
                    icon: response.current.condition.icon,
                    city: response.location.name,
                });
            });
    }

    render(props) {
        let children = [];
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
