import React from 'react';
import './kanban.css'

interface TaskCardProps {
    title: string;
    content: string;
    labels: string[];
    assignee: string;
    onDelete: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ title, content, labels, assignee, onDelete }) => {
    return (
        <div className="task-card highlight-bg">
            <div className="task-header accent-bg">
                <span className="task-title accent-bg">{title}</span>
                <div className="task-labels mid-bg">
                    {labels.map((label, index) => (
                        <span key={index} className="task-label">{label}</span>
                    ))}
                </div>
                <button className="delete highlight-txt" onClick={onDelete}>Delete</button>
            </div>
            <div className="task-content">
                {content}
            </div>
            <div className="task-footer">
                <p>{assignee}</p>
            </div>
        </div>
    );
};


export default TaskCard;