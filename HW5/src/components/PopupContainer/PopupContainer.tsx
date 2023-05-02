import { PopupContainerProps} from "../../types";
import "../Overlay/Overlay.css"


export const PopupContainer = ({ children }: PopupContainerProps) => {
    return (
        <div>
            {children}
            <div className="overlay"></div>
        </div>
    );
};
