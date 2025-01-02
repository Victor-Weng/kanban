import { Post } from "./post-type";

export type Profile = {
    id: string; // Assuming Int maps to number
    updated_at?: Date; // Assuming DateTime? maps to Date | undefined
    username?: string; // Assuming String? maps to string | undefined
    full_name?: string; // Assuming String? maps to string | undefined
    email: string; // Assuming String maps to string
    post: Post[]; // Assuming post[] maps to an array of Post type
};
