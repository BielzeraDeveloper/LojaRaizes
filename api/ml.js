export default async function handler(req, res) {
  // Libera o acesso para o seu site
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const { seller_id = '179571326' } = req.query;

  try {
    // Faz a busca enviando o User-Agent que o Mercado Livre exige
    const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?seller_id=${seller_id}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: `Erro ML: ${response.status}` });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Erro interno ao consultar API' });
  }
}

