import { Faq } from '@prisma/client';
import { useEffect, useState, useCallback } from 'react';

export const useFaq = () => {
  const [faq, setFaq] = useState<Faq[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFaq = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/faq/fetchQuestions');
      const data = await response.json();
      setFaq(
        data.map((item: { id: number; question: string; answer: string }) => ({
          id: item.id,
          question: item.question,
          answer: item.answer,
        })),
      );
    } catch {
      setError('Failed to fetch FAQ data');
      setFaq([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFaq();
  }, [fetchFaq]);

  return { faq, loading, error, fetchFaq };
};
