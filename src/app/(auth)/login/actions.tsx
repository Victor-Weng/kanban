'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { AuthContextProvider  } from '@/AuthContext'

export async function login(formData: FormData) {
  const supabase = await createClient()

  console.log(formData)
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }
  

  const { error } = await supabase.auth.signInWithPassword(data)
  /* const { login } = useContext(AuthContext);
  try {
        await login(data);
    } catch (error) {
        return new Response(
            JSON.stringify({ error: 'Failed to log in' }),
            {
                headers: { 'Content-Type': 'application/json' },
                status: 500,
            }
        );
    }
  */

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/account')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }
  console.log(data);
  const { error } = await supabase.auth.signUp(data)

  if (error) {
    console.log(error)
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  revalidatePath('/', 'page')
  redirect('/account')
}