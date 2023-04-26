import { PopupContainerProps, RenderArgs } from "../../types";
import { Container } from "../Container/Container";
import { Overlay } from "../Overlay/Overlay";

export class PopupContainer extends Container {
    render(args: RenderArgs) {
        return super.render({
            children: [...args.children, new Overlay().render()],
        });
    }
}
