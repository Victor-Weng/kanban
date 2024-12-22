"use client"
import { useRouter } from "next/navigation";

export default function Kanban(){
    const router = useRouter();
    return(
        <div>
            <p>Hi I am Kanban Board</p>
            <button 
                onClick={() => router.push("/tasks/1")}
                >
                Task
            </button>
        </div>
    )
}