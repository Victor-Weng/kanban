"use client"
import React, { useContext } from 'react';
import AuthContext from '../AuthContext';
import TaskColumn from './TaskColumn';
import './kanban.css'

export default function Kanban(){
    const val = useContext(AuthContext); // authentication context (holds the value provided to the context provider)

    

    const todoTasks = ['Task 1', 'Task 2', 'Task 3'];
    const inProgressTasks = ['Task 4', 'Task 5'];
    const completeTasks = ['Task 6', 'Task 7'];

    return(
        <div className="vertical">
            <h1 className="title">Kanban Board</h1>
            <div className="row-flex height-5">
                <p>search bar</p>
                <p>icons</p>
                <p>drop down</p>
                <p>add tasks</p>
            </div>
            <div className="row-flex height-100">
                <TaskColumn title="TO-DO" tasks={todoTasks} />
                <TaskColumn title="IN PROGRESS" tasks={inProgressTasks} />
                <TaskColumn title="COMPLETE" tasks={completeTasks} />
            </div>
        </div>
    )
}