import { Component } from "../Component/Component.js";
import { Overlay } from "../Overlay/Overlay.js";

export class PopupContainer extends Component {
    /**
     * @override
     * @param props
     * @returns {HTMLElement}
     */
    render(props) {
        return super.render({
            children: [
                props.popupComponent.render({
                    onCancel: props.onCancel,
                    onOk: props.onOk,
                }),
                new Overlay().render({}),
            ],
        });
    }
}
