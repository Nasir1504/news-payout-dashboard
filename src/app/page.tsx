'use client';
import ArticleList from "@/components/ArticleList";
import Filters from "@/components/Filters";
import { useAppContext } from "@/store";

export default function DashboardPage() {
  const { articles } = useAppContext();
  const authors = [...new Set(articles.map((a) => a.author).filter(Boolean))] as string[];

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">News Dashboard</h1>
      <Filters authors={authors} />
      <ArticleList articles={articles} />
    </main>
  );
}

