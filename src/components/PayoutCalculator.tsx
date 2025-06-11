'use client';
import { useState } from 'react';
import { getPayoutRate, setPayoutRate } from '@/lib/storage';
import { useAppContext } from '@/store';

interface Article {
  author: string;
}

// Helper function to get unique authors
// Creates an array of all authors without duplicates
// [...] - Spreads the Set back into an array
const getUniqueAuthors = (articles: Article[]): string[] => {
  return [...new Set(articles.map(article => article.author))];
};

// Helper function to count articles by author
const getArticleCount = (articles: Article[], author: string): number => {
  return articles.filter(article => article.author === author).length;
};

// Helper function to calculate payout for an author
const calculateAuthorPayout = (articles: Article[], author: string, rate: number) => {
  const count = getArticleCount(articles, author);
  return {
    author: author || "Unknown",
    count,
    total: count * rate,
  };
};

export default function PayoutCalculator() {
  const { articles } = useAppContext();
  const [rate, setRate] = useState(getPayoutRate());
  const [editing, setEditing] = useState(false);

  const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRate(parseFloat(e.target.value));
  };

  const saveRate = () => {
    setPayoutRate(rate);
    setEditing(false);
  };

  // Calculate payouts for all authors
  const payoutByAuthor = getUniqueAuthors(articles).map(author => 
    calculateAuthorPayout(articles, author, rate)
  );

  return (
    <div className="space-y-4">
      <div className="card p-4 flex items-center gap-4">
        <label className="font-medium">Payout per Article:</label>
        {editing ? (
          <>
            <input
              type="number"
              value={rate}
              onChange={handleRateChange}
              className="p-2 border rounded w-24 dark:bg-gray-800 dark:border-gray-700"
            />
            <button onClick={saveRate} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
              Save
            </button>
          </>
        ) : (
          <>
            <span>${rate}</span>
            <button onClick={() => setEditing(true)} className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 underline">
              Edit
            </button>
          </>
        )}
      </div>

      <div className="card overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="p-2 border dark:border-gray-700">Author</th>
              <th className="p-2 border dark:border-gray-700">Articles</th>
              <th className="p-2 border dark:border-gray-700">Payout</th>
            </tr>
          </thead>
          <tbody>
            {payoutByAuthor.map((entry, index) => (
              <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="p-2 border dark:border-gray-700">{entry.author}</td>
                <td className="p-2 border dark:border-gray-700">{entry.count}</td>
                <td className="p-2 border dark:border-gray-700">${entry.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
