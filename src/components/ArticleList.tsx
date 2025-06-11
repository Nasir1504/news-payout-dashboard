"use client";

import { useAppContext } from "@/store";
import { Article } from "@/types";

export default function ArticleList({ articles }: { articles: Article[] }) {
  const { filters } = useAppContext();

  const filtered = articles.filter((a) => {
    return (
      (!filters.keyword || a.title.toLowerCase().includes(filters.keyword.toLowerCase())) &&
      (!filters.author || a.author === filters.author) &&
      (!filters.type || a.type === filters.type)
    );
  });

  if (filtered.length === 0) {
    return <p className="text-gray-600 dark:text-gray-400">No articles match your filter.</p>;
  }

  return (
    <div className="space-y-4">
      {filtered.map((article, index) => (
        <div key={index} className="card p-4 rounded shadow hover:bg-opacity-90 transition-colors">
          <h2 className="text-lg font-semibold">
            <a href={article.url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400">
              {article.title}
            </a>
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Author: {article.author} | Date: {new Date(article.date).toLocaleDateString()} | Type: {article.type}
          </p>
        </div>
      ))}
    </div>
  );
}
