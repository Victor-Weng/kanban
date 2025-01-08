'use client'
import { useCallback, useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import {  User } from '@supabase/supabase-js'
import {  Profile } from '@/utils/supabase/profile-type'

// user from logged in is passed from page.tsx. Find the corresponding
// id under public.profile and change details there.

export default function TaskForm({ user }: { user: User | null }) {
  const supabase = createClient()
  const prisma = new PrismaClient();
  const [loading, setLoading] = useState(true)
  const [title, setTitle] = useState<string | null>(null)
  const [content, setContent] = useState<string | null>(null)
  const [labels, setLabels] = useState<string[]>(null)
  const [user, setUser] = useState<Profile>(null)

  useEffect(() => {

    async function addTask({
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
    })

  }, [user])

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
          type="text" onChange={(e) => setLabels(e.target.value)}
        />
      </div>

      //
      <div>
        <button
          className="button primary block"
          onClick={() => updateProfile({ fullname, username })}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>

      <div>
        <form action="/signout" method="post">
          <button className="button block" type="submit">
            Sign out
          </button>
        </form>
      </div>
    </div>
  )
}