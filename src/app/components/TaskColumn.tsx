import React from 'react';
import TaskCard from './TaskCard';
import './kanban.css'

interface TaskColumnProps {
    column: string;
    tasks: [];
}

const TaskColumn: React.FC<TaskColumnProps> = ({ column, tasks }) => {
    const handleDelete = async (profileId: string, taskId: number) => {
        console.log(`Delete task with id ${taskId}`);
        try {
            const response = await fetch(`http://localhost:3000/tasks/${profileId}/${taskId}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete task');
        } catch (error) {
            console.log(`error: ${error}`);
        }
          
    };

    return (
        <div className="task-column">
            <div className="heading">{column}</div>
            {tasks.map((task, index) => (
                    <TaskCard 
                    key={index} 
                    title={task.title} 
                    content={task.content}
                    labels={task.labels}
                    assignee={task.profileId}
                    onDelete={() => handleDelete(task.profileId, task.id)}></TaskCard>
                ))}
        </div>
    );
};

export default TaskColumn;