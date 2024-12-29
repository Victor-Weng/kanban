"use client"; // usePathname needs it
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./navigation.css";

const Navigation = () => {
    const pathname = usePathname();

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