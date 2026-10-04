import type { SearchResult } from "../types/SearchResult";

interface CompoundCardProps {
  result: SearchResult;
}

function CompoundCard(props: CompoundCardProps) {
  const result = props.result;

  const description =
    result.description.length > 400
      ? `${result.description.slice(0, 400)}...`
      : result.description;

  return (
    <div className="card h-100">
      <div className="card-body">
        <h3 className="card-title">{result.title}</h3>

        <span className="badge text-bg-secondary">{result.category}</span>

        <p className="card-text mt-2">{description}</p>

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
