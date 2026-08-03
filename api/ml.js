export default async function handler(req, res) {
  // Configura cabeçalhos de CORS para permitir acesso do seu site
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const { seller_id = '179571326' } = req.query;

  try {
    // Requisição com simulação completa de navegador para contornar o firewall do ML
    const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?seller_id=${seller_id}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: `Erro ML: ${response.status}` });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Erro interno na requisição' });
  }
}
