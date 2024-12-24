type User = {
    id: number;
    name: string;
};

export default async function UsersServer() {
    await new Promise(resolve => setTimeout(resolve, 2000))
    const response = await fetch("http://localhost:3000/users");
    const users = await response.json();

    return (
        <ul className="space-y-4 p-4">
            {users.map((user: User) => (
                <li 
                key={user.id}
                >
                    {user.name} ({user.id})
                </li>
            ))}
        </ul>
    )
}