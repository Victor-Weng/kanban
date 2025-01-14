import React from 'react';
import TaskCard from './TaskCard';
import './kanban.css'
import {NEXT_URL} from '@/url'

interface TaskColumnProps {
    column: string;
    tasks: { id: number; title: string; content: string; labels: string[]; profileId: string; }[];
    updateKanban: () => void;
}

const TaskColumn: React.FC<TaskColumnProps> = ({ column, tasks, updateKanban }) => {
    const handleDelete = async (profileId: string, taskId: number) => {
        console.log(`Delete task with id ${taskId}`);
        try {
            const response = await fetch(`${NEXT_URL}/tasks/${profileId}/${taskId}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete task');
            updateKanban()
        } catch (error) {
            console.log(`error: ${error}`);
        } 
    };

    const handleLabelChange = async (profileId: string, taskId: number, newLabel: string) => {
        console.log(`Update task with id ${taskId}`);
        try {
            const response = await fetch(`${NEXT_URL}/tasks/${profileId}/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ labels: newLabel}),
            });
            if (!response.ok) throw new Error('Failed to update task');
            updateKanban()
        } catch (error) {
            console.log(`error: ${error}`);
        } 
    };

    return (
        <div className="task-column">
            <div className="heading accent-txt bold">{column}</div>
            {tasks.map((task, index) => (
                    <TaskCard 
                    key={index} 
                    title={task.title} 
                    content={task.content}
                    labels={task.labels}
                    assignee={task.profileId}
                    onDelete={() => handleDelete(task.profileId, task.id)}
                    onLabelChange={(newLabel) => handleLabelChange(task.profileId, task.id, newLabel)}></TaskCard>
                ))}
        </div>
    );
};

export default TaskColumn;