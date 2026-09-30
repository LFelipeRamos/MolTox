import exampleCompounds from '../data/exampleCompounds';

function SmilesForm() {
  return (
    <section className="container my-4">
      <div className="card p-4 mx-auto" style={{ maxWidth: '480px' }}>
        <h2 className="h5 mb-3">Insira a estrutura molecular (SMILES)</h2>

        <form>
          <div className="mb-3">
            <input
              id="smiles-input"
              type="text"
              className="form-control"
            />
          </div>

          <div className="d-flex flex-wrap gap-2 mb-3">
            {exampleCompounds.map((compound) => (
              <button
                key={compound.name}
                type="button"
                className="btn btn-outline-secondary btn-sm"
              >
                {compound.name}
              </button>
            ))}
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Verificar toxicidade
          </button>
        </form>
      </div>
    </section>
  );
}

export default SmilesForm;