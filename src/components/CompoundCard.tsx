import type { SearchResult } from "../types/SearchResult";

interface CompoundCardProps {
    result: SearchResult
}

function CompoundCard(props:CompoundCardProps) {

    const result = props.result
    
    return (
  <div className="card h-100">
    <div className="card-body">
      <h3 className="card-title">{result.title}</h3>

      <span className="badge text-bg-secondary">
        {result.category}
      </span>

      <p className="card-text mt-2">
        {result.description}
      </p>

      {result.url && (
        <a
          href={result.url}
          className="btn btn-outline-primary"
          target="_blank"
          rel="noreferrer"
        >
          Ver conteúdo
        </a>
      )}
    </div>
  </div>
);
}

export default CompoundCard;