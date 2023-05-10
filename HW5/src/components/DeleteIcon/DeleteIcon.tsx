import { DeleteIconProps } from "../../types";
import BucketImage from "./assets/bucket.svg";
import "./DeleteIcon.css";

export const DeleteIcon = ({ onClick }: DeleteIconProps) => {
    return <img src={BucketImage} onClick={onClick} className="bucket-icon" />;
};
