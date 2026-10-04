export type SearchResultType =
  | 'research'
  | 'news'
  | 'blog'
  | 'fdaApprovals'
  | 'clinicalTrials'

export interface SearchResult {

    id: string
    title:string
    description: string
    category: SearchResultType
    url?: string
}