import { useCompoundSearch } from "../contexts/CompoundSearchContext";

interface CompoundResultsListProps {
  onSelectCompound?: (name: string) => void;
}

function CompoundResultsList({ onSelectCompound }: CompoundResultsListProps) {
  const { resultados, termo, carregando, erro } = useCompoundSearch();

  if (carregando) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border" role="status" aria-label="Carregando" />
      </div>
    );
  }

  if (erro) {
    return (
      <section className="mb-4">
        <div
          className="alert alert-danger mx-auto"
          style={{ maxWidth: "480px" }}
        >
          {erro}
        </div>
      </section>
    );
  }

  if (!resultados) {
    return null;
  }

  if (resultados.length === 0) {
    return (
      <section className="mb-4">
        <div
          className="alert alert-warning mx-auto"
          style={{ maxWidth: "480px" }}
        >
          Nenhum composto parecido com "{termo}" foi encontrado.
        </div>
      </section>
    );
  }

  return (
    <section className="mb-4">
      <div className="card p-4 mx-auto" style={{ maxWidth: "480px" }}>
        <h2 className="h5 mb-3">Resultados para "{termo}"</h2>

        <ul className="list-group">
          {resultados.map((item) => (
            <li
              key={item.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <button
                type="button"
                className="btn btn-link p-0 text-start"
                onClick={() => onSelectCompound?.(item.name)}
              >
                {item.name}
              </button>

              <span className="text-muted">{item.score.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default CompoundResultsList;
