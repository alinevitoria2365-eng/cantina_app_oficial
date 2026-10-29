  // ============================================================
// app.js - Lógica compartilhada do Sistema de Controle de Estoque e Pedidos
// ============================================================

// ===== DADOS INICIAIS =====
const DEFAULT_PRODUCTS = [
    { id: 1, nome: "Óleo", quantidade: 40, preco: 12.90 },
    { id: 2, nome: "Arroz", quantidade: 47, preco: 25.50 },
    { id: 3, nome: "Feijão", quantidade: 30, preco: 18.90 },
    { id: 4, nome: "Açúcar", quantidade: 25, preco: 8.50 },
    { id: 5, nome: "Café", quantidade: 20, preco: 15.00 },
    { id: 6, nome: "Macarrão", quantidade: 35, preco: 6.90 },
    { id: 7, nome: "Leite", quantidade: 50, preco: 7.50 },
    { id: 8, nome: "Farinha", quantidade: 28, preco: 5.90 },
    { id: 9, nome: "Carne Suína", quantidade: 30, preco: 28.00 },
    { id: 10, nome: "Batata", quantidade: 40, preco: 6.00 },
    { id: 11, nome: "Tomate", quantidade: 30, preco: 7.00 },
    { id: 12, nome: "Cebola", quantidade: 30, preco: 5.50 },
    { id: 13, nome: "Frango", quantidade: 35, preco: 19.50 },
    { id: 14, nome: "Repolho", quantidade: 25, preco: 4.00 },
    { id: 15, nome: "Cenoura", quantidade: 25, preco: 4.50 },
    { id: 16, nome: "Laranja", quantidade: 60, preco: 2.00 },
    { id: 17, nome: "Ovos", quantidade: 100, preco: 0.80 },
    { id: 18, nome: "Banana", quantidade: 60, preco: 2.50 },
    { id: 19, nome: "Molho de Tomate", quantidade: 30, preco: 4.20 }
];

const DEFAULT_ADMIN = { cpf: "12345678900", senha: "admin123" };
const DEFAULT_USER = { cpf: "98765432100", senha: "usuario123" };
const DEFAULT_COZINHEIRAS = ["Ana Maria", "Rose", "Paula", "Fabiana"];
const SYNC_PREFIX = "__CANTINA_SYNC__:";
const SYNC_KEYS = [
    "cozinheiras", "cozinheirasExtras", "cozinheirasRemovidas",
    "products", "movimentacoes", "orders", "logs", "cart",
    "baixasCardapio", "cardapioDiaQuantidades", "cardapioQuantidadesMeta",
    "cardapioData", "cardapioUltimaAlteracao",
    "loggedIn", "adminNome", "usuarioNome"
];

function lerEstadoWindowName() {
    try {
        if (typeof window !== "undefined" && typeof window.name === "string" && window.name.indexOf(SYNC_PREFIX) === 0) {
            return JSON.parse(window.name.slice(SYNC_PREFIX.length)) || {};
        }
    } catch (e) {}
    return {};
}

function salvarEstadoWindowName() {
    try {
        if (typeof window === "undefined") return;
        const state = lerEstadoWindowName();
        SYNC_KEYS.forEach(k => {
            const val = localStorage.getItem(k);
            if (val !== null) {
                state[k] = val;
            } else {
                delete state[k];
            }
        });
        window.name = SYNC_PREFIX + JSON.stringify(state);
    } catch (e) {}
}

function sincronizarStorageEntrePaginas() {
    try {
        const winState = lerEstadoWindowName();

        // Mesclar cozinheiras entre localStorage, window.name e cookie antes de sobrescrever
        const listasParaMesclar = [];
        try {
            const lsCoz = JSON.parse(localStorage.getItem("cozinheiras") || "null");
            if (Array.isArray(lsCoz)) listasParaMesclar.push(lsCoz);
        } catch (e) {}
        try {
            const wnCoz = JSON.parse(winState.cozinheiras || "null");
            if (Array.isArray(wnCoz)) listasParaMesclar.push(wnCoz);
        } catch (e) {}
        try {
            const matchCookie = document.cookie.match(/(?:^|;\s*)cantina_cozinheiras=([^;]+)/);
            if (matchCookie) {
                const ckCoz = JSON.parse(decodeURIComponent(matchCookie[1]));
                if (Array.isArray(ckCoz)) listasParaMesclar.push(ckCoz);
            }
        } catch (e) {}

        // Sincronizar demais chaves do window.name para o localStorage atual
        Object.keys(winState).forEach(k => {
            if (k !== "cozinheiras" && winState[k] !== undefined && winState[k] !== null) {
                localStorage.setItem(k, winState[k]);
            }
        });

        let removidas = [];
        try {
            removidas = JSON.parse(localStorage.getItem("cozinheirasRemovidas") || winState.cozinheirasRemovidas || "[]") || [];
        } catch (e) {
            removidas = [];
        }

        const unificada = [];
        const adicionarSeNaoExiste = (nome) => {
            const limpo = (nome || "").trim();
            if (!limpo) return;
            if (removidas.some(r => r.toLowerCase() === limpo.toLowerCase())) return;
            if (!unificada.some(u => u.toLowerCase() === limpo.toLowerCase())) {
                unificada.push(limpo);
            }
        };

        DEFAULT_COZINHEIRAS.forEach(adicionarSeNaoExiste);
        listasParaMesclar.forEach(lista => lista.forEach(adicionarSeNaoExiste));

        if (unificada.length > 0) {
            const jsonUnificada = JSON.stringify(unificada);
            localStorage.setItem("cozinheiras", jsonUnificada);
            document.cookie = "cantina_cozinheiras=" + encodeURIComponent(jsonUnificada) + "; path=/; max-age=31536000; SameSite=Lax";
        }

        salvarEstadoWindowName();
    } catch (e) {}
}

