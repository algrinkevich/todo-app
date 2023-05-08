import EditImage from "./assets/edit.svg";
import "./EditIcon.css";

export const EditIcon = ({ onClick }: { onClick: () => void }) => {
    return <img src={EditImage} className="edit-icon" onClick={onClick} />;
};
