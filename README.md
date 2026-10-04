# MolTox

Projeto desenvolvido para a disciplina de **Programação Web Full Stack**.

O MolTox é uma aplicação em React + TypeScript que permite pesquisar compostos farmacêuticos semelhantes e, a partir de um composto selecionado, buscar conteúdos relacionados como pesquisas científicas, notícias e artigos.

## Como funciona

O fluxo principal da aplicação é:

1. O usuário informa o nome de um composto.
2. A aplicação consulta a API de busca farmacêutica.
3. São exibidos compostos semelhantes com seus respectivos scores.
4. O usuário seleciona um dos compostos encontrados.
5. A aplicação realiza uma nova busca por conteúdos relacionados.
6. Os resultados são exibidos em cards.

Entre os conteúdos retornados pela API estão:

- Research
- News
- Blog
- FDA Approvals
- Clinical Trials

## Tecnologias

- React
- TypeScript
- Vite
- Bootstrap
- React Hook Form
- Vercel Serverless Functions

Também foram utilizados recursos do React como:

- `useReducer`
- `useMemo`
- `useCallback`
- `forwardRef`
- Context API

## API

A aplicação utiliza a API pública do:

[Cure Cancer With AI](https://www.curecancerwithai.com/)

Endpoints utilizados:

### Busca de compostos semelhantes

```text
POST /api/v1/pharma/search
```

A aplicação envia o nome de um composto e recebe uma lista de recomendações semelhantes.

### Busca de conteúdos relacionados

```text
GET /api/v1/search?q=<termo>
```

Esse endpoint realiza uma busca agregada por conteúdos relacionados ao termo selecionado.

## Segurança da API Key

A chave da API não é exposta diretamente no frontend.

A aplicação utiliza funções serverless da Vercel como proxy:

```text
Frontend
   ↓
/api/pharma-search
/api/search
   ↓
Cure Cancer With AI API
```

A chave é armazenada na variável de ambiente:

```text
CCWAI_API_KEY
```

e acessada apenas no ambiente do servidor.

## Estrutura principal

```text
api/
├── pharma-search.ts
└── search.ts

src/
├── components/
│   ├── CompoundCard.tsx
│   ├── CompoundNameInput.tsx
│   ├── CompoundResultsList.tsx
│   ├── CompoundSearchForm.tsx
│   ├── Header.tsx
│   └── SearchResults.tsx
│
├── contexts/
│   └── CompoundSearchContext.tsx
│
├── services/
│   └── searchService.ts
│
├── types/
│   └── SearchResult.ts
│
├── App.tsx
└── main.tsx
```

## Execução local

Instale as dependências:

```bash
npm install
```

Para executar com as funções serverless da Vercel:

```bash
npx vercel dev
```

A aplicação ficará disponível normalmente em:

```text
http://localhost:3000
```

## Build

Para gerar o build de produção:

```bash
npm run build
```

## Integrantes

- Iandê de Freitas Richalski
- Luiz Felipe Fernandes Ramos