import { Article } from "@/types";

interface RawArticle {
  title: string;
  author: string | null;
  publishedAt: string;
  source: {
    name: string;
  };
  url: string;
}

interface NewsApiResponse {
  articles: RawArticle[];
}

const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;
const url = process.env.NEXT_PUBLIC_NEWS_API_URL;

// Debug environment variables
console.log('API Configuration:');
console.log('API URL:', url);
console.log('API Key exists:', !!apiKey);
console.log('API Key length:', apiKey?.length || 0);

export const fetchNewsArticles = async (): Promise<Article[]> => {
  try {
    // Debug the full API URL (without exposing the key)
    const apiUrl = `${url}/everything?q=technology&language=en&sortBy=publishedAt&pageSize=20&apiKey=${apiKey}`;
    console.log('Attempting to fetch from:', apiUrl.replace(apiKey || '', '[API_KEY]'));

    const response = await fetch(apiUrl);

    if (!response.ok) {
      console.error('API Error Response:', {
        status: response.status,
        statusText: response.statusText
      });
      throw new Error(`API responded with status ${response.status}`);
    }

    const data = await response.json() as NewsApiResponse;
    console.log('Successfully fetched articles:', data.articles.length);

    const articles: Article[] = data.articles.map((article: RawArticle) => ({
      title: article.title,
      author: article.author || "Unknown",
      date: article.publishedAt,
      type: article.source?.name?.toLowerCase().includes("blog")
        ? "blog"
        : "news",
      url: article.url,
    }));

    return articles;
  } catch (error) {
    console.error("Error while fetching data from API:", error);
    return [];
  }
};