// ===== INICIALIZAÇÃO DO localStorage =====
function initStorage() {
    sincronizarStorageEntrePaginas();
    if (!localStorage.getItem("products")) {
        localStorage.setItem("products", JSON.stringify(DEFAULT_PRODUCTS));
    } else {
        try {
            const current = JSON.parse(localStorage.getItem("products")) || [];
            let updated = false;
            DEFAULT_PRODUCTS.forEach(dp => {
                if (!current.some(p => p.id === dp.id || p.nome.toLowerCase() === dp.nome.toLowerCase())) {
                    current.push(dp);
                    updated = true;
                }
            });
            if (updated) {
                localStorage.setItem("products", JSON.stringify(current));
            }
        } catch (e) {}
    }
    if (!localStorage.getItem("adminUser")) {
        localStorage.setItem("adminUser", JSON.stringify(DEFAULT_ADMIN));
    }
    if (!localStorage.getItem("usuarioUser")) {
        localStorage.setItem("usuarioUser", JSON.stringify(DEFAULT_USER));
    }
    if (!localStorage.getItem("cart")) {
        localStorage.setItem("cart", JSON.stringify([]));
    }
    if (!localStorage.getItem("orders")) {
        localStorage.setItem("orders", JSON.stringify([]));
    }
    if (!localStorage.getItem("movimentacoes")) {
        localStorage.setItem("movimentacoes", JSON.stringify([]));
    }
    if (!localStorage.getItem("logs")) {
        localStorage.setItem("logs", JSON.stringify([]));
    }
    if (!localStorage.getItem("baixasCardapio")) {
        localStorage.setItem("baixasCardapio", JSON.stringify([]));
    }
    if (!localStorage.getItem("cardapioDiaQuantidades")) {
        localStorage.setItem("cardapioDiaQuantidades", JSON.stringify({}));
    }
    if (!localStorage.getItem("cardapioQuantidadesMeta")) {
        localStorage.setItem("cardapioQuantidadesMeta", JSON.stringify({}));
    }
    if (!localStorage.getItem("cozinheiras")) {
        localStorage.setItem("cozinheiras", JSON.stringify(DEFAULT_COZINHEIRAS));
    salvarEstadoWindowName();
    }
}

// ===== BAIXAS DO CARDÁPIO =====
function getBaixasCardapio() {
    const data = localStorage.getItem("baixasCardapio");
    return data ? JSON.parse(data) : [];
}

function saveBaixasCardapio(baixas) {
    localStorage.setItem("baixasCardapio", JSON.stringify(baixas));
}

function getUltimaBaixaDoDia(diaNome) {
    const baixas = getBaixasCardapio();
    const diaNorm = diaNome.toLowerCase().trim();
    for (let i = baixas.length - 1; i >= 0; i--) {
        if (baixas[i].diaNome && baixas[i].diaNome.toLowerCase().trim() === diaNorm) {
            return baixas[i];
        }
    }
    return null;
}

// ===== QUANTIDADES E SINCRONIZAÇÃO DO CARDÁPIO =====
function getCardapioQuantidades() {
    try {
        const data = localStorage.getItem("cardapioDiaQuantidades");
        return data ? JSON.parse(data) : {};
    } catch (e) {
        return {};
    }
}

function saveCardapioQuantidades(qtds, meta) {
    localStorage.setItem("cardapioDiaQuantidades", JSON.stringify(qtds));
    if (meta) {
        localStorage.setItem("cardapioQuantidadesMeta", JSON.stringify(meta));
    }
}

function getCardapioQuantidadesMeta() {
    try {
        const data = localStorage.getItem("cardapioQuantidadesMeta");
        return data ? JSON.parse(data) : {};
    } catch (e) {
        return {};
    }
}

function getCardapioUltimaAlteracao() {
    try {
        const data = localStorage.getItem("cardapioUltimaAlteracao");
        return data ? JSON.parse(data) : null;
    } catch (e) {
        return null;
    }
}

function saveCardapioUltimaAlteracao(info) {
    localStorage.setItem("cardapioUltimaAlteracao", JSON.stringify(info));
}

// ===== LOGS DE ATIVIDADE (auditoria: acessos e alterações) =====
function getLogs() {
    const data = localStorage.getItem("logs");
    return data ? JSON.parse(data) : [];
}

function saveLogs(logs) {
    localStorage.setItem("logs", JSON.stringify(logs));
    salvarEstadoWindowName();
}

function getLoggedInName() {
    const tipo = getLoggedInType();
    if (tipo === "admin") {
        const nome = localStorage.getItem("adminNome");
        return nome ? nome : "Administrador";
    }
    if (tipo === "usuario") {
        const nome = localStorage.getItem("usuarioNome");
        return nome ? nome : "Usuário";
    }
    return "Visitante";
}

function registrarLog(acao, detalhes) {
    const logs = getLogs();
    const agora = new Date();
    logs.push({
        id: Date.now() + Math.random(),
        timestamp: Date.now(),
        data: agora.toLocaleDateString("pt-BR"),
        hora: agora.toLocaleTimeString("pt-BR"),
        usuario: getLoggedInName(),
        acao: acao,          // "login" | "entrada" | "saida" | "pedido" | "aprovado" | "rejeitado" | "alteracao"
        detalhes: detalhes
    });
    saveLogs(logs);
}

// ===== PRODUTOS =====
function getProducts() {
    const data = localStorage.getItem("products");
    return data ? JSON.parse(data) : DEFAULT_PRODUCTS;
}

function saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
    salvarEstadoWindowName();
}

function getProductById(id) {
    const products = getProducts();
    return products.find(p => p.id === parseInt(id));
}

// ===== MOVIMENTAÇÕES (entradas e saídas) =====
function getMovimentacoes() {
    const data = localStorage.getItem("movimentacoes");
    return data ? JSON.parse(data) : [];
}

function saveMovimentacoes(mov) {
    localStorage.setItem("movimentacoes", JSON.stringify(mov));
    salvarEstadoWindowName();
}

function registrarMovimentacao(tipo, produto, quantidade, motivo) {
    const mov = getMovimentacoes();
    mov.push({
        id: Date.now() + Math.random(),
        timestamp: Date.now(),
        tipo: tipo,            // "entrada" | "saida"
        produto: produto,
        quantidade: quantidade,
        data: new Date().toLocaleString("pt-BR"),
        responsavel: getLoggedInName(),
        motivo: motivo || getLoggedInName()
    });
    saveMovimentacoes(mov);
}

function obterTimestampMovimentacao(m) {
    if (!m) return 0;
    if (typeof m.timestamp === "number" && m.timestamp > 0) return m.timestamp;
    if (typeof m.id === "number" && m.id > 1000000000000) return Math.floor(m.id);
    if (typeof m.data === "string") {
        const match = m.data.match(/(\d{2})\/(\d{2})\/(\d{4})(?:[,\s]+(\d{2}):(\d{2})(?::(\d{2}))?)?/);
        if (match) {
            const dia = parseInt(match[1], 10);
            const mes = parseInt(match[2], 10) - 1;
            const ano = parseInt(match[3], 10);
            const hora = parseInt(match[4] || "0", 10);
            const min = parseInt(match[5] || "0", 10);
            const seg = parseInt(match[6] || "0", 10);
            return new Date(ano, mes, dia, hora, min, seg).getTime();
        }
    }
    return 0;
}

function getMovimentacoesUltimosDias(dias = 7) {
    const mov = getMovimentacoes();
    const agora = Date.now();
    const limite = agora - (dias * 24 * 60 * 60 * 1000);
    return mov.filter(m => {
        const ts = obterTimestampMovimentacao(m);
        return ts >= limite && ts <= agora + 60000;
    });
}

// ===== HISTÓRICO DE PEDIDOS (usado pelos relatórios) =====
function getHistoricoPedidos() {
    return getOrders();
}

function updateProductQuantity(id, delta) {
    const products = getProducts();
    const index = products.findIndex(p => p.id === parseInt(id));
    if (index !== -1) {
        const newQty = products[index].quantidade + delta;
        if (newQty >= 0) {
            products[index].quantidade = newQty;
            saveProducts(products);
            return true;
        }
    }
    return false;
}

