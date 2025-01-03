"use client"; // usePathname needs it
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./navigation.css";
import { createClient } from '@/utils/supabase/client'
import { useEffect, useState, useContext } from 'react';
import { User } from '@supabase/supabase-js'
import AuthContext from '../AuthContext'

const Navigation = async () => {
    const pathname = usePathname();
    const supabase = createClient();
    const val = useContext(AuthContext); // authentication context (holds the value provided to the context provider)

    console.log(val)
    
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