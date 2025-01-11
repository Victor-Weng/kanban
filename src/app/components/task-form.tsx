'use client'
import React, { useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import './kanban.css'
import './popup.css'
import { NEXT_URL } from '@/url'

type TaskFormProps = {
  user: User | null;
}

type taskData = {
  title: string;
  content: string;
  labels: string[];
}

export default function TaskForm({ user }: TaskFormProps) {
  const [profileId, setProfileId] = useState<string | null>(user?.id ?? null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [labels, setLabels] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleLabelsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setLabels([value]);
  };

  useEffect(() => {
    setProfileId(user?.id ?? null);
  }, [user]);

  async function postTask({ title, content, labels }: taskData, profileId: string | null) {
    try {
      setLoading(true);
      const response = await fetch(`${NEXT_URL}/tasks/${profileId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          labels,
        }),
      });
      if (!response.ok) throw new Error('Failed to add task');
      const data: taskData = await response.json();
      setTitle(data.title);
      setContent(data.content);
      setLabels(data.labels);
      setSuccessMessage('Task successfully added!'); // Set success message
      setTimeout(() => setSuccessMessage(null), 3000); // Hide after 3 seconds
    } catch (err) {
      if (err instanceof Error) {
        setError(`Failed to add task: ${err.message}`);
      } else {
        setError('Failed to add task');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-widget flex-end">
      {successMessage && <div className="success-message">{successMessage}</div>}
      <div className="input-card">
        <label htmlFor="title">Title</label>
        <input id="title" type="text" onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div className="input-card">
        <label htmlFor="content">Content</label>
        <input
          id="content"
          type="text"
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className="input-card">
        <label htmlFor="labels">Labels (TODO, IN-PROGRESS, COMPLETE)</label>
        <select id="labels" onChange={handleLabelsChange} defaultValue="TODO">
          <option value="TODO">TODO</option>
          <option value="IN-PROGRESS">IN-PROGRESS</option>
          <option value="COMPLETE">COMPLETE</option>
        </select>
      </div>
      <div>
        <button
          className="ClickButton"
          onClick={() => postTask({ title, content, labels }, profileId)}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Add Task'}
        </button>
      </div>
    </div>
  )
}