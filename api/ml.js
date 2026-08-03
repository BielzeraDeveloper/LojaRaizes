export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const { seller_id = '179571326' } = req.query;

  try {
    const urlML = `https://api.mercadolibre.com/sites/MLB/search?seller_id=${seller_id}`;
    
    // Busca os dados embrulhados em JSON para evitar o bloqueio do Cloudflare
    const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(urlML)}`);

    if (!response.ok) {
      return res.status(response.status).json({ error: `Erro na ponte: ${response.status}` });
    }

    const dataWrapper = await response.json();
    
    // Converte o conteúdo recebido de volta para objeto JSON
    const data = JSON.parse(dataWrapper.contents);

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Erro interno ao processar produtos' });
  }
}
