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

A API pode retornar conteúdos de diferentes categorias, incluindo Research, News, Blog, FDA Approvals e Clinical Trials.

Na implementação atual do MolTox, os resultados exibidos na interface são das categorias Research, News e Blog.

Caso o composto selecionado não possua conteúdos relacionados, a aplicação tenta realizar uma nova busca utilizando o termo original informado pelo usuário.

Exemplo:

```text
aspirin
   ↓
ACETYL SALICYLATE
   ↓
Nenhum conteúdo encontrado
   ↓
Fallback para "aspirin"
   ↓
Resultados relacionados
```

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

### Busca de compostos semelhantes

```text
POST /api/v1/pharma/search
```

A aplicação envia o nome de um composto e recebe uma lista de recomendações de compostos semelhantes.

Exemplo de fluxo:

```text
aspirin
   ↓
ACETYL SALICYLATE
SALICYLIC ACID
BUFFERIN
ASPIRIN, CAFFEINE
DURLAZA
```

### Busca de conteúdos relacionados

```text
GET /api/v1/search?q=<termo>
```

Esse endpoint realiza uma busca agregada por conteúdos relacionados ao termo selecionado.

A resposta da API pode conter categorias como:

```text
research
news
blog
fdaApprovals
clinicalTrials
```

Atualmente, o MolTox normaliza e exibe na interface os resultados de:

```text
research
news
blog
```

## Integração entre as buscas

A aplicação utiliza dois fluxos de busca integrados.

Primeiro, o usuário pesquisa por um composto:

```text
Usuário
   ↓
CompoundSearchForm
   ↓
CompoundSearchContext
   ↓
/api/pharma-search
   ↓
Cure Cancer With AI
```

Depois, ao selecionar um dos compostos recomendados:

```text
CompoundResultsList
   ↓
App
   ↓
searchService
   ↓
/api/search
   ↓
Cure Cancer With AI
   ↓
SearchResults
   ↓
CompoundCard
```

Dessa forma, as duas funcionalidades fazem parte de um único fluxo da aplicação.

## Fallback de busca

Os endpoints de busca farmacêutica e busca de conteúdos utilizam bases e mecanismos diferentes.

Por isso, um composto encontrado pelo endpoint de recomendações pode não possuir conteúdos relacionados no endpoint de busca.

Para lidar com esse caso, foi implementado um fallback.

O fluxo funciona da seguinte maneira:

```text
Composto selecionado
   ↓
Busca de conteúdos
   ↓
Encontrou resultados?
   ↓
Sim → exibe normalmente

Não
   ↓
Busca novamente usando o termo original informado pelo usuário
   ↓
Exibe os resultados encontrados
```

Quando o fallback é utilizado, a aplicação informa ao usuário que os resultados exibidos correspondem à busca original.

## Segurança da API Key

A chave da API não é exposta diretamente no frontend.

A aplicação utiliza funções serverless da Vercel como proxy entre o frontend e a API externa:

```text
Frontend
   ↓
/api/pharma-search
/api/search
   ↓
Vercel Serverless Functions
   ↓
Cure Cancer With AI API
```

A chave da API é armazenada na variável de ambiente:

```text
CCWAI_API_KEY
```

e acessada apenas no ambiente do servidor.

Dessa forma, a chave não fica disponível no código enviado ao navegador.

Os arquivos de variáveis de ambiente também são ignorados pelo Git através do `.gitignore`.

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

## Principais componentes

### CompoundSearchForm

Responsável pelo formulário inicial de busca de compostos.

Utiliza:

```text
React Hook Form
```

para validação e gerenciamento do formulário.

### CompoundNameInput

Componente reutilizável responsável pelo campo de entrada do nome do composto.

Utiliza:

```text
forwardRef
```

para permitir que a referência do input seja encaminhada pelo React Hook Form.

### CompoundSearchContext

Responsável pelo gerenciamento do estado da busca de compostos.

Utiliza:

```text
Context API
useReducer
useMemo
useCallback
```

para organizar o estado e as chamadas da aplicação.

### CompoundResultsList

Exibe os compostos semelhantes retornados pela API.

Cada composto pode ser selecionado para iniciar a segunda etapa da busca.

### searchService

Responsável por realizar a busca de conteúdos relacionados através de:

```text
/api/search
```

e transformar os diferentes formatos retornados pela API em uma estrutura única utilizada pela aplicação.

### SearchResults

Responsável por organizar os resultados em uma grade responsiva.

### CompoundCard

Responsável por exibir cada conteúdo encontrado.

Os cards apresentam:

- título;
- categoria;
- descrição;
- link para o conteúdo, quando disponível.

Descrições muito longas são limitadas para melhorar a visualização da página.

## Execução local

Clone o repositório:

```bash
git clone git@github.com:LFelipeRamos/MolTox.git
```

Entre na pasta:

```bash
cd MolTox
```

Instale as dependências:

```bash
npm install
```

Para executar o projeto utilizando também as funções serverless da Vercel:

```bash
npx vercel dev
```

A aplicação ficará disponível normalmente em:

```text
http://localhost:3000
```

Para que os endpoints funcionem corretamente, é necessário configurar a variável:

```text
CCWAI_API_KEY
```

## Build

Para gerar o build de produção:

```bash
npm run build
```

O comando executa:

```text
TypeScript
   ↓
Vite Build
```

## Deploy

O projeto utiliza a Vercel para hospedagem da aplicação e das funções serverless.

Aplicação:

```text
https://mol-tox.vercel.app
```

## Responsabilidades

### Iandê de Freitas Richalski

Responsável principalmente pelo fluxo inicial de busca de compostos farmacêuticos, incluindo:

- formulário de busca;
- validação com React Hook Form;
- componente de input utilizando `forwardRef`;
- gerenciamento de estado com Context API e `useReducer`;
- integração com o endpoint de busca de compostos semelhantes;
- função serverless `/api/pharma-search`;
- tratamento dos estados de carregamento, erro e resultados da busca de compostos.

### Luiz Felipe Fernandes Ramos

Responsável principalmente pela busca e exibição de conteúdos relacionados aos compostos, incluindo:

- função serverless `/api/search`;
- serviço de busca e normalização dos resultados;
- componentes de cards e listagem dos conteúdos;
- integração entre a busca de compostos e a busca de conteúdos relacionados;
- tratamento de carregamento e erros da segunda busca;
- implementação de fallback quando um composto selecionado não possui resultados;
- limitação das descrições exibidas nos cards;
- integração final dos dois fluxos;
- documentação do projeto.

## Uso de ferramentas de Inteligência Artificial

Durante o desenvolvimento do projeto, ferramentas de Inteligência Artificial foram utilizadas como apoio ao processo de programação.

O ChatGPT foi utilizado principalmente para:

- esclarecer conceitos de React, TypeScript e Git;
- auxiliar na compreensão e integração dos endpoints da API;
- revisar trechos de código;
- auxiliar na identificação e correção de erros;
- sugerir melhorias na organização e no fluxo da aplicação;
- auxiliar na configuração das funções serverless;
- auxiliar no processo de integração das branches;
- auxiliar na documentação do projeto.

As sugestões fornecidas pela ferramenta foram analisadas, adaptadas, testadas e validadas durante o desenvolvimento.

A Inteligência Artificial foi utilizada como ferramenta de apoio, enquanto as decisões sobre a estrutura do projeto, integração dos componentes, testes e funcionamento final da aplicação foram realizadas e verificadas pela equipe.

## Integrantes

- Iandê de Freitas Richalski
- Luiz Felipe Fernandes Ramos
