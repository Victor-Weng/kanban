'use client'
import React, { useEffect, useContext, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import {  User } from '@supabase/supabase-js'

type TaskFormProps = {
  user: User | null;
} 

type taskData = {
  title: string;
  content: string;
  labels: string[];
}


// user from logged in is passed from page.tsx. Find the corresponding
// id under public.profile and change details there.

export default function TaskForm({ user }: TaskFormProps) {
  const [profileId, setProfileId] = useState<string | null>(user?.id);
  const supabase = createClient()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [labels, setLabels] = useState<string[]>([])

  const handleLabelsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const labelsArray = value.split(',').map(label => label.trim()); // remove whitespace from front and back
    setLabels(labelsArray);
  }

  useEffect(() => { // incase user logsout or something
    setProfileId(user?.id);
  },[user])

  async function postTask({title, content, labels}: taskData, profileId: string) {
      try {
        setLoading(true);
          const response = await fetch(`http://localhost:3000/tasks/${profileId}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                title,
                content,
                labels,
              }),
            }); // replace with server url later
          if (!response.ok) throw new Error('Failed to fetch tasks for profile');
          const data: taskData = await response.json();
          setTitle(data.title);
          setContent(data.content);
          setLabels(data.labels);
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

  console.log("useEffect triggered from task-form");

  // ADD TASK
  
  async function addTask({
    title, content, labels, profileId,
  }: {
    title: string | null
    content: string | null
    labels: string[] | null
    profileId: string | null
  }) {
    
  }

  return (
    <div className="form-widget">

      {/* ... */}

      <div>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" onChange={(e) => setTitle(e.target.value)}/>
      </div>
      <div>
        <label htmlFor="content">Content</label>
        <input
          id="content"
          type="text"
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="labels">Labels</label>
        <input
          id="labels"
          type="text" onChange={handleLabelsChange} // labels are string array
        />
      </div>

      //
      <div>
        <button
          className="button primary block"
          onClick={() => postTask({ title, content, labels }, profileId )}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>
    </div>
  )
}