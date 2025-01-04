import React from 'react';

interface TaskCardProps {
    title: string;
    tasks: string[];
}

const TaskCard: React.FC<TaskCardProps> = ({ title, tasks }) => {
    return (
        <div className="task-card">
            <div className="heading">
                {title}
            </div>
            {tasks.map((task, index) => (
                    <div key={index} className="task-item">
                        {task}
                    </div>
                ))}
        </div>
    );
};

export default TaskCard;