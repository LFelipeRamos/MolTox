import type { SearchResult } from '../types/SearchResult';

interface ResearchItem {
  id: string;
  title: string;
  abstract: string;
  fullTextUrl?: string;
}

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  url?: string;
}

interface BlogItem {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
}

interface SearchSection<T> {
  total: number;
  items: T[];
}

interface SearchApiResponse {
  query: string;

  results: {
    research: SearchSection<ResearchItem>;
    news: SearchSection<NewsItem>;
    blog: SearchSection<BlogItem>;
    fdaApprovals: SearchSection<unknown>;
    clinicalTrials: SearchSection<unknown>;
  };
}

export async function buscarResultados(
  termo: string,
): Promise<SearchResult[]> {
  const resposta = await fetch(
    `/api/search?q=${encodeURIComponent(termo.trim())}`,
  );

  const dados: SearchApiResponse = await resposta.json();

  if (!resposta.ok) {
    throw new Error('Não foi possível realizar a busca.');
  }

  const research: SearchResult[] = dados.results.research.items.map(
    (item) => ({
      id: item.id,
      title: item.title,
      description: item.abstract,
      category: 'research',
      url: item.fullTextUrl,
    }),
  );

  const news: SearchResult[] = dados.results.news.items.map(
    (item) => ({
      id: item.id,
      title: item.title,
      description: item.summary,
      category: 'news',
      url: item.url,
    }),
  );

  const blog: SearchResult[] = dados.results.blog.items.map(
    (item) => ({
      id: item.id,
      title: item.title,
      description: item.excerpt,
      category: 'blog',
    }),
  );

  return [...research, ...news, ...blog];
}