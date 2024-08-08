import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Admin = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      console.log('status:', status, 'isAdmin:', session);
      router.push('/login');
    }
  }, [status, session, router]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (!session || !session.user?.isAdmin) {
    return null;
  }

  return (
    <div>
      <h1>Admin Page</h1>
      <p>Welcome, {session.user.name}</p>
      <button onClick={() => signOut()}>Logout</button>
    </div>
  );
};

export default Admin;