function renderProductList(containerId, mode = "view", showActions = true) {
    const products = getProducts();
    const container = document.getElementById(containerId);
    if (!container) return;

    if (products.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📦</div>
                <p>Nenhum produto cadastrado</p>
            </div>
        `;
        return;
    }

    let html = '<ul class="product-list">';
    products.forEach(p => {
        html += `
            <li class="product-item" data-id="${p.id}">
                <div class="product-info">
                    <span class="product-name">${p.nome}</span>
                    <span class="product-qty">Qtd: <strong id="qty-${p.id}">${p.quantidade}</strong></span>
                </div>
                <div class="product-actions">
        `;

if (mode === "entrada") {
            html += getQtyControlHTML(p.id, mode, "btn-primary");
} else if (mode === "saida") {
            html += getQtyControlHTML(p.id, mode, "btn-danger");
        } else if (mode === "pedido") {
            html += getQtyControlHTML(p.id, mode, "btn-primary");
            html += `
                    <button class="btn btn-sm btn-success" onclick="addToCart(${p.id})" style="width:47px;height:47px;padding:0;">🛒</button>
            `;
        }

        html += `
                </div>
            </li>`;
    });
    html += '</ul>';
    container.innerHTML = html;
    if (mode === "entrada" || mode === "saida") {
        updateConfirmButton(mode);
    }
}

// ===== ALTERAÇÕES PENDENTES (estado temporário para controles + / - ) =====
let pendingChanges = {};

function getPendingQty(id, mode) {
    return pendingChanges[`${mode}-${id}`] || 0;
}

function setPendingQty(id, mode, qty) {
    if (qty <= 0) {
        delete pendingChanges[`${mode}-${id}`];
    } else {
        pendingChanges[`${mode}-${id}`] = qty;
    }
}

function hasPendingChanges(mode) {
    return Object.keys(pendingChanges).some(key => key.startsWith(`${mode}-`) && pendingChanges[key] > 0);
}

function resetPendingChanges() {
    pendingChanges = {};
    document.querySelectorAll('[id^="change-qty-"]').forEach(el => {
        el.textContent = '0';
    });
}

function changeQty(id, delta, mode) {
    const newVal = getPendingQty(id, mode) + delta;
    if (newVal >= 0) {
        setPendingQty(id, mode, newVal);
        const el = document.getElementById(`change-qty-${id}`);
        if (el) el.textContent = newVal;
        if (mode === "entrada" || mode === "saida") {
            updateConfirmButton(mode);
        }
    }
}

function getQtyControlHTML(id, mode, btnClass) {
    return `
        <div class="qty-control">
            <button class="btn btn-sm ${btnClass} btn-icon" onclick="changeQty(${id}, -1, '${mode}')" style="width:42px;height:42px;font-size:18px;">−</button>
            <span id="change-qty-${id}">0</span>
            <button class="btn btn-sm ${btnClass} btn-icon" onclick="changeQty(${id}, 1, '${mode}')" style="width:42px;height:42px;font-size:18px;">+</button>
        </div>
    `;
}

function updateConfirmButton(mode) {
    const btnId = mode === "entrada" ? "confirm-entrada-btn" : "confirm-saida-btn";
    const btn = document.getElementById(btnId);
    if (!btn) return;
    btn.disabled = !hasPendingChanges(mode);
}

// ===== ENTRADA (ADICIONAR ESTOQUE) =====

// ===== SAÍDA (REMOVER ESTOQUE) =====
function removeStock(id) {
    const qty = getPendingQty(id, "saida");
    if (qty <= 0) {
        alert("Selecione uma quantidade para remover.");
        return;
    }
    const product = getProductById(id);
    if (qty > product.quantidade) {
        alert(`Quantidade insuficiente! Estoque atual: ${product.quantidade}`);
        return;
    }
    if (updateProductQuantity(id, -qty)) {
        const updated = getProductById(id);
        const qtyEl = document.getElementById(`qty-${id}`);
        if (qtyEl) qtyEl.textContent = updated.quantidade;
        setPendingQty(id, "saida", 0);
        const changeEl = document.getElementById(`change-qty-${id}`);
        if (changeEl) changeEl.textContent = '0';
        updateConfirmButton("saida");
        registrarMovimentacao("saida", product.nome, qty, "Saída manual");
        registrarLog("saida", `Saída de ${qty} unidade(s) do produto "${product.nome}" do estoque`);
        showToast(`${product.nome}: -${qty} unidades removidas!`);
    } else {
        alert("Erro ao remover estoque.");
    }
}

// ===== CONFIRMAR ENTRADA (todas as alterações de uma vez) =====
function confirmEntrada() {
    if (!hasPendingChanges("entrada")) {
        alert("Nenhuma alteração para confirmar.");
        return;
    }

    const products = getProducts();
    const applied = [];
    products.forEach(p => {
        const qty = getPendingQty(p.id, "entrada");
        if (qty > 0 && updateProductQuantity(p.id, qty)) {
            registrarMovimentacao("entrada", p.nome, qty, "Entrada manual");
            applied.push({ produto: p, qty });
        }
    });

    const totalAdded = applied.reduce((sum, a) => sum + a.qty, 0);
    if (totalAdded > 0) {
        // Registrar alterações no histórico de atividades
        applied.forEach(a => {
            registrarLog("entrada", `Entrada de ${a.qty} unidade(s) do produto "${a.produto.nome}" no estoque`);
        });
        showToast(`✅ Entrada confirmada! ${totalAdded} unidades adicionadas ao estoque.`);
        resetPendingChanges();
        renderProductList("product-list", "entrada");
    } else {
        alert("Erro ao confirmar entrada.");
    }
}

// ===== CONFIRMAR SAÍDA =====
function confirmSaida() {
    if (!hasPendingChanges("saida")) {
        alert("Nenhuma alteração para confirmar.");
        return;
    }

    const products = getProducts();
    const applied = [];
    let error = false;

    products.forEach(p => {
        const qty = getPendingQty(p.id, "saida");
        if (qty > 0) {
            if (qty <= p.quantidade) {
                updateProductQuantity(p.id, -qty);
                registrarMovimentacao("saida", p.nome, qty, "Saída manual");
                applied.push({ produto: p, qty });
            } else {
                error = true;
                alert(`Estoque insuficiente para ${p.nome}! Disponível: ${p.quantidade}`);
            }
        }
    });

    if (error) return;

    const totalRemoved = applied.reduce((sum, a) => sum + a.qty, 0);
    if (totalRemoved > 0) {
        // Registrar alterações no histórico de atividades
        applied.forEach(a => {
            registrarLog("saida", `Saída de ${a.qty} unidade(s) do produto "${a.produto.nome}" do estoque`);
        });
        showToast(`✅ Saída confirmada! ${totalRemoved} unidades removidas do estoque.`);
        resetPendingChanges();
        renderProductList("product-list", "saida");
    } else {
        alert("Nenhuma alteração para confirmar.");
    }
}

// ===== CARRINHO =====
function getCart() {
    const data = localStorage.getItem("cart");
    return data ? JSON.parse(data) : [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(id) {
    const qty = getPendingQty(id, "pedido");
    if (qty <= 0) {
        alert("Selecione uma quantidade para adicionar ao carrinho.");
        return;
    }

    const product = getProductById(id);
    if (!product) return;

    if (qty > product.quantidade) {
        alert(`Estoque insuficiente para ${product.nome}! Disponível: ${product.quantidade}`);
        return;
    }

    let cart = getCart();
    const existingIndex = cart.findIndex(item => item.id === product.id);

    if (existingIndex !== -1) {
        cart[existingIndex].quantidade += qty;
    } else {
        cart.push({ id: product.id, nome: product.nome, quantidade: qty, preco: product.preco });
    }

    saveCart(cart);
    setPendingQty(id, "pedido", 0);
    const changeEl = document.getElementById(`change-qty-${id}`);
    if (changeEl) changeEl.textContent = '0';

    updateCartBadge();
    showToast(`🛒 ${product.nome}: +${qty} no carrinho!`);
}

function updateCartBadge() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantidade, 0);
    let badge = document.getElementById("cart-badge");
    if (!badge) {
        badge = document.createElement("div");
        badge.id = "cart-badge";
        badge.className = "cart-badge";
        document.body.appendChild(badge);
    }
    badge.textContent = totalItems;
    badge.style.display = totalItems > 0 ? "flex" : "none";
}

function renderCartList(containerId) {
    const cart = getCart();
    const container = document.getElementById(containerId);
    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">🛒</div>
                <p>Carrinho vazio</p>
                <p style="font-size:13px;margin-top:8px;">Adicione produtos pelo estoque da cozinha</p>
            </div>
        `;
        return;
    }

    let html = '<ul class="product-list">';
    cart.forEach(item => {
        html += `
            <li class="cart-item">
                <div class="item-detail">
                    <span class="item-name">${item.nome}</span>
                    <span class="item-qty">Qtd: ${item.quantidade}</span>
                </div>
                <div style="display:flex;align-items:center;gap:8px;">
                    <button class="btn btn-sm btn-danger" onclick="removeFromCart(${item.id})" style="width:36px;height:36px;padding:0;">🗑️</button>
                </div>
            </li>`;
    });
    html += '</ul>';

    container.innerHTML = html;
}

