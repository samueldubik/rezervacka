import { Faq } from '@prisma/client';
import { useEffect, useState } from 'react';

export const useFaq = () => {
  const [faq, setFaq] = useState<Faq[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/faq/fetchQuestions')
      .then((response) => response.json())
      .then((data) => {
        setFaq(
          data.map((item: { id: number; question: string; answer: string }) => {
            return {
              id: item.id,
              question: item.question,
              answer: item.answer,
            };
          }),
        );
      })
      .catch(() => {
        console.log('data not received');
        setError('Failed to fetch FAQ data');
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { faq, loading, error };
};
