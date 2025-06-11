"use client";
import { useAppContext } from "@/store";

export default function Filters({ authors }: { authors: string[] }) {
  const { filters, setFilters } = useAppContext();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <input
        type="text"
        name="keyword"
        placeholder="Search by keyword"
        value={filters.keyword}
        onChange={handleChange}
        className="p-2 border rounded w-full md:w-1/3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
      />
      <select
        name="author"
        value={filters.author}
        onChange={handleChange}
        className="p-2 border rounded w-full md:w-1/4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
      >
        <option value="">All Authors</option>
        {authors.map((a, idx) => (
          <option key={idx} value={a}>
            {a}
          </option>
        ))}
      </select>
      <select
        name="type"
        value={filters.type}
        onChange={handleChange}
        className="p-2 border rounded w-full md:w-1/4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
      >
        <option value="">All Types</option>
        <option value="news">News</option>
        <option value="blog">Blog</option>
      </select>
    </div>
  );
}
