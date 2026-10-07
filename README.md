# MolTox

Projeto 1 - Programação Web Full Stack

SPA em React que busca compostos farmacêuticos similares a partir do nome informado e, ao selecionar um composto, mostra pesquisas, notícias e artigos relacionados.

**Aplicação publicada:** https://mol-tox.vercel.app

## API

[Cure Cancer With AI](https://www.curecancerwithai.com)

- `POST /api/v1/pharma/search` - compostos similares
- `GET /api/v1/search?q=...` - pesquisas, notícias e artigos

Como a API não libera CORS e exige chave, as chamadas passam por funções serverless da Vercel (pasta `api/`), e a chave fica só no servidor.

## Hook / Funcionalidade React

`forwardRef` - usado no `CompoundNameInput` para repassar a `ref` do input ao react-hook-form.

## Biblioteca externa

`react-hook-form` — validação do formulário de busca.

## Comunicação entre componentes

Context API com `useReducer` (`CompoundSearchContext`).

## Ferramentas utilizadas

Vite, React, TypeScript, Bootstrap, react-hook-form, Vercel (IAG foi usada como apoio para tirar dúvidas, revisar o código e documentação).

## Membros

- Iandê de Freitas Richalski
- Luiz Felipe Fernandes Ramos
