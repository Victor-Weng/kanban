import { login, signup } from './actions'

export default function LoginPage() {
  return (
    <form>
      <p> Sign up and check email for confirmation link if this is the first time</p>
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />
      <button formAction={login}>Log in</button>
      <button formAction={signup}>Sign up</button>
    </form>
  )
}