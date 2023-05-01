import { Image } from "../Image/Image";
import "./DeleteIcon.css";
import BucketImage from "../../images/bucket.svg";
import { ComponentProps } from "../../types";

export class DeleteIcon extends Image {
    constructor(props: ComponentProps) {
        super({
            styleClasses: ["bucket-icon"],
            onClick: props.onClick,
            src: BucketImage,
        });
    }
}
