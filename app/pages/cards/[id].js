import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function CardDetails() {
  const [card, setCard] = useState(null);
  const [amountUnderstood, setAmountUnderstood] = useState(0);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetch(`/api/cards/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setCard(data);
          setAmountUnderstood(data.amountUnderstood);
        });
    }
  }, [id]);

  const handleUpdate = async (difficulty) => {
    const newAmountUnderstood = difficulty === 'easy' ? 100 : difficulty === 'medium' ? 50 : 0;
    const nextScheduledAt = new Date();

    if (difficulty === 'easy') {
      nextScheduledAt.setDate(nextScheduledAt.getDate() + 3); 
    } else if (difficulty === 'medium') {
      nextScheduledAt.setDate(nextScheduledAt.getDate() + 1); 
    } else {
      nextScheduledAt.setDate(nextScheduledAt.getDate() + 0.5); 
    }

    const res = await fetch(`/api/cards/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amountUnderstood: newAmountUnderstood, nextScheduledAt }),
    });

    if (res.ok) {
      const updatedCard = await res.json();
      setCard(updatedCard);
      setAmountUnderstood(newAmountUnderstood);
    } else {
      alert('Failed to update card.');
    }
  };

  if (!card) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold">Flashcard Details</h1>
      <div className="mt-4">
        <p><strong>Prompt:</strong> {card.prompt}</p>
        <p><strong>Answer:</strong> {card.answer}</p>
        <p><strong>Amount Understood:</strong> {amountUnderstood}%</p>
        <p><strong>Next Scheduled Review:</strong> {new Date(card.nextScheduledAt).toLocaleString()}</p>
        
        <div className="mt-4">
          <button onClick={() => handleUpdate('easy')} className="bg-green-500 text-white py-2 px-4 rounded mr-2">
            Easy
          </button>
          <button onClick={() => handleUpdate('medium')} className="bg-yellow-500 text-white py-2 px-4 rounded mr-2">
            Medium
          </button>
          <button onClick={() => handleUpdate('hard')} className="bg-red-500 text-white py-2 px-4 rounded">
            Hard
          </button>
        </div>
      </div>
    </div>
  );
}