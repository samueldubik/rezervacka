import FloorLayout from '@/components/FloorLayout';
import NavBar from '@/components/NavBar';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Admin = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')


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

  const createTables = async () => {
    setLoading(true)
    setMessage('')
    try {
      const res = await fetch('/api/admin/create-tables', {
        method: 'POST',
      })
      const data = await res.json()
      if (res.ok) {
        setMessage(data.message)
      } else {
        setMessage(data.message || 'Failed to create tables')
      }
    } catch (error) {
      setMessage('Failed to create tables')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className=' select-none bg-stone-200 h-screen w-screen flex flex-col items-center'>
      <NavBar/>
      
      <button 
      className=" button98 mt-10 w-[30vw] h-[10vh] items-center"
      onClick={createTables}
      >
        Vyčistiť databázu
      </button>

      <button onClick={() => signOut()}>Logout</button>
    </main>
  );
};

export default Admin;
