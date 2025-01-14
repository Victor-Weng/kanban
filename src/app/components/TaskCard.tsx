import React from 'react';
import './kanban.css'

interface TaskCardProps {
    title: string;
    content: string;
    labels: string[];
    assignee: string;
    onDelete: () => void;
    onLabelChange: (newLabel: string) => void; // Add a prop for handling label changes
}

const TaskCard: React.FC<TaskCardProps> = ({ title, content, labels, assignee, onDelete, onLabelChange}) => {
    const handleLabelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onLabelChange(e.target.value);
      };
    
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
                <select onChange={handleLabelChange} multiple={false} defaultValue={labels[0]}>
                <option value="TODO">TODO</option>
                <option value="IN-PROGRESS">IN-PROGRESS</option>
                <option value="COMPLETE">COMPLETE</option>
            </select>
            </div>
        </div>
    );
};


export default TaskCard;