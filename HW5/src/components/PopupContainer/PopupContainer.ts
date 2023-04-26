import { PopupContainerProps } from "../../types";
import { Container } from "../Container/Container";
import { Overlay } from "../Overlay/Overlay";

export class PopupContainer extends Container {
    private componentProps: PopupContainerProps;

    constructor(props: PopupContainerProps) {
        super();
        this.componentProps = { ...props };
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
