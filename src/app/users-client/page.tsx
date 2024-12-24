"use client";

import { useState, useEffect } from "react";

type User = {
    id: number;
    name: string;
};

export default function UsersClient() {
    const [users, setUsers] = useState<User[]>([]); //array
    const [loading, setLoading] = useState(true); // boolean
    const [error, setError] = useState(""); // error messages

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await fetch(
                    "http://localhost:3000/users" // replace with db later
                );
                if(!response.ok) throw new Error("Failed to fetch users");
                const data = await response.json();
                setUsers(data);
            } catch (err) {
                setError("Failed to fetch users");
                if (err instanceof Error) {
                    setError('failed to fetch users: ${err.message}');
                }
            } finally {
                setLoading(false);
            }
        }
        fetchUsers();
    }, []);

    // conditional rendering

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <ul className="space-y-4 p-4">
            {users.map((user) => (
                <li 
                key={user.id}
                >
                    {user.name} ({user.id})
                </li>
            ))}
        </ul>
    )

}