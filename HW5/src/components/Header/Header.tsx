import { WeatherWidget } from "../WeatherWidget/WeatherWidget";
import "./Header.css";

export const Header = () => {
    return (
        <header className="header">
            <h1 className="app-wraper__heading heading">To Do List</h1>
            <WeatherWidget />
        </header>
    );
};
