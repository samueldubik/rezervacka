import { signIn } from 'next-auth/react';

const Login = () => {
  return (
    <div>
      <h1>Login</h1>
      <button onClick={() => signIn('google')}>Sign in with Google</button>
    </div>
  );
};

export default Login;
