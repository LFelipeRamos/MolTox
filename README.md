# MolTox — busca de compostos e conteúdos relacionados

Aplicação web desenvolvida em dupla para a disciplina de **Programação Web Full Stack**. O MolTox permite pesquisar compostos farmacêuticos semelhantes a um termo informado e consultar pesquisas, notícias e artigos relacionados.

> **Projeto acadêmico.** Os resultados vêm de uma API externa e não constituem recomendação médica, diagnóstico ou validação científica dos compostos.

## Demonstração

- **Aplicação:** https://mol-tox.vercel.app/
- **Código-fonte:** https://github.com/LFelipeRamos/MolTox

A disponibilidade das buscas depende da API externa, de suas credenciais e de seus limites de uso.

## Como funciona

1. O usuário informa o nome de um composto.
2. A aplicação consulta a API e apresenta compostos semelhantes.
3. Ao selecionar um composto, busca conteúdos relacionados, como estudos, notícias e artigos.
4. Se a pesquisa pelo composto selecionado não retornar conteúdos, a aplicação pode tentar novamente usando o termo original da busca.
5. A interface apresenta estados de carregamento, erro e ausência de resultados.

## Decisões técnicas

- **React + TypeScript + Vite:** interface de página única (SPA).
- **Context API + `useReducer`:** compartilhamento do estado de busca de compostos.
- **`react-hook-form`:** gerenciamento e validação do formulário.
- **Funções serverless na Vercel (`api/`):** comunicação com a API externa sem expor a chave de acesso no frontend.
- **Tratamento de estados assíncronos:** feedback visual durante as buscas e fallback de consulta quando aplicável.

### Fluxo simplificado

```text
Formulário React
    |
    v
Contexto de busca de compostos
    |
    v
/api/pharma-search (Vercel) --> API Cure Cancer With AI
    |
    v
Lista de compostos
    |
    v
Seleção do composto
    |
    v
/api/search (Vercel) ------> API Cure Cancer With AI
    |
    v
Pesquisas, notícias e artigos relacionados
```

## Tecnologias

React, TypeScript, Vite, Bootstrap, react-hook-form e funções serverless da Vercel.

**API utilizada:** [Cure Cancer With AI](https://www.curecancerwithai.com).

## Executar localmente

Requisitos: Node.js e npm compatíveis com as dependências do projeto.

```bash
git clone https://github.com/LFelipeRamos/MolTox.git
cd MolTox
npm ci
npm run dev
```

O comando `npm run dev` inicia o **frontend Vite**. As rotas `/api/` são funções serverless da Vercel; portanto, as buscas completas não funcionam apenas com o servidor Vite.

Para executar também as funções localmente, configure o projeto e suas variáveis de ambiente na Vercel e use o ambiente local da plataforma, por exemplo com `vercel dev`. A chave da API deve ser fornecida **somente no ambiente do servidor** por meio da variável `CCWAI_API_KEY`.

**Nunca publique a chave no repositório ou em variáveis expostas ao frontend.**

### Scripts disponíveis

```bash
npm run dev      # desenvolvimento do frontend
npm run build    # checagem TypeScript e build
npm run lint     # análise estática
npm run preview  # prévia do build
```

## Organização do projeto

```text
api/           # funções serverless que consultam a API externa
src/
  components/  # formulário e apresentação dos resultados
  contexts/    # estado compartilhado da busca
  services/    # integração das consultas
  types/       # contratos TypeScript
```

## Limitações e melhorias futuras

- O serviço depende da disponibilidade e dos limites da API de terceiros.
- É importante validar o comportamento das buscas e links retornados pela API.
- O projeto não declara uma suíte de testes automatizados no momento.

## Autoria

Projeto acadêmico desenvolvido por **Iandê de Freitas Richalski** e **Luiz Felipe Fernandes Ramos**, com uso de IA generativa como apoio para dúvidas, revisão de código e documentação.
