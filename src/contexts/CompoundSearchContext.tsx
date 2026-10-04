import { createContext, useCallback, useContext, useMemo, useReducer } from 'react';

const API_URL = '/api';

async function requisicao(caminho: string, opcoes: RequestInit = {}) {
  let resposta: Response;
  try {
    resposta = await fetch(`${API_URL}${caminho}`, {
      ...opcoes,
      headers: opcoes.body ? { 'Content-Type': 'application/json' } : undefined,
    });
  } catch {
    throw new Error('Não foi possível conectar à API. Verifique sua conexão.');
  }

  const dados = await resposta.json().catch(() => null);

  if (!resposta.ok) {
    throw new Error(dados?.error ?? `A API respondeu com erro ${resposta.status}.`);
  }
  return dados;
}

interface Recomendacao {
  id: string;
  name: string;
  score: number;
}

interface SearchState {
  termo: string | null;
  resultados: Recomendacao[] | null;
  carregando: boolean;
  erro: string | null;
}

const estadoInicial: SearchState = {
  termo: null,
  resultados: null,
  carregando: false,
  erro: null,
};

type SearchAction =
  | { type: 'BUSCA_INICIOU' }
  | { type: 'BUSCA_SUCESSO'; termo: string; resultados: Recomendacao[] }
  | { type: 'BUSCA_ERRO'; erro: string };

function searchReducer(estado: SearchState, acao: SearchAction): SearchState {
  switch (acao.type) {
    case 'BUSCA_INICIOU':
      return { ...estado, carregando: true, erro: null };
    case 'BUSCA_SUCESSO':
      return {
        ...estado,
        carregando: false,
        termo: acao.termo,
        resultados: acao.resultados,
      };
    case 'BUSCA_ERRO':
      return { ...estado, carregando: false, erro: acao.erro, resultados: null };
    default:
      throw new Error('Ação desconhecida');
  }
}

interface SearchContextValue extends SearchState {
  buscarCompostos: (nome: string) => Promise<void>;
}

const SearchContext = createContext<SearchContextValue | null>(null);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [estado, dispatch] = useReducer(searchReducer, estadoInicial);

  const buscarCompostos = useCallback(async (nome: string) => {
    dispatch({ type: 'BUSCA_INICIOU' });
    try {
      const dados = await requisicao('/pharma-search', {
        method: 'POST',
        body: JSON.stringify({ examples: [nome], limit: 5 }),
      });
      dispatch({ type: 'BUSCA_SUCESSO', termo: nome, resultados: dados.data.recommendations });
    } catch (erro) {
      dispatch({ type: 'BUSCA_ERRO', erro: (erro as Error).message });
    }
  }, []);

  const valor = useMemo(
    () => ({ ...estado, buscarCompostos }),
    [estado, buscarCompostos],
  );

  return <SearchContext.Provider value={valor}>{children}</SearchContext.Provider>;
}

export function useCompoundSearch() {
  const contexto = useContext(SearchContext);
  if (!contexto) {
    throw new Error('useCompoundSearch deve ser usado dentro de <SearchProvider>.');
  }
  return contexto;
}