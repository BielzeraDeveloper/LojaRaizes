export default async function handler(req, res) {
  // Permite que qualquer site (inclusive seu GitHub Pages) acesse essa API sem erro de CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const { seller_id = '179571326' } = req.query;

  try {
    const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?seller_id=${seller_id}`);
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
}

