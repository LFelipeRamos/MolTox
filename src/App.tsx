import { useState } from "react";

import Header from "./components/Header";
import CompoundSearchForm from "./components/CompoundSearchForm";
import CompoundResultsList from "./components/CompoundResultsList";
import SearchResults from "./components/SearchResults";
import { useCompoundSearch } from "./contexts/CompoundSearchContext";

import { buscarResultados } from "./services/searchService";
import type { SearchResult } from "./types/SearchResult";

function App() {
  const { termo: originalTerm } = useCompoundSearch();

  const [fallbackTerm, setFallbackTerm] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  async function handleSelectCompound(name: string) {
    setSearchTerm(name);
    setSearchLoading(true);
    setSearchError(null);
    setSearchResults([]);
    setFallbackTerm(null);

    try {
      let results = await buscarResultados(name);

      const podeUsarFallback =
        results.length === 0 &&
        originalTerm &&
        originalTerm.trim().toLowerCase() !== name.trim().toLowerCase();

      if (podeUsarFallback) {
        results = await buscarResultados(originalTerm);

        if (results.length > 0) {
          setFallbackTerm(originalTerm);
        }
      }

      setSearchResults(results);
    } catch (error) {
      setSearchError(
        error instanceof Error
          ? error.message
          : "Não foi possível realizar a busca.",
      );
    } finally {
      setSearchLoading(false);
    }
  }

  return (
    <>
      <Header />

      <main className="container my-4">
        <CompoundSearchForm />

        <CompoundResultsList onSelectCompound={handleSelectCompound} />

        {searchTerm && (
          <section className="mt-5">
            <h2 className="h4 mb-3">Conteúdos relacionados a "{searchTerm}"</h2>
            {fallbackTerm && (
              <div className="alert alert-info">
                Nenhum conteúdo encontrado para "{searchTerm}". Exibindo
                resultados relacionados à busca original "{fallbackTerm}".
              </div>
            )}

            {searchLoading && (
              <div className="text-center my-4">
                <div
                  className="spinner-border"
                  role="status"
                  aria-label="Carregando"
                />
              </div>
            )}

            {searchError && (
              <div className="alert alert-danger">{searchError}</div>
            )}

            {!searchLoading && !searchError && (
              <SearchResults results={searchResults} />
            )}
          </section>
        )}
      </main>
    </>
  );
}

export default App;
