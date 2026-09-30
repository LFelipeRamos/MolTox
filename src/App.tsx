import SmilesForm from './components/SmilesForm';
import ToxicityCard from './components/ToxicityCard';
import SearchResults from './components/SearchResults';
import { mockSearchResults } from './data/mockSearchResults';

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

        <SearchResults results={mockSearchResults} />
      </main>
    </div>
  );
}

export default App;