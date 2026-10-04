import Header from './components/Header';
import CompoundSearchForm from './components/CompoundSearchForm';
import CompoundResultsList from './components/CompoundResultsList';

function App() {
  return (
    <>
      <Header />
      <main className="container my-4">
        <CompoundSearchForm />
        <CompoundResultsList />
      </main>
    </>
  );
}

export default App;