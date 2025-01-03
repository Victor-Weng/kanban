"use client"
import { useRouter } from "next/navigation";
import AuthContext from '../AuthContext'
import { useContext } from 'react'

export default function Kanban(){
    const val = useContext(AuthContext); // authentication context (holds the value provided to the context provider)
    //console.log(val)

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