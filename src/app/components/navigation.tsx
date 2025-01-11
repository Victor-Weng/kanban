"use client"; // usePathname needs it

import Link from "next/link";
import { usePathname } from "next/navigation";
import "./navigation.css";
import { useEffect, useState, useContext } from 'react';
import { User } from '@supabase/supabase-js'
import AuthContext from '../AuthContext'


const Navigation = () => {
    const pathname = usePathname();
    const val = useContext(AuthContext); // authentication context (holds the value provided to the context provider)

    console.log(val)
    console.log(val.user)
    
    return (
            <nav className="accent-bg">
                <Link href="/" className = {pathname === "/" ? "linkActive" : "linkInactive"}>
                Home
                </Link>
                <Link href="/profiles-server" className = {pathname === "/profiles-server" ? "linkActive" : "linkInactive"}>Profiles</Link>
                { val.user ? (
                    <Link href="/account" className = {pathname === "/account" ? "linkActive" : "linkInactive"}>
                    Account
                    </Link>
                ):
                (
                    <Link href="/login" className = {pathname === "/login" ? "linkActive" : "linkInactive"}>
                    Login
                    </Link>
                )}
                
            </nav>
        )

    
}

export default Navigation;