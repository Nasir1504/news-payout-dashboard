'use client';
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { Article, Filters } from '@/types';
import { fetchNewsArticles } from '@/lib/api';

interface AppContextType {
  articles: Article[];
  setArticles: (articles: Article[]) => void;
  filters: Filters;
  setFilters: (filters: Filters) => void;
}

export const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filters, setFilters] = useState<Filters>({
    keyword: '',
    author: '',
    type: '',
  });

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const data = await fetchNewsArticles();
        setArticles(data);
      } catch (err) {
        console.error('Failed to load articles:', err);
      }
    };
  
    loadArticles();
  }, []);
  
  return (
    <AppContext.Provider value={{ articles, setArticles, filters, setFilters }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
