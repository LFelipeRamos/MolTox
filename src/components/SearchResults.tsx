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

return (
  <section className="container my-4">
    <div className="row g-3">
      {results.map((result) => (
        <div className="col-12 col-md-6 col-lg-4" key={result.id}>
          <CompoundCard result={result} />
        </div>
      ))}
    </div>
  </section>
  );
}

export default SearchResults;