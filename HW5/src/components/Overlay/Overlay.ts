import { Container } from "../Container/Container";
import "./Overlay.css";

export class Overlay extends Container {
    /**
     * @override
     * @returns {HTMLElement}
     */
    render() {
        return super.render({
            children: [],
            styleClasses: ["overlay"],
        });
    }
}
