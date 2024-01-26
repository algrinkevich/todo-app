import "./TaskList.css";


export const TaskList = ({ children }: { children: React.ReactNode }) => {
    return <ul className="task-section">{children}</ul>;
};
