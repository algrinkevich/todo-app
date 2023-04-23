import { PopupContainerRenderProps } from "../../types";
import { Container } from "../Container/Container";
import { Overlay } from "../Overlay/Overlay";

export class PopupContainer extends Container {
    /**
     * @override
     * @param props
     * @returns {HTMLElement}
     */
    render(props: PopupContainerRenderProps) {
        return super.render({
            children: [
                props.popupComponent.render({
                    onCancel: props.onCancel,
                    onOk: props.onOk,
                }),
                new Overlay().render(),
            ],
        });
    }
}
