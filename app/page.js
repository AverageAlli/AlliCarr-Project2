"use client";

import { useEffect, useState } from 'react';

export default function Home() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/cards')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch cards');
        }
        return response.json();
      })
      .then((data) => {
        setCards(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Flashcards</h1>
      <ul>
        {cards.map((card) => (
          <li key={card.id} className="mb-2">
            <span className="font-semibold">{card.prompt}</span> - {card.amountUnderstood}% understood
          </li>
        ))}
      </ul>
    </div>
  );
}