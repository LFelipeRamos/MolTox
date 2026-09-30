import type { SearchResult } from "../types/SearchResult";
import CompoundCard from "./CompoundCard";

interface SearchResultsProps {
  results: SearchResult[];
}

function SearchResults(props: SearchResultsProps) {
  const results = props.results;

  if (results.length === 0) {
    return <p>Nenhum resultado encontrado</p>;
  }

  return results.map((result) => (
    <CompoundCard
      key={result.id}
      result={result}
    />
  ));
}

export default SearchResults;