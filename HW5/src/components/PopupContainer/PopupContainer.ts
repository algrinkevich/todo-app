import { PopupContainerRenderProps } from "../../types";
import { Container } from "../Container/Container";
import { Overlay } from "../Overlay/Overlay";

export class PopupContainer extends Container {
    private componentProps: PopupContainerRenderProps;

    constructor(props: PopupContainerRenderProps) {
        super();
        this.componentProps = {...props};
    }

    render() {
        return super.render({
            children: [
                this.componentProps.popupComponent.render(),
                new Overlay().render(),
            ],
        });
    }
}
