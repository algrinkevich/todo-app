import { PopupContainerProps } from "../../types";

import "./PopupContainer.css";


export const PopupContainer = ({ children }: PopupContainerProps) => {
    return (
        <div>
            <div className="popup">{children}</div>
            <div className="overlay"></div>
        </div>
    );
};
