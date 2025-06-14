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

export const fetchNewsArticles = async (): Promise<Article[]> => {
  try {
    const response = await fetch('/api/news');

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