function removeFromCart(id) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== id);
    saveCart(cart);
    renderCartList("cart-list");
    updateCartBadge();
    showToast("Item removido do carrinho.");
}

function confirmarPedido() {
    const cart = getCart();
    if (cart.length === 0) {
        alert("Carrinho vazio! Adicione produtos antes de confirmar.");
        return;
    }

    // Verificar se há estoque suficiente
    let success = true;
    cart.forEach(item => {
        const product = getProductById(item.id);
        if (!product || product.quantidade < item.quantidade) {
            success = false;
            alert(`Estoque insuficiente para ${item.nome}! Disponível: ${product ? product.quantidade : 0}`);
        }
    });

    if (!success) return;

    // Salvar como pedido pendente (sem dar baixa no estoque automaticamente)
    const total = cart.reduce((sum, item) => sum + (item.quantidade * item.preco), 0);
    const novoPedido = {
        id: Date.now(),
        data: new Date().toLocaleString("pt-BR"),
        itens: JSON.parse(JSON.stringify(cart)),
        total: total,
        status: "pendente" // pendente | aprovado | rejeitado
    };

    const orders = getOrders();
    orders.push(novoPedido);
    saveOrders(orders);

    // Registrar pedido no histórico de atividades
    registrarLog("pedido", `Confirmou o pedido #${novoPedido.id} (${cart.map(item => `${item.nome} x${item.quantidade}`).join(', ')}) - Total: R$ ${total.toFixed(2)}`);

    showToast(`✅ Pedido #${novoPedido.id} enviado para o administrador!`);
    saveCart([]);
    updateCartBadge();

    const container = document.getElementById("cart-list");
    if (container) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">✅</div>
                <p>Pedido enviado com sucesso!</p>
                <p style="font-size:13px;margin-top:8px;">Aguardando aprovação do administrador.</p>
                <p style="font-size:13px;color:#1a4fbf;">Nº do Pedido: #${novoPedido.id}</p>
            </div>
        `;
    }
}

// ===== PEDIDOS (ORDERS) =====
function getOrders() {
    const data = localStorage.getItem("orders");
    return data ? JSON.parse(data) : [];
}

function saveOrders(orders) {
    localStorage.setItem("orders", JSON.stringify(orders));
    salvarEstadoWindowName();
}

function getOrderById(id) {
    const orders = getOrders();
    return orders.find(o => o.id === parseInt(id));
}

function approveOrder(orderId) {
    const orders = getOrders();
    const index = orders.findIndex(o => o.id === parseInt(orderId));
    if (index === -1) return false;

    const order = orders[index];
    
    // Dar baixa no estoque
    let success = true;
    order.itens.forEach(item => {
        const product = getProductById(item.id);
        if (!product || product.quantidade < item.quantidade) {
            success = false;
            alert(`Estoque insuficiente para ${item.nome}! Disponível: ${product ? product.quantidade : 0}`);
        }
    });

    if (!success) return false;

    order.itens.forEach(item => {
        updateProductQuantity(item.id, -item.quantidade);
        registrarMovimentacao("saida", item.nome, item.quantidade, `Pedido #${orderId}`);
    });

    order.status = "aprovado";
    saveOrders(orders);
    // Registrar aprovação no histórico de atividades
    registrarLog("aprovado", `Aprovou o pedido #${orderId} e deu baixa no estoque`);
    showToast(`✅ Pedido #${orderId} aprovado! Estoque atualizado.`);
    return true;
}

function rejectOrder(orderId) {
    const orders = getOrders();
    const index = orders.findIndex(o => o.id === parseInt(orderId));
    if (index === -1) return false;

    orders[index].status = "rejeitado";
    saveOrders(orders);
    // Registrar rejeição no histórico de atividades
    registrarLog("rejeitado", `Rejeitou o pedido #${orderId}`);
    showToast(`❌ Pedido #${orderId} rejeitado.`);
    return true;
}

function updateOrderItem(orderId, productId, newQty) {
    const orders = getOrders();
    const orderIndex = orders.findIndex(o => o.id === parseInt(orderId));
    if (orderIndex === -1) return false;

    const order = orders[orderIndex];
    const itemIndex = order.itens.findIndex(i => i.id === parseInt(productId));
    if (itemIndex === -1) return false;

    // Capturar nome do item antes de qualquer alteração (para o log)
    const nomeItem = order.itens[itemIndex].nome;

    if (newQty <= 0) {
        order.itens.splice(itemIndex, 1);
    } else {
        order.itens[itemIndex].quantidade = newQty;
    }

    // Recalcular total
    order.total = order.itens.reduce((sum, item) => sum + (item.quantidade * item.preco), 0);
    saveOrders(orders);
    // Registrar alteração no histórico de atividades
    registrarLog("alteracao", `Alterou o item "${nomeItem}" do pedido #${orderId} para quantidade ${newQty <= 0 ? "0 (removido)" : newQty}`);
    showToast(`✏️ Pedido #${orderId} atualizado.`);
    return true;
}

