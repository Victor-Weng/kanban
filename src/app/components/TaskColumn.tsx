import React from 'react';
import TaskCard from './TaskCard';
import './kanban.css'

interface TaskColumnProps {
    title: string;
    tasks: string[];
}

const TaskColumn: React.FC<TaskColumnProps> = ({ title, tasks }) => {
    return (
        <div className="task-column">
            <TaskCard title={title} tasks={tasks} />
        </div>
    );
};

export default TaskColumn;