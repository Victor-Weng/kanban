"use client";

import { useState, useEffect } from "react";
import {  User } from '@supabase/supabase-js';
import { createClient } from "@/utils/supabase/client";


export default function UsersClient() {
    const supabase = createClient()
    const [loading, setLoading] = useState(true)
    const [fullname, setFullname] = useState<string | null>(null)
    const [username, setUsername] = useState<string | null>(null)
    const [website, setWebsite] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [avatar_url, setAvatarUrl] = useState<string | null>(null)

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await fetch("http://localhost:3000/users"); // replace with server url later
                if (!response.ok) throw new Error("Failed to fetch users");
                const data = await response.json();
                setUsername(data);
            } catch (err) {
                setError("Failed to fetch users");
                if (err instanceof Error) {
                    setError(`Failed to fetch users: ${err.message}`);
                }
            } finally {
                setLoading(false);
            }
        }
        fetchUsers();
    }, []);

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email }),
            });
            if (!response.ok) throw new Error("Failed to create user");
            const newUser = await response.json();
            setUsers([...users, newUser]);
            setName(""); // clear the form input
            setEmail(""); // clear the form input
        } catch (err) {
            setError("Failed to create user");
            if (err instanceof Error) {
                setError(`Failed to create user: ${err.message}`);
            }
        }
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Name:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Email:
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                </div>
                <button type="submit">Add User</button>
            </form>
            <ul className="space-y-4 p-4">
                {users.map((user) => (
                    <li key={user.id}>
                        {user.Fullname} ({user.id}) ({user.email})
                    </li>
                ))}
            </ul>
        </div>
    );
}