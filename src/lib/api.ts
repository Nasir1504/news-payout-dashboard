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

export const fetchNewsArticles = async (): Promise<Article[]> => {
  try {
    const response = await fetch(
      `${url}/everything?q=technology&language=en&sortBy=publishedAt&pageSize=20&apiKey=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }

    const data = await response.json() as NewsApiResponse;

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
