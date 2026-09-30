function ToxicityCard({ pred, score }: { pred: number; score: number }) {
  const isToxic = pred === 1;
  const percentual = score * 100;

  let corBadge;
  let texto;

  if (isToxic) {
    corBadge = 'bg-danger';
    texto = 'Toxic';
  } else {
    corBadge = 'bg-success';
    texto = 'Safe';
  }

  return (
    <section className="container mb-4">
      <div className="card p-4 mx-auto text-center" style={{ maxWidth: '480px' }}>
        <h2 className="h5 mb-3">Resultado</h2>

        <span className={`badge rounded-pill mb-3 ${corBadge}`}>{texto}</span>

        <div className="progress mb-2">
          <div className={`progress-bar ${corBadge}`} style={{ width: `${percentual}%` }} />
        </div>

        <p className="text-muted small mb-0">
          {percentual}% de probabilidade de toxicidade
        </p>
      </div>
    </section>
  );
}

export default ToxicityCard;