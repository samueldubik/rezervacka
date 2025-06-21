import { useEffect, useState } from 'react';

export const useWhitelist = () => {
  const [whitelist, setWhitelist] = useState<string[]>([]);

  useEffect(() => {
    const fetchWhitelist = async () => {
      try {
        const response = await fetch('/api/fetchWhitelist');
        if (response.ok) {
          const data = await response.json();
          setWhitelist(data.map((item: { email: string }) => item.email));
        } else {
          console.error('Failed to fetch whitelist');
        }
      } catch (error) {
        console.error('Error fetching whitelist:', error);
      }
    };

    fetchWhitelist();
  }, []);

  return { whitelist };
};
