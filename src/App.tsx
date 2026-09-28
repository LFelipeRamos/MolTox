import SmilesForm from './components/SmilesForm';
import ToxicityCard from './components/ToxicityCard';

function App() {
  return (
    <div className="App">
      <header className="bg-dark text-white text-center py-4">
        <h1 className="mb-1">MolTox</h1>
        <p className="mb-0">
          Predição de toxicidade clínica a partir da estrutura molecular
        </p>
      </header>

      <main>
        <SmilesForm />
        <ToxicityCard pred={0} score={0} />
      </main>
    </div>
  );
}

export default App;