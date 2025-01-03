"use client"; // usePathname needs it
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./navigation.css";
import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js'

const Navigation = async () => {
    const pathname = usePathname();
    const supabase = createClient();
    const [user, setUser] = useState<User | null>(null); 

    useEffect(() => {
        const fetchUser = async () => {
            const { data: {user}} = await supabase.auth.getUser()
            setUser(user)
    };
    
    fetchUser();
    }, [supabase]) // supabase dependency
    

    return (
        <nav>
            <Link href="/" className = {pathname === "/" ? "linkActive" : "linkInactive"}>
            Home
            </Link>
            <Link href="/tasks/1" className = {pathname === "/tasks/1" ? "linkActive" : "linkInactive"}>
            Task
            </Link>
            <Link href="/login" className = {pathname === "/login" ? "linkActive" : "linkInactive"}>
            Account
            </Link>
        </nav>
    );
}

export default Navigation;