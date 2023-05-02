import BucketImage from "../../images/bucket.svg";
import { DeleteIconProps } from "../../types";
import "./DeleteIcon.css";

export const DeleteIcon = ({ onClick }: DeleteIconProps) => {
    return <img src={BucketImage} onClick={onClick} className="bucket-icon" />;
};
