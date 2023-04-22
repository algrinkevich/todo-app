import { Component } from "../Component/Component.js";
import "./Overlay.css";

export class Overlay extends Component {
    /**
     * @override
     * @param props
     * @returns {HTMLElement}
     */
    render(props) {
        return super.render({
            children: [],
            styleClasses: ["overlay"],
        });
    }
}
