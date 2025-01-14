"use client";
import { useState, useEffect } from "react";
import { Profile } from '@/utils/supabase/profile-type';
import { createClient } from "@/utils/supabase/client";
import {NEXT_URL} from '@/url'


export default function UsersClient() {
    const supabase = createClient()
    const [profile, setProfiles] = useState< Profile[]>([])
    const [loading, setLoading] = useState(true)
    const [fullname, setFullname] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [error, setError] = useState<string | null>(null)
    const [post, setPost] = useState<string | null>(null)

    useEffect(() => {
        async function fetchProfiles() {
            try {
                const response = await fetch(`${NEXT_URL}/profiles`); // replace with server url later
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


    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <ul className="space-y-4 p-4">
                {profile.map((profile) => (
                    <li key={profile.id}>
                        ({profile.username}) ({profile.email})
                    </li>
                ))}
            </ul>
        </div>
    );
}