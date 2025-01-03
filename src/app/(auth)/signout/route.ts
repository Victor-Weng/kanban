import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const supabase = await createClient();

    // Check if a user's logged in
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (user) {
        await supabase.auth.signOut();
    }

    revalidatePath("/", "layout");
    return NextResponse.redirect(new URL("/login", req.url), {
        status: 302,
    });
}

/*
import { NextResponse } from 'next/server';
import { useContext } from 'react';
import AuthContext from '@/AuthContext';

export async function GET() {
    const { logout } = useContext(AuthContext);

    try {
        await logout();
        return NextResponse.redirect('/login');
    } catch (error) {
        return new Response(
            JSON.stringify({ error: 'Failed to log out' }),
            {
                headers: { 'Content-Type': 'application/json' },
                status: 500,
            }
        );
    }
}
    */
