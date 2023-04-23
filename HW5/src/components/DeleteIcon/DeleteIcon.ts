import { Image } from "../Image/Image";
import "./DeleteIcon.css";
import BucketImage from "../../images/bucket.svg";
import { ComponentRenderProps } from "../../types";

export class DeleteIcon extends Image {
    /**
     * @override
     * @param props
     * @returns {HTMLElement}
     */
    render(props: ComponentRenderProps) {
        return super.render({
            styleClasses: ["bucket-icon"],
            onClick: props.onClick,
            src: BucketImage,
        });
    }
}
