type FaqItemProps = {
  index: number;
  question: string;
  answer: string;
  isAdmin?: boolean;
};

export const FaqItem = ({ question, answer }: { question: string; answer: string }) => {
  return (
    <div className="mb-4">
      <h3 className="font-quicksand text-lg font-bold">{question}</h3>
      <p className="mt-2 font-quicksand text-gray-700">{answer}</p>
    </div>
  );
};
