import BucketImage from "../../images/bucket.svg";
import { ComponentProps } from "../../types";
import "./DeleteIcon.css";

export const DeleteIcon = ({ onClick }: ComponentProps) => {
    return <img src={BucketImage} onClick={onClick} className="bucket-icon" />;
};
