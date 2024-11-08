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
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl text-gray-500">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">Flashcards</h1>
      <ul className="space-y-4">
        {cards.map((card) => (
          <li key={card.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex justify-between items-center">
              <span className="text-xl font-semibold text-gray-800">{card.prompt}</span>
              <span className="text-sm text-gray-600">{card.amountUnderstood}% understood</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}