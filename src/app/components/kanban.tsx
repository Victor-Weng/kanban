"use client"
import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../AuthContext';
import TaskColumn from './TaskColumn';

export default function Kanban() {
    const { user } = useContext(AuthContext); // authentication context (holds the value provided to the context provider)
    const [loading, setLoading] = useState<boolean>(true);
    const [tasks, setTasks] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!user) {
            return; // Exit early if user is null
        }

        async function getTasks(profileId: string) {
            try {
                const response = await fetch(`http://localhost:3000/tasks/${profileId}`); // replace with server url later
                if (!response.ok) throw new Error('Failed to fetch tasks for profile');
                const data = await response.json();
                setTasks(data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(`Failed to fetch tasks: ${err.message}`);
                } else {
                    setError('Failed to fetch tasks');
                }
            } finally {
                setLoading(false);
            }
        }

        getTasks(user.id);
    }, [user]);

    // can later make these columns into an array ["todo","inProgress"..] so user can add their own columns
    // tasks is an array of the posts
    // each post has a label property that has an array of the labels
    // match and sort based on these labels in the corresponding array below

    
    const todoTasks = tasks.filter(task => task.labels.includes('TODO'))
    const inProgressTasks = tasks.filter(task => task.labels.includes('IN-PROGRESS'))
    const completeTasks = tasks.filter(task => task.labels.includes('COMPLETE'))

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="vertical">
            <h1 className="title">Kanban Board</h1>
            <div className="row-flex height-5">
                <p>search bar</p>
                <p>icons</p>
                <p>drop down</p>
                <p>add tasks</p>
            </div>
            <div className="row-flex height-100">
                <TaskColumn column="TO-DO" tasks={todoTasks} />
                <TaskColumn column="IN PROGRESS" tasks={inProgressTasks} />
                <TaskColumn column="COMPLETE" tasks={completeTasks} />
            </div>
            <div className="horz"></div>
        </div>
    );
}