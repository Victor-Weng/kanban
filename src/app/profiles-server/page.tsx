import { Profile } from '@/utils/supabase/profile-type';

export default async function UsersServer() {
    await new Promise(resolve => setTimeout(resolve, 2000))
    const response = await fetch("http://localhost:3000/profiles");
    const profiles = await response.json();

    return (
        <ul className="space-y-4 p-4">
            {profiles.map((profile: Profile) => (
                <li 
                key={profile.id}
                >
                    {profile.full_name} ({profile.id}) ({profile.email})
                </li>
            ))}
        </ul>
    )
}