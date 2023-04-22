import { Component } from "../Component/Component.js";
import "./PopupButtonsContainer.css";

export class PopupButtonsContainer extends Component {
    render(props) {
        return super.render({
            children: props.children,
            styleClasses: ["buttons-container"],
        });
    }
}
