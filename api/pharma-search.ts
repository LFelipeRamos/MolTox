import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Método não permitido.' });
    return;
  }

  const apiKey = process.env.CCWAI_API_KEY;

  try {
    const resposta = await fetch('https://www.curecancerwithai.com/api/v1/pharma/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(req.body),
    });

    const dados = await resposta.json();
    res.status(resposta.status).json(dados);
  } catch {
    res.status(500).json({ error: 'Erro ao conectar com a API externa.' });
  }
}