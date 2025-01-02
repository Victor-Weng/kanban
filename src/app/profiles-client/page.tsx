"use client";

import { useState, useEffect } from "react";
//import {  User } from '@supabase/supabase-js';
import { Profile } from '@/utils/supabase/profile-type';
import { Post } from '@/utils/supabase/post-type';
import { createClient } from "@/utils/supabase/client";


export default function UsersClient() {
    const supabase = createClient()
    const [profile, setProfiles] = useState< Profile[]>([])
    const [loading, setLoading] = useState(true)
    const [fullname, setFullname] = useState<string>("")
    const [username, setUsername] = useState<string | null>("")
    const [email, setEmail] = useState<string>("")
    const [error, setError] = useState<string | null>(null)
    const [post, setPost] = useState<string | null>(null)

    useEffect(() => {
        async function fetchProfiles() {
            try {
                const response = await fetch("http://localhost:3000/profiles"); // replace with server url later
                if (!response.ok) throw new Error("Failed to fetch profiles");
                const data = await response.json();
                setProfiles(data);
            } catch (err) {
                setError("Failed to fetch profiles");
                if (err instanceof Error) {
                    setError(`Failed to fetch profiles: ${err.message}`);
                }
            } finally {
                setLoading(false);
            }
        }
        fetchProfiles();
    }, []);

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/profiles", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ fullname, email }),
            });
            if (!response.ok) throw new Error("Failed to create profile");
            const newProfile = await response.json();
            setFullname("");
            setEmail(""); // clear the form input
        } catch (err) {
            setError("Failed to create profile");
            if (err instanceof Error) {
                setError(`Failed to create profile: ${err.message}`);
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
                        Full Name:
                        <input
                            type="text"
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
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
                <button type="submit">Add Profile</button>
            </form>
            <ul className="space-y-4 p-4">
                {profile.map((profile) => (
                    <li key={profile.id}>
                        ({profile.id}) ({profile.email})
                    </li>
                ))}
            </ul>
        </div>
    );
}