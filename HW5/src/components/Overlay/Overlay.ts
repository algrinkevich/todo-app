import { Container } from "../Container/Container";
import "./Overlay.css";

export class Overlay extends Container {
    constructor() {
        super({ styleClasses: ["overlay"] });
    }
    render() {
        return super.render({ children: [] });
    }
}
