"use client"
import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../AuthContext';
import TaskColumn from './TaskColumn';
import {Post} from '../utils/supabase/post-type';
import {Popup} from './popup';
import {NEXT_URL} from '@/url';

export default function Kanban() {
    const { user } = useContext(AuthContext); // authentication context (holds the value provided to the context provider)
    const [loading, setLoading] = useState<boolean>(true);
    const [tasks, setTasks] = useState<Post[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [update, setUpdate] = useState<boolean>(false);
    const [popup, setPopup] = useState<boolean>(false);

    useEffect(() => {
        if (!user) {
            return; // Exit early if user is null
        }

        async function getTasks(profileId: string) {
            try {
                const response = await fetch(`${NEXT_URL}/tasks/${profileId}`); // replace with server url later
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

        console.log("useEffect triggered");

    }, [user, update]);

    const updateKanban = () => {
        setUpdate(prev => !prev); // toggle refresh state
    }

    // can later make these columns into an array ["todo","inProgress"..] so user can add their own columns
    // tasks is an array of the posts
    // each post has a label property that has an array of the labels
    // match and sort based on these labels in the corresponding array below

    
    const todoTasks = tasks.filter(task => task.labels.includes('TODO'))
    const inProgressTasks = tasks.filter(task => task.labels.includes('IN-PROGRESS'))
    const completeTasks = tasks.filter(task => task.labels.includes('COMPLETE'))
    
    function togglePopup() {
        console.log("popup toggled")
        setPopup(prev => !prev);
    }

    if (loading) {
        return <div>Loading... Have you logged in first? Try refreshing the page if nothing shows up.</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="whole">
            {popup ? (
                <Popup togglePopupAction={togglePopup} updateKanban={updateKanban}/>
            ):(null)}
        <div className="vertical highlight-bg">.
                <h1 className="title">Kanban Board</h1>
                <div className="row-flex height-5 mid-bg">
                    <p className="highlight-txt">search bar</p>
                    <p className="highlight-txt">icons</p>
                    <p className="highlight-txt">drop down</p>
                    <button className="accent-bg highlight-txt" onClick={togglePopup}>add task</button>
                </div>
                <div className="row-flex height-100 highlight-bg">
                    <TaskColumn column="TO-DO" tasks={todoTasks} updateKanban={updateKanban}/>
                    <TaskColumn column="IN PROGRESS" tasks={inProgressTasks} updateKanban={updateKanban}/>
                    <TaskColumn column="COMPLETE" tasks={completeTasks} updateKanban={updateKanban}/>
                </div>
                <div className="horz"></div>
            </div>
         </div>
    );
}