function removeOrderItem(orderId, productId) {
    return updateOrderItem(orderId, productId, 0);
}

function renderAdminOrderList(containerId) {
    const orders = getOrders();
    const container = document.getElementById(containerId);
    if (!container) return;

    if (orders.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📋</div>
                <p>Nenhum pedido recebido</p>
                <p style="font-size:13px;margin-top:8px;">Os pedidos dos usuários aparecerão aqui</p>
            </div>
        `;
        return;
    }

    // Ordenar: pendentes primeiro, depois por data mais recente
    const sorted = [...orders].sort((a, b) => {
        if (a.status === "pendente" && b.status !== "pendente") return -1;
        if (a.status !== "pendente" && b.status === "pendente") return 1;
        return b.id - a.id;
    });

    let html = '';
    sorted.forEach(order => {
        const statusClass = order.status === "aprovado" ? "status-approved" : 
                            order.status === "rejeitado" ? "status-rejected" : "status-pending";
        const statusLabel = order.status === "aprovado" ? "✅ Aprovado" :
                            order.status === "rejeitado" ? "❌ Rejeitado" : "⏳ Pendente";

        html += `
            <div class="order-card" style="background:#f7fafc;border-radius:12px;padding:16px;margin-bottom:12px;border:1px solid #e2e8f0;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                    <strong style="font-size:16px;color:#2d3748;">Pedido #${order.id}</strong>
                    <span class="${statusClass}" style="font-size:13px;padding:4px 10px;border-radius:20px;font-weight:600;">${statusLabel}</span>
                </div>
                <div style="font-size:13px;color:#718096;margin-bottom:8px;">📅 ${order.data}</div>
                <div style="font-size:13px;color:#4a5568;margin-bottom:4px;">
                    ${order.itens.map(item => `${item.nome} x${item.quantidade}`).join(', ')}
                </div>
                <div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px;">
                    <strong style="color:#2d3748;">Total: R$ ${order.total.toFixed(2)}</strong>
                    <div style="display:flex;gap:6px;">
                        <button class="btn btn-sm btn-outline" onclick="showOrderDetail(${order.id})" style="padding:6px 12px;font-size:12px;">👁️ Detalhes</button>
        `;

        if (order.status === "pendente") {
            html += `
                        <button class="btn btn-sm btn-success" onclick="if(confirm('Aprovar pedido #${order.id}?')){approveOrder(${order.id});renderAdminOrderList('${containerId}');}" style="padding:6px 12px;font-size:12px;">✅ Aprovar</button>
                        <button class="btn btn-sm btn-danger" onclick="if(confirm('Rejeitar pedido #${order.id}?')){rejectOrder(${order.id});renderAdminOrderList('${containerId}');}" style="padding:6px 12px;font-size:12px;">❌ Rejeitar</button>
            `;
        }

        html += `
                    </div>
                </div>
            </div>`;
    });

    container.innerHTML = html;
}

function showOrderDetail(orderId) {
    const order = getOrderById(orderId);
    if (!order) {
        alert("Pedido não encontrado.");
        return;
    }

    const container = document.getElementById("order-detail");
    if (!container) return;

    // Esconder a lista e mostrar o detalhe
    document.getElementById("order-list-container").style.display = "none";
    document.getElementById("order-detail-container").style.display = "block";

    const statusClass = order.status === "aprovado" ? "status-approved" : 
                        order.status === "rejeitado" ? "status-rejected" : "status-pending";
    const statusLabel = order.status === "aprovado" ? "✅ Aprovado" :
                        order.status === "rejeitado" ? "❌ Rejeitado" : "⏳ Pendente";

    let html = `
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
            <h3 style="color:#2d3748;font-size:18px;">Pedido #${order.id}</h3>
            <span class="${statusClass}" style="font-size:13px;padding:4px 10px;border-radius:20px;font-weight:600;">${statusLabel}</span>
        </div>
        <div style="font-size:13px;color:#718096;margin-bottom:16px;">📅 ${order.data}</div>
        <ul class="product-list">
    `;

    order.itens.forEach((item, idx) => {
        const product = getProductById(item.id);
        const stockAvailable = product ? product.quantidade : 0;
        html += `
            <li class="cart-item" style="background:#f7fafc;border-radius:12px;padding:14px 16px;margin-bottom:8px;border:1px solid #e2e8f0;">
                <div class="item-detail">
                    <span class="item-name" style="font-weight:600;color:#2d3748;">${item.nome}</span>
                    <span class="item-qty" style="font-size:14px;color:#718096;">
                        Qtd: <strong>${item.quantidade}</strong> | 
                        R$ ${item.preco.toFixed(2)} | 
                        Sub: R$ ${(item.quantidade * item.preco).toFixed(2)}
                    </span>
                    <span style="font-size:12px;color:#718096;">📦 Estoque: ${stockAvailable} unidades</span>
                </div>
        `;

        if (order.status === "pendente") {
            html += `
                <div style="display:flex;align-items:center;gap:6px;margin-top:8px;">
                    <button class="btn btn-sm btn-outline" onclick="alterarItemPedido(${order.id}, ${item.id}, -1)" style="width:32px;height:32px;padding:0;font-size:16px;">−</button>
                    <span style="font-weight:600;min-width:20px;text-align:center;">${item.quantidade}</span>
                    <button class="btn btn-sm btn-outline" onclick="alterarItemPedido(${order.id}, ${item.id}, 1)" style="width:32px;height:32px;padding:0;font-size:16px;">+</button>
                    <button class="btn btn-sm btn-danger" onclick="if(confirm('Remover ${item.nome} do pedido?')){removeOrderItem(${order.id}, ${item.id});showOrderDetail(${order.id});}" style="width:32px;height:32px;padding:0;font-size:14px;margin-left:4px;">🗑️</button>
                </div>
            `;
        }

        html += `</li>`;
    });

    html += '</ul>';

    html += `
        <div class="cart-total" style="background:linear-gradient(135deg,#1a4fbf,#12305c);border-radius:12px;padding:16px;color:#fff;margin-top:16px;">
            <span style="font-size:16px;font-weight:500;">Total do Pedido</span>
            <span style="font-size:20px;font-weight:700;">R$ ${order.total.toFixed(2)}</span>
        </div>
    `;

    if (order.status === "pendente") {
        html += `
            <div style="display:flex;gap:12px;margin-top:16px;">
                <button class="btn btn-success" onclick="if(confirm('Aprovar pedido #${order.id}?')){approveOrder(${order.id});showOrderDetail(${order.id});}" style="flex:1;">✅ Aprovar</button>
                <button class="btn btn-danger" onclick="if(confirm('Rejeitar pedido #${order.id}?')){rejectOrder(${order.id});voltarListaPedidos();}" style="flex:1;">❌ Rejeitar</button>
            </div>
        `;
    }

    html += `
        <div style="margin-top:16px;text-align:center;">
            <button class="btn btn-outline" onclick="voltarListaPedidos()" style="display:inline-flex;width:auto;">← Voltar para lista</button>
        </div>
    `;

    container.innerHTML = html;
}

function alterarItemPedido(orderId, productId, delta) {
    const order = getOrderById(orderId);
    if (!order) return;

    const item = order.itens.find(i => i.id === parseInt(productId));
    if (!item) return;

    const newQty = item.quantidade + delta;
    if (newQty < 0) return;

    if (updateOrderItem(orderId, productId, newQty)) {
        showOrderDetail(orderId);
    }
}

function voltarListaPedidos() {
    document.getElementById("order-list-container").style.display = "block";
    document.getElementById("order-detail-container").style.display = "none";
    renderAdminOrderList("order-list");
}

// Lista oficial de colaboradoras da cantina / cozinha
const LISTA_USUARIOS = ["Ana Maria", "Rose", "Paula", "Fabiana"];

function getListaUsuarios() {
    sincronizarStorageEntrePaginas();
    try {
        const data = localStorage.getItem("cozinheiras");
        if (data) {
            const parsed = JSON.parse(data);
            if (Array.isArray(parsed) && parsed.length > 0) {
                return parsed;
            }
        }
    } catch (e) {}
    return [...LISTA_USUARIOS];
}

function saveListaUsuarios(lista) {
    localStorage.setItem("cozinheiras", JSON.stringify(lista));
    document.cookie = "cantina_cozinheiras=" + encodeURIComponent(JSON.stringify(lista)) + "; path=/; max-age=31536000; SameSite=Lax";
    salvarEstadoWindowName();
}

function getInicialCozinheira(nome, listaCompleta, indiceAtual) {
    const limpo = (nome || "").trim();
    if (!limpo) return "?";
    const primeira = limpo.charAt(0).toUpperCase();
    if (Array.isArray(listaCompleta) && typeof indiceAtual === "number") {
        const conflitoAnterior = listaCompleta.slice(0, indiceAtual).some(
            n => (n || "").trim().charAt(0).toUpperCase() === primeira
        );
        if (conflitoAnterior && limpo.length > 1) {
            return primeira + limpo.charAt(1).toLowerCase();
        }
    }
    return primeira;
}

function adicionarCozinheira(nome) {
    const nomeLimpo = (nome || "").trim();
    if (!nomeLimpo) {
        return { sucesso: false, mensagem: "Por favor, digite o nome da cozinheira." };
    }

    const lista = getListaUsuarios();
    const jaExiste = lista.some(u => u.toLowerCase() === nomeLimpo.toLowerCase());
    if (jaExiste) {
        return { sucesso: false, mensagem: `A cozinheira "${nomeLimpo}" já está cadastrada!` };
    }

    lista.push(nomeLimpo);
    try {
        const removidas = JSON.parse(localStorage.getItem("cozinheirasRemovidas") || "[]") || [];
        const novasRemovidas = removidas.filter(r => r.toLowerCase() !== nomeLimpo.toLowerCase());
        localStorage.setItem("cozinheirasRemovidas", JSON.stringify(novasRemovidas));
    } catch (e) {}
    saveListaUsuarios(lista);
    registrarLog("alteracao", `Cadastrou nova cozinheira: "${nomeLimpo}"`);
    return { sucesso: true, nome: nomeLimpo, mensagem: `Cozinheira "${nomeLimpo}" cadastrada com sucesso!` };
}

function removerCozinheira(nome) {
    const nomeLimpo = (nome || "").trim();
    const lista = getListaUsuarios();
    if (lista.length <= 1) {
        return { sucesso: false, mensagem: "É necessário manter pelo menos uma cozinheira cadastrada." };
    }
    const novaLista = lista.filter(u => u.toLowerCase() !== nomeLimpo.toLowerCase());
    if (novaLista.length === lista.length) {
        return { sucesso: false, mensagem: "Cozinheira não encontrada." };
    }
    try {
        const removidas = JSON.parse(localStorage.getItem("cozinheirasRemovidas") || "[]") || [];
        if (!removidas.some(r => r.toLowerCase() === nomeLimpo.toLowerCase())) {
            removidas.push(nomeLimpo);
        }
        localStorage.setItem("cozinheirasRemovidas", JSON.stringify(removidas));
    } catch (e) {}
    saveListaUsuarios(novaLista);
    registrarLog("alteracao", `Removeu a cozinheira: "${nomeLimpo}"`);
    return { sucesso: true, mensagem: `Cozinheira "${nomeLimpo}" removida.` };
}

function renderizarCardsUsuarios(containerId, selectId, funcaoClick) {
    const container = document.getElementById(containerId);
    const select = selectId ? document.getElementById(selectId) : null;
    const usuarios = getListaUsuarios();

    if (container) {
        let html = "";
        usuarios.forEach((nome, idx) => {
            const inicial = getInicialCozinheira(nome, usuarios, idx);
            const nomeAttr = nome.replace(/"/g, "&quot;");
            const nomeJs = nome.replace(/\\/g, "\\\\").replace(/'/g, "\\'");
            html += `
                <button type="button" class="cv-user-card" data-nome="${nomeAttr}" onclick="${funcaoClick}('${nomeJs}', this)">
                    <div class="cv-user-avatar">
                        <span class="cv-user-initial">${inicial}</span>
                        <span class="cv-user-badge">👩‍🍳</span>
                    </div>
                    <div class="cv-user-info">
                        <span class="cv-user-name">${nome}</span>
                        <span class="cv-user-sub">Colaboradora da Cozinha</span>
                    </div>
                    <div class="cv-user-indicator">
                        <span class="cv-user-radio">
                            <svg class="cv-check-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        </span>
                        <span class="cv-user-arrow">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#1a4fbf" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6 L16 12 L9 18"/></svg>
                        </span>
                    </div>
                </button>
            `;
        });
        container.innerHTML = html;
    }

    if (select) {
        let optionsHtml = '<option value="" disabled selected>Escolha seu nome...</option>';
        usuarios.forEach(nome => {
            const nomeAttr = nome.replace(/"/g, "&quot;");
            optionsHtml += `<option value="${nomeAttr}">${nome}</option>`;
        });
        select.innerHTML = optionsHtml;
    }
}

// Lista oficial de administradoras da cantina / gestão
const LISTA_ADMINS = ["Rita", "Maria", "Roberta"];

function getListaAdmins() {
    return LISTA_ADMINS;
}

// ===== LOGIN =====
function fazerLogin(cpf, senha, tipo, nomeUsuario) {
    if (tipo === "usuario") {
        const nomeFinal = nomeUsuario || localStorage.getItem("usuarioNome") || "Usuário";
        localStorage.setItem("loggedIn", "usuario");
        localStorage.setItem("usuarioNome", nomeFinal);
        const agora = new Date();
        const logs = getLogs();
        logs.push({
            id: Date.now() + Math.random(),
        timestamp: Date.now(),
            data: agora.toLocaleDateString("pt-BR"),
            hora: agora.toLocaleTimeString("pt-BR"),
            usuario: nomeFinal,
            acao: "login",
            detalhes: "Entrou no sistema"
        });
        saveLogs(logs);
        showToast(`✅ Bem-vinda, ${nomeFinal}!`);
        return true;
    }

    if (tipo === "admin") {
        const nomeFinal = nomeUsuario || localStorage.getItem("adminNome") || "Administrador";
        localStorage.setItem("loggedIn", "admin");
        localStorage.setItem("adminNome", nomeFinal);
        localStorage.removeItem("usuarioNome");
        const agora = new Date();
        const logs = getLogs();
        logs.push({
            id: Date.now() + Math.random(),
        timestamp: Date.now(),
            data: agora.toLocaleDateString("pt-BR"),
            hora: agora.toLocaleTimeString("pt-BR"),
            usuario: nomeFinal,
            acao: "login",
            detalhes: "Entrou no sistema (Gestão)"
        });
        saveLogs(logs);
        showToast(`✅ Bem-vinda, ${nomeFinal}!`);
        return true;
    }
    return false;
}

function isLoggedIn() {
    return localStorage.getItem("loggedIn") !== null;
}

function getLoggedInType() {
    return localStorage.getItem("loggedIn");
}

function logout() {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("usuarioNome");
    localStorage.removeItem("adminNome");
    localStorage.removeItem("cart");
    salvarEstadoWindowName();
    showToast("👋 Sessão encerrada.");
    const isSubfolder = window.location.pathname.includes("/admin/") || window.location.pathname.includes("/usuario/");
    window.location.href = isSubfolder ? "../index.html" : "index.html";
}

// ===== TOAST NOTIFICATION =====
function showToast(message) {
    const existing = document.querySelector(".toast-notification");
    if (existing) existing.remove();

    const toast = document.createElement("div");
    toast.className = "toast-notification";
toast.innerHTML = message;
    const hasFixedBar = document.querySelector(".fixed-bottom-bar");
    toast.style.cssText = `
        position: fixed;
        bottom: ${hasFixedBar ? "96px" : "24px"};
        left: 50%;
        transform: translateX(-50%);
        background: #2d3748;
        color: #fff;
        padding: 12px 24px;
        border-radius: 12px;
        font-size: 14px;
        font-weight: 500;
        box-shadow: 0 8px 30px rgba(0,0,0,0.3);
        z-index: 9999;
        animation: slideUp 0.3s ease;
        max-width: 90%;
        text-align: center;
    `;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transition = "opacity 0.3s";
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

// ===== INIT ON PAGE LOAD =====
initStorage();
document.addEventListener("DOMContentLoaded", function() {
    initStorage();
    updateCartBadge();
});

