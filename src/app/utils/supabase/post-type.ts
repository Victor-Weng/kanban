import { Profile } from "./profile-type";

export type Post = {
    id: number; // Assuming Int maps to number
    title: string; // Assuming String maps to string
    content: string; // Assuming String maps to string
    profileId: number; // Assuming Int maps to number
    labels: string[];
};
