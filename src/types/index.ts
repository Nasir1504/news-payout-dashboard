export interface Article {
  author: string;
  title: string;
  date: string;
  type: string;
  url: string;
}

export interface PayoutEntry {
  author: string;
  count: number;
  total: number;
}

export interface Filters {
  keyword: string;
  author: string;
  type: string;
} 