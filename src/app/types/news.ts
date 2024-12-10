export interface NewsItem {
  id: string;
  content: string;
  date: string;
  title: string;
}

export interface NewsData {
  items: NewsItem[];
}

