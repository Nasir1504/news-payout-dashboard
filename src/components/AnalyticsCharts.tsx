"use client";
import { useAppContext } from "@/store";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface Article {
  author: string;
  type: string;
}

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#00c49f"];

// Helper function to get unique authors
const getUniqueAuthors = (articles: Article[]): string[] => {
  return [...new Set(articles.map(article => article.author))];
};

// Helper function to count articles by author
const getArticleCount = (articles: Article[], author: string): number => {
  return articles.filter(article => article.author === author).length;
};

// Helper function to create author data
const createAuthorData = (articles: Article[]) => {
  return getUniqueAuthors(articles).map(author => ({
    name: author || "Unknown",
    count: getArticleCount(articles, author)
  }));
};

export default function AnalyticsCharts() {
  const { articles } = useAppContext();
//   console.log("Context articles:", articles);

  // Articles by author
  const authorData = createAuthorData(articles);

  // Articles by type
  const typeData = ["news", "blog"].map((type) => ({
    name: type,
    value: articles.filter((a) => a.type === type).length,
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Bar Chart: Articles by Author */}
      <div className="card p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Articles by Author</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={authorData}>
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart: Articles by Type */}
      <div className="card p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Articles by Type</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={typeData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={90}
              label
            >
              {typeData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
