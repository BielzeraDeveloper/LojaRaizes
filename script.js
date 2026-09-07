const NUMERO_WHATSAPP = "5542999839784"; 
let marcaAtiva = 'TODAS';

function alternarTema() {
  const html = document.documentElement;
  const icone = document.getElementById('icone-tema');
  
  if (html.getAttribute('data-theme') === 'dark') {
    html.setAttribute('data-theme', 'light');
    icone.textContent = '🌙';
  } else {
    html.setAttribute('data-theme', 'dark');
    icone.textContent = '☀️';
  }
}

function filtrarMarca(marca) {
  marcaAtiva = marca;
  document.querySelectorAll('.btn-filtro').forEach(btn => {
    btn.classList.toggle('ativo', btn.innerText.toUpperCase() === marca.toUpperCase() || (marca === 'TODAS' && btn.innerText === 'Todas'));
  });
  renderizarVitrine();
}

function selecionarOpcao(btn, classeGrupo) {
  const parent = btn.closest('.' + classeGrupo);
  parent.querySelectorAll('.pill-opcao').forEach(b => b.classList.remove('selecionado'));
  btn.classList.add('selecionado');
}

function formatarPreco(valor) {
  return Number(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function enviarWhatsApp(idProduto) {
  const card = document.getElementById(`prod-card-${idProduto}`);
  const produto = listaProdutos.find(p => p.id === idProduto);

  if (!produto) return;

  const tamEl = card.querySelector('.grupo-tamanhos .pill-opcao.selecionado');
  const corEl = card.querySelector('.grupo-cores .pill-opcao.selecionado');

  const tamanho = tamEl ? tamEl.innerText : 'Não informado';
  const cor = corEl ? corEl.innerText : 'Padrão';

  const textoMsg = `Olá! Tenho interesse na peça da *RAÍZES*:\n\n` +
                   `📌 *${produto.titulo}*${produto.codigo ? ` (${produto.codigo})` : ''}\n` +
                   `🏷️ Marca: ${produto.marca}\n` +
                   `💰 Valor: ${formatarPreco(produto.preco)}\n` +
                   `📏 Tamanho: ${tamanho}\n` +
                   `🎨 Cor: ${cor}\n\n` +
                   `Ainda está disponível na loja física?`;

  const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(textoMsg)}`;
  window.open(url, '_blank');
}

function renderizarVitrine() {
  const grid = document.getElementById('grid-vitrine');
  grid.innerHTML = '';

  const produtosExibidos = (typeof listaProdutos !== 'undefined' && Array.isArray(listaProdutos)) ? listaProdutos : [];

  const filtrados = produtosExibidos.filter(p => {
    if (marcaAtiva === 'TODAS') return true;
    return p.marca && p.marca.toUpperCase() === marcaAtiva.toUpperCase();
  });

  if (filtrados.length === 0) {
    grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--texto-secundario); padding: 30px 0; font-size: 13px;">Nenhum produto nesta categoria.</p>`;
    return;
  }

  filtrados.forEach(prod => {
    const card = document.createElement('article');
    card.className = 'card-produto';
    card.id = `prod-card-${prod.id}`;

    const imgMarkup = prod.imagem 
      ? `<img src="${prod.imagem}" alt="${prod.titulo}" loading="lazy">`
      : `<div class="sem-imagem-placeholder">Sem Imagem</div>`;

    const tamanhosList = prod.tamanhos || ['P', 'M', 'G'];
    const tamanhosMarkup = tamanhosList.map((t, idx) => 
      `<button class="pill-opcao ${idx === 0 ? 'selecionado' : ''}" onclick="selecionarOpcao(this, 'grupo-tamanhos')">${t}</button>`
    ).join('');

    const coresList = prod.cores || ['Padrão'];
    const coresMarkup = coresList.map((c, idx) => 
      `<button class="pill-opcao ${idx === 0 ? 'selecionado' : ''}" onclick="selecionarOpcao(this, 'grupo-cores')">${c}</button>`
    ).join('');

    card.innerHTML = `
      <div class="card-foto-wrapper">
        <span class="badge-marca">${prod.marca || 'RAÍZES'}</span>
        ${imgMarkup}
      </div>

      <div class="card-info">
        <div>
          <h3 class="produto-titulo">${prod.titulo}</h3>
          <div class="produto-preco">${formatarPreco(prod.preco)}</div>
        </div>

        <div class="secao-opcoes">
          <div>
            <span class="label-opcao">Tamanho:</span>
            <div class="lista-pills grupo-tamanhos">
              ${tamanhosMarkup}
            </div>
          </div>

          <div>
            <span class="label-opcao">Cor:</span>
            <div class="lista-pills grupo-cores">
              ${coresMarkup}
            </div>
          </div>
        </div>

        <button class="btn-interesse" onclick="enviarWhatsApp(${prod.id})">
          Tenho Interesse
        </button>
      </div>
    `;

    grid.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderizarVitrine();
});
                                   
