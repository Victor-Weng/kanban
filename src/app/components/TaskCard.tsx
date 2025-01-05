import React from 'react';

interface TaskCardProps {
    title: string;
    content: string;
    labels: string[];
    profile: string;
    onDelete: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ title, content, labels, assignee, onDelete }) => {
    return (
        <div className="task-card">
            <div className="task-header">
                <span className="task-title">{title}</span>
                <div className="task-labels">
                    {labels.map((label, index) => (
                        <span key={index} className="task-label">{label}</span>
                    ))}
                </div>
                <button className="delete" onClick={onDelete}>Delete</button>
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