import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Método não permitido.' });
    return;
  }

  const query = Array.isArray(req.query.q) ? req.query.q[0] : req.query.q;

  if (!query?.trim()) {
    res.status(400).json({ error: 'Informe um termo de busca.' });
    return;
  }

  const apiKey = process.env.CCWAI_API_KEY;

  if (!apiKey) {
    res.status(500).json({ error: 'Chave da API não configurada.' });
    return;
  }

  try {
    const resposta = await fetch(
      `https://www.curecancerwithai.com/api/v1/search?q=${encodeURIComponent(query.trim())}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      },
    );

    const dados = await resposta.json();

    res.status(resposta.status).json(dados);
  } catch {
    res.status(500).json({ error: 'Erro ao conectar com a API externa.' });
  }
}