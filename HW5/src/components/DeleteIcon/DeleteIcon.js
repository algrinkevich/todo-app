import { Image } from "../Image/Image.js";
import "./DeleteIcon.css";
import BucketImage from "../../images/bucket.svg";

export class DeleteIcon extends Image {
    /**
     * @override
     * @param props
     * @returns {HTMLElement}
     */
    render(props) {
        return super.render({
            styleClasses: ["bucket-icon"],
            onClick: props.onClick,
            src: BucketImage,
        });
    }
}
