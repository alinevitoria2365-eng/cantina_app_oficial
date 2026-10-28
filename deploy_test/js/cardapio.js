/* =====================================================================
   CARDÁPIO REGULAR - SETEMBRO / 2026
   Uso: o botão do menu chama abrirCardapio()
   Controle de itens para uso no dia, baixa no estoque e impressão.
   ===================================================================== */

const DEFAULT_CARDAPIO = {
    titulo: "CARDÁPIO REGULAR - SETEMBRO / 2026",
    cabecalhoGoverno: [
        "Governo do Estado de São Paulo",
        "Secretaria de Estado da Educação",
        "Diretoria de Infraestrutura de Serviços Escolares - DIISE",
        "Coordenadoria de Alimentação Escolar - COALE",
        "Divisão de Serviços de Nutrição - DNUT"
    ],
    comunicado:
        "A Diretoria Técnica da COALE no uso de suas atribuições, comunica aos Senhores Dirigentes " +
        "Regionais de Ensino, Supervisores e Diretores de Escolas do Sistema Centralizado de " +
        "Alimentação Escolar, o Cardápio Regular",
    semana: "4",
    periodo: {
        titulo: "Período parcial:",
        linhas: [
            "Matutino: 10h - 11h00",
            "Vespertino: 13h30 - 14h30"
        ],
        noturno: "Noturno:<br>19h00 - 20h00"
    },
    dias: [
        {
            nome: "Segunda", data: "21/set",
            itens: [
                "FEIJÃO (opcional)",
                "ARROZ CARRETEIRO (arroz, carne suína, tomate, cebola, salsinha)",
                "BATATA AO FORNO"
            ],
            ingredientes: [
                { nome: "Arroz", quantidadePadrao: 5, unidade: "kg/pct" },
                { nome: "Feijão", quantidadePadrao: 3, unidade: "kg/pct" },
                { nome: "Óleo", quantidadePadrao: 2, unidade: "un" },
                { nome: "Carne Suína", quantidadePadrao: 4, unidade: "kg" },
                { nome: "Batata", quantidadePadrao: 6, unidade: "kg" },
                { nome: "Tomate", quantidadePadrao: 3, unidade: "kg" },
                { nome: "Cebola", quantidadePadrao: 2, unidade: "kg" }
            ]
        },
        {
            nome: "Terça", data: "22/set",
            itens: [
                "ARROZ E FEIJÃO",
                "FRANGO ACEBOLADO (peito de frango em cubos, cebola, salsinha) OU ISCAS BOVINA ACEBOLADA (patinho, cebola, salsinha)",
                "SALADA DE REPOLHO, TOMATE E CENOURA"
            ],
            ingredientes: [
                { nome: "Arroz", quantidadePadrao: 5, unidade: "kg/pct" },
                { nome: "Feijão", quantidadePadrao: 3, unidade: "kg/pct" },
                { nome: "Óleo", quantidadePadrao: 2, unidade: "un" },
                { nome: "Frango", quantidadePadrao: 6, unidade: "kg" },
                { nome: "Cebola", quantidadePadrao: 2, unidade: "kg" },
                { nome: "Repolho", quantidadePadrao: 3, unidade: "un" },
                { nome: "Tomate", quantidadePadrao: 3, unidade: "kg" },
                { nome: "Cenoura", quantidadePadrao: 2, unidade: "kg" }
            ]
        },
        {
            nome: "Quarta", data: "23/set",
            itens: [
                "ARROZ",
                "FEIJOADA (feijão preto, carne suína e cebolinha)<sup>1</sup>",
                "FAROFA TEMPERADA (farinha de mandioca e cebola)",
                "LIMÃOGRETE (tomate, cebola, salsinha e limão)",
                "LARANJA"
            ],
            ingredientes: [
                { nome: "Arroz", quantidadePadrao: 5, unidade: "kg/pct" },
                { nome: "Feijão", quantidadePadrao: 4, unidade: "kg/pct" },
                { nome: "Farinha", quantidadePadrao: 3, unidade: "kg/pct" },
                { nome: "Carne Suína", quantidadePadrao: 5, unidade: "kg" },
                { nome: "Óleo", quantidadePadrao: 2, unidade: "un" },
                { nome: "Tomate", quantidadePadrao: 3, unidade: "kg" },
                { nome: "Cebola", quantidadePadrao: 2, unidade: "kg" },
                { nome: "Laranja", quantidadePadrao: 30, unidade: "un" }
            ]
        },
        {
            nome: "Quinta", data: "24/set",
            itens: [
                "ARROZ COM CENOURA E FEIJÃO CARIOCA",
                "OVOS MEXIDOS (ovos, cebola, salsinha e cebolinha)",
                "SALADA DE ALFACE, TOMATE E CEBOLA (temperada com limão)",
                "BANANA"
            ],
            ingredientes: [
                { nome: "Arroz", quantidadePadrao: 5, unidade: "kg/pct" },
                { nome: "Feijão", quantidadePadrao: 3, unidade: "kg/pct" },
                { nome: "Óleo", quantidadePadrao: 2, unidade: "un" },
                { nome: "Ovos", quantidadePadrao: 30, unidade: "un" },
                { nome: "Cenoura", quantidadePadrao: 2, unidade: "kg" },
                { nome: "Tomate", quantidadePadrao: 3, unidade: "kg" },
                { nome: "Cebola", quantidadePadrao: 2, unidade: "kg" },
                { nome: "Banana", quantidadePadrao: 35, unidade: "un" }
            ]
        },
        {
            nome: "Sexta", data: "25/set",
            itens: [
                "MACARRÃO AO MOLHO DE TOMATE (extrato de tomate, cebola, salsinha)",
                "FRANGO ASSADO (sassami)",
                "SALADA DE ACELGA E CENOURA",
                "*COUVE -FLOR*"
            ],
            ingredientes: [
                { nome: "Macarrão", quantidadePadrao: 6, unidade: "kg/pct" },
                { nome: "Frango", quantidadePadrao: 6, unidade: "kg" },
                { nome: "Molho de Tomate", quantidadePadrao: 4, unidade: "un" },
                { nome: "Óleo", quantidadePadrao: 2, unidade: "un" },
                { nome: "Cebola", quantidadePadrao: 2, unidade: "kg" },
                { nome: "Cenoura", quantidadePadrao: 2, unidade: "kg" }
            ]
        }
    ],
    nutrientesCabecalho: ["Kcal", "Prot (g)", "Prot (%)", "Lip (g)", "Lip (%)", "CHO (g)", "CHO (%)"],
    nutrientes: [
        { nivel: "ENSINO MÉDIO",                   valores: ["522", "26", "20", "7", "17%", "81", "61%"] },
        { nivel: "EJA - 19 a 30 anos",             valores: ["522", "26", "20", "7", "17%", "81", "61%"] },
        { nivel: "EJA - 31 a 60 anos",             valores: ["522", "26", "20", "7", "17%", "81", "61%"] },
        { nivel: "ENSINO FUNDAMENTAL ANOS FINAIS", valores: ["409", "21", "21%", "6", "17%", "52", "60%"] },
        { nivel: "ENSINO FUNDAMENTAL - ANOS INICIAIS", valores: ["409", "21", "21%", "6", "17%", "52", "60%"] }
    ],
    notas: [
        "1. O feijão preto separadamente da carne suína, de acordo com a aceitação dos estudantes.",
        "2. Os produtos congelados poderão ser substituídos conforme a disponibilidade na Unidade Escolar.",
        "3. As receitas das preparações constam nas FTPs.",
        "4. Hortifruti (frutas, verduras e legumes) deverão ser servidos de acordo com o cardápio, abastecimento e amadurecimento dos produtos. O cardápio do dia poderá ser complementado com outras hortaliças disponíveis."
    ]
};

/* =====================================================================
   GERENCIAMENTO DE DADOS E SINCRONIZAÇÃO (USUÁRIO ↔ ADMINISTRADOR)
   ===================================================================== */

// Obter cardápio persistido ou o padrão original
function getCardapioData() {
    try {
        const salvo = localStorage.getItem("cardapioData");
        if (salvo) {
            const parsed = JSON.parse(salvo);
            if (parsed && Array.isArray(parsed.dias) && parsed.dias.length > 0) {
                return parsed;
            }
        }
    } catch (e) {
        console.error("Erro ao ler cardapioData:", e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_CARDAPIO));
}

var CARDAPIO = getCardapioData();

// Salvar cardápio personalizado com log de auditoria e sincronização
function saveCardapioData(novoCardapio, motivoLog) {
    CARDAPIO = novoCardapio;
    localStorage.setItem("cardapioData", JSON.stringify(CARDAPIO));
    const responsavel = typeof getLoggedInName === "function" ? getLoggedInName() : "Usuário";
    const agoraStr = new Date().toLocaleDateString("pt-BR") + " às " + new Date().toLocaleTimeString("pt-BR");
    if (motivoLog) {
        if (typeof registrarLog === "function") {
            registrarLog("alteracao", `${responsavel} alterou o Cardápio da Semana: ${motivoLog}`);
        }
        if (typeof saveCardapioUltimaAlteracao === "function") {
            saveCardapioUltimaAlteracao({
                usuario: responsavel,
                dataHora: agoraStr,
                tipo: "cardapio",
                resumo: motivoLog
            });
        }
    }
    atualizarTelasCardapioAbertas();
    atualizarBadgesMenu();
}

// Armazenamento das quantidades que o usuário/admin altera para cada dia
var diaQuantidades = {};
var diaQuantidadesMeta = {};

function carregarQuantidadesStorage() {
    try {
        diaQuantidades = typeof getCardapioQuantidades === "function" 
            ? getCardapioQuantidades() 
            : (JSON.parse(localStorage.getItem("cardapioDiaQuantidades")) || {});
        diaQuantidadesMeta = typeof getCardapioQuantidadesMeta === "function" 
            ? getCardapioQuantidadesMeta() 
            : (JSON.parse(localStorage.getItem("cardapioQuantidadesMeta")) || {});
    } catch (e) {
        diaQuantidades = {};
        diaQuantidadesMeta = {};
    }
}

function salvarQuantidadesStorage() {
    if (typeof saveCardapioQuantidades === "function") {
        saveCardapioQuantidades(diaQuantidades, diaQuantidadesMeta);
    } else {
        localStorage.setItem("cardapioDiaQuantidades", JSON.stringify(diaQuantidades));
        localStorage.setItem("cardapioQuantidadesMeta", JSON.stringify(diaQuantidadesMeta));
    }
}

// Carregar quantidades imediatamente
carregarQuantidadesStorage();

/* ---------- Debounce para registrar logs de alteração sem poluir ---------- */
let logTimerQtd = null;
function registrarLogDebounced(chave, diaNome, ingNome, valor, unidade, padrao) {
    if (logTimerQtd) clearTimeout(logTimerQtd);
    logTimerQtd = setTimeout(() => {
        const responsavel = typeof getLoggedInName === "function" ? getLoggedInName() : "Usuário";
        const agoraStr = new Date().toLocaleDateString("pt-BR") + " às " + new Date().toLocaleTimeString("pt-BR");
        const diffMsg = valor !== padrao ? ` (Padrão: ${padrao})` : " (Restaurado ao padrão)";
        const resumo = `Ajustou "${ingNome}" para ${valor} ${unidade} em ${diaNome}${diffMsg}`;
        if (typeof registrarLog === "function") {
            registrarLog("alteracao", `${responsavel} alterou a quantidade de "${ingNome}" para ${valor} ${unidade} no Cardápio de ${diaNome}${diffMsg}`);
        }
        if (typeof saveCardapioUltimaAlteracao === "function") {
            saveCardapioUltimaAlteracao({
                usuario: responsavel,
                dataHora: agoraStr,
                tipo: "quantidade",
                dia: diaNome,
                item: ingNome,
                valor: valor,
                resumo: resumo
            });
        }
        atualizarBadgesMenu();
    }, 600);
}

/* ---------- Localizar produto no estoque pelo nome ---------- */
function encontrarProdutoEstoque(nome) {
    if (typeof getProducts !== "function") return null;
    const products = getProducts();
    const nomeNorm = nome.toLowerCase().trim();
    // Busca exata
    let prod = products.find(p => p.nome.toLowerCase().trim() === nomeNorm);
    if (prod) return prod;
    // Busca por inclusão
    prod = products.find(p => p.nome.toLowerCase().includes(nomeNorm) || nomeNorm.includes(p.nome.toLowerCase()));
    return prod || null;
}

/* ---------- Obter quantidade ajustada para o item ---------- */
function getQtdParaUsar(diaNome, ingNome, padrao) {
    const chave = `${diaNome}-${ingNome}`;
    if (diaQuantidades[chave] !== undefined) {
        return diaQuantidades[chave];
    }
    return padrao;
}

/* ---------- Atualizar visual do badge de ajuste do item ---------- */
function atualizarBadgeItemAjustado(diaNome, ingNome, qtd, padrao, unidade, responsavel) {
    const idSafe = `${diaNome}-${ingNome.replace(/\s+/g, '_')}`;
    const badgeEl = document.getElementById(`badge-ajuste-${idSafe}`);
    if (!badgeEl) return;

    if (qtd !== padrao) {
        const resp = responsavel || (diaQuantidadesMeta[`${diaNome}-${ingNome}`] && diaQuantidadesMeta[`${diaNome}-${ingNome}`].usuario) || "Usuário";
        badgeEl.innerHTML = `
            <span class="item-badge-ajuste">
                ✏️ Ajustado por <strong>${resp}</strong> (Padrão: ${padrao} ${unidade})
                <button type="button" class="btn-item-reverter" onclick="redefinirItemDiaPadrao('${diaNome}', '${ingNome}')" title="Restaurar quantidade padrão original (${padrao} ${unidade})">↺</button>
            </span>
        `;
    } else {
        badgeEl.innerHTML = "";
    }
}

/* ---------- Reverter quantidade de um item individual ao padrão ---------- */
function redefinirItemDiaPadrao(diaNome, ingNome) {
    const dia = CARDAPIO.dias.find(d => d.nome.toLowerCase() === diaNome.toLowerCase());
    if (!dia) return;
    const ing = dia.ingredientes.find(i => i.nome === ingNome);
    if (!ing) return;

    const chave = `${dia.nome}-${ing.nome}`;
    delete diaQuantidades[chave];
    delete diaQuantidadesMeta[chave];
    salvarQuantidadesStorage();

    const padrao = ing.quantidadePadrao;
    const idSafe = `input-qty-${dia.nome}-${ing.nome.replace(/\s+/g, '_')}`;
    const el = document.getElementById(idSafe);
    if (el) el.value = padrao;

    atualizarAlertaEstoqueItem(dia.nome, ing.nome, padrao);
    atualizarBadgeItemAjustado(dia.nome, ing.nome, padrao, ing.quantidadePadrao, ing.unidade, "");

    const responsavel = typeof getLoggedInName === "function" ? getLoggedInName() : "Usuário";
    const agoraStr = new Date().toLocaleDateString("pt-BR") + " às " + new Date().toLocaleTimeString("pt-BR");
    if (typeof registrarLog === "function") {
        registrarLog("alteracao", `${responsavel} restaurou a quantidade padrão de "${ing.nome}" (${padrao} ${ing.unidade}) no Cardápio de ${dia.nome}`);
    }
    if (typeof saveCardapioUltimaAlteracao === "function") {
        saveCardapioUltimaAlteracao({
            usuario: responsavel,
            dataHora: agoraStr,
            tipo: "restauracao-item",
            dia: dia.nome,
            item: ing.nome,
            resumo: `Restaurou "${ing.nome}" ao padrão (${padrao} ${ing.unidade})`
        });
    }
    atualizarBadgesMenu();
}

/* ---------- Restaurar TODAS as quantidades alteradas aos padrões ---------- */
function restaurarTodosPadroes() {
    if (!confirm("Deseja restaurar TODAS as quantidades do Cardápio para os valores padrões oficiais?")) return;
    diaQuantidades = {};
    diaQuantidadesMeta = {};
    salvarQuantidadesStorage();

    const responsavel = typeof getLoggedInName === "function" ? getLoggedInName() : "Administrador";
    const agoraStr = new Date().toLocaleDateString("pt-BR") + " às " + new Date().toLocaleTimeString("pt-BR");
    if (typeof registrarLog === "function") {
        registrarLog("alteracao", `${responsavel} restaurou todas as quantidades do Cardápio da Semana para o padrão`);
    }
    if (typeof saveCardapioUltimaAlteracao === "function") {
        saveCardapioUltimaAlteracao({
            usuario: responsavel,
            dataHora: agoraStr,
            tipo: "restauracao-geral",
            resumo: "Todas as quantidades foram restauradas para o padrão oficial"
        });
    }

    fecharItensDia();
    const corpo = document.querySelector(".cardapio-corpo");
    if (corpo) corpo.innerHTML = montarTabelaCardapio();
    atualizarBadgesMenu();
    if (typeof showToast === "function") {
        showToast("↺ Cardápio restaurado para as quantidades padrão!");
    }
}

/* ---------- Restaurar TODO o Cardápio (pratos e ingredientes) ao padrão SEDUC-SP ---------- */
function restaurarTodoCardapioOficial() {
    if (!confirm("Deseja restaurar TODO o Cardápio (pratos, itens e quantidades) para a versão oficial do Estado (SEDUC-SP)?")) return;
    CARDAPIO = JSON.parse(JSON.stringify(DEFAULT_CARDAPIO));
    localStorage.removeItem("cardapioData");
    diaQuantidades = {};
    diaQuantidadesMeta = {};
    salvarQuantidadesStorage();

    const responsavel = typeof getLoggedInName === "function" ? getLoggedInName() : "Administrador";
    const agoraStr = new Date().toLocaleDateString("pt-BR") + " às " + new Date().toLocaleTimeString("pt-BR");
    if (typeof registrarLog === "function") {
        registrarLog("alteracao", `${responsavel} restaurou todo o Cardápio (pratos e ingredientes) para o padrão oficial SEDUC-SP`);
    }
    if (typeof saveCardapioUltimaAlteracao === "function") {
        saveCardapioUltimaAlteracao({
            usuario: responsavel,
            dataHora: agoraStr,
            tipo: "restauracao-completa",
            resumo: "Cardápio completo restaurado para o padrão oficial SEDUC-SP"
        });
    }

    fecharItensDia();
    const corpo = document.querySelector(".cardapio-corpo");
    if (corpo) corpo.innerHTML = montarTabelaCardapio();
    atualizarBadgesMenu();
    if (typeof showToast === "function") {
        showToast("↺ Cardápio oficial SEDUC-SP restaurado!");
    }
}

/* ---------- Ajustar quantidade via botões (−) e (+) ---------- */
function ajustarQtdItemDia(diaNome, ingNome, delta) {
    const dia = CARDAPIO.dias.find(d => d.nome.toLowerCase() === diaNome.toLowerCase());
    if (!dia) return;
    const ing = dia.ingredientes.find(i => i.nome === ingNome);
    if (!ing) return;

    const chave = `${dia.nome}-${ing.nome}`;
    const atual = getQtdParaUsar(dia.nome, ing.nome, ing.quantidadePadrao);
    const novo = Math.max(0, atual + delta);
    diaQuantidades[chave] = novo;

    const responsavel = typeof getLoggedInName === "function" ? getLoggedInName() : "Usuário";
    const agoraStr = new Date().toLocaleDateString("pt-BR") + " às " + new Date().toLocaleTimeString("pt-BR");
    diaQuantidadesMeta[chave] = {
        usuario: responsavel,
        dataHora: agoraStr,
        valor: novo,
        padrao: ing.quantidadePadrao
    };

    salvarQuantidadesStorage();

    // Atualiza o input diretamente se estiver na tela
    const idSafe = `input-qty-${dia.nome}-${ing.nome.replace(/\s+/g, '_')}`;
    const el = document.getElementById(idSafe);
    if (el) el.value = novo;

    atualizarAlertaEstoqueItem(dia.nome, ing.nome, novo);
    atualizarBadgeItemAjustado(dia.nome, ing.nome, novo, ing.quantidadePadrao, ing.unidade, responsavel);
    registrarLogDebounced(chave, dia.nome, ing.nome, novo, ing.unidade, ing.quantidadePadrao);
}

/* ---------- Definir quantidade diretamente via input ---------- */
function definirQtdItemDia(diaNome, ingNome, valor) {
    const dia = CARDAPIO.dias.find(d => d.nome.toLowerCase() === diaNome.toLowerCase());
    if (!dia) return;
    const ing = dia.ingredientes.find(i => i.nome === ingNome);
    if (!ing) return;

    let num = parseInt(valor, 10);
    if (isNaN(num) || num < 0) num = 0;

    const chave = `${dia.nome}-${ing.nome}`;
    diaQuantidades[chave] = num;

    const responsavel = typeof getLoggedInName === "function" ? getLoggedInName() : "Usuário";
    const agoraStr = new Date().toLocaleDateString("pt-BR") + " às " + new Date().toLocaleTimeString("pt-BR");
    diaQuantidadesMeta[chave] = {
        usuario: responsavel,
        dataHora: agoraStr,
        valor: num,
        padrao: ing.quantidadePadrao
    };

    salvarQuantidadesStorage();

    const idSafe = `input-qty-${dia.nome}-${ing.nome.replace(/\s+/g, '_')}`;
    const el = document.getElementById(idSafe);
    if (el) el.value = num;

    atualizarAlertaEstoqueItem(dia.nome, ing.nome, num);
    atualizarBadgeItemAjustado(dia.nome, ing.nome, num, ing.quantidadePadrao, ing.unidade, responsavel);
    registrarLogDebounced(chave, dia.nome, ing.nome, num, ing.unidade, ing.quantidadePadrao);
}

/* ---------- Atualizar visual do card quando estoque for insuficiente ---------- */
function atualizarAlertaEstoqueItem(diaNome, ingNome, qtd) {
    const idCard = `card-item-${diaNome}-${ingNome.replace(/\s+/g, '_')}`;
    const card = document.getElementById(idCard);
    if (!card) return;

    const prod = encontrarProdutoEstoque(ingNome);
    const estoque = prod ? prod.quantidade : 0;

    if (qtd > estoque) {
        card.classList.add("estoque-insuficiente");
    } else {
        card.classList.remove("estoque-insuficiente");
    }
}

/* ---------- Editor de Pratos e Ingredientes do Dia ---------- */
function abrirEditorPratosDia(diaNome) {
    const dia = CARDAPIO.dias.find(d => d.nome.toLowerCase() === diaNome.toLowerCase());
    if (!dia) return;

    let painel = document.getElementById(`editorPratosPainel-${dia.nome}`);
    if (painel) {
        painel.remove();
        return;
    }

    const containerAlvo = document.getElementById("diaPratosCardContainer");
    if (!containerAlvo) return;

    painel = document.createElement("div");
    painel.id = `editorPratosPainel-${dia.nome}`;
    painel.className = "editor-pratos-painel";

    const pratosTexto = dia.itens.map(i => i.replace(/<[^>]*>?/gm, '')).join("\n");
    const prods = typeof getProducts === "function" ? getProducts() : [];
    const datalistOptions = prods.map(p => `<option value="${p.nome}"></option>`).join("");

    painel.innerHTML = `
        <h4>✏️ Editar Pratos e Ingredientes de ${dia.nome}-feira</h4>
        <p>Altere os pratos e os ingredientes previstos para este dia. O Administrador e o Usuário verão as alterações conectadas em tempo real.</p>
        
        <label style="font-weight:700;font-size:12px;display:block;margin-bottom:4px;color:#12305c;">🍽️ Pratos do Dia (um por linha):</label>
        <textarea id="editPratosTexto-${dia.nome}" class="editor-pratos-textarea" rows="3">${pratosTexto}</textarea>

        <label style="font-weight:700;font-size:12px;display:block;margin-bottom:6px;color:#12305c;">📦 Ingredientes deste dia:</label>
        <div class="editor-ingredientes-lista" id="editorIngredientesLista-${dia.nome}">
            ${dia.ingredientes.map((ing, idx) => `
                <div class="editor-ing-item" id="editor-ing-row-${idx}">
                    <div>
                        <span class="editor-ing-nome">${ing.nome}</span>
                        <span class="editor-ing-meta">• Qtd padrão: ${ing.quantidadePadrao} ${ing.unidade}</span>
                    </div>
                    <button type="button" class="btn-remove-ing" onclick="removerIngredienteDoDia('${dia.nome}', ${idx})" title="Remover ingrediente deste dia">🗑️ Remover</button>
                </div>
            `).join("")}
        </div>

        <div style="background:#edf2f7;padding:10px 12px;border-radius:10px;margin-bottom:14px;">
            <span style="font-weight:700;font-size:11.5px;color:#2d3748;display:block;margin-bottom:6px;">➕ Adicionar outro ingrediente:</span>
            <div class="editor-add-ing-grid">
                <input type="text" id="addIngNome-${dia.nome}" list="prodsDisponiveisList" class="editor-add-input" placeholder="Nome do produto">
                <datalist id="prodsDisponiveisList">${datalistOptions}</datalist>
                <input type="number" min="1" id="addIngQtd-${dia.nome}" class="editor-add-qty" placeholder="Qtd" value="3">
                <input type="text" id="addIngUn-${dia.nome}" class="editor-add-un" placeholder="Unid." value="kg">
                <button type="button" class="btn-add-ing" onclick="adicionarIngredienteAoDia('${dia.nome}')">+ Adicionar</button>
            </div>
        </div>

        <div class="editor-acoes-botoes">
            <button type="button" class="btn-editor-restaurar-dia" onclick="restaurarPratosDiaOriginal('${dia.nome}')">↺ Restaurar Originais</button>
            <button type="button" class="btn-editor-cancelar" onclick="fecharEditorPratosDia('${dia.nome}')">Cancelar</button>
            <button type="button" class="btn-editor-salvar" onclick="salvarEdicaoPratosDia('${dia.nome}')">💾 Salvar Alterações</button>
        </div>
    `;

    containerAlvo.after(painel);
    painel.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function fecharEditorPratosDia(diaNome) {
    const painel = document.getElementById(`editorPratosPainel-${diaNome}`);
    if (painel) painel.remove();
}

function adicionarIngredienteAoDia(diaNome) {
    const nomeEl = document.getElementById(`addIngNome-${diaNome}`);
    const qtdEl = document.getElementById(`addIngQtd-${diaNome}`);
    const unEl = document.getElementById(`addIngUn-${diaNome}`);

    const nome = nomeEl ? nomeEl.value.trim() : "";
    let qtd = qtdEl ? parseInt(qtdEl.value, 10) : 1;
    const un = unEl ? unEl.value.trim() : "kg";

    if (!nome) {
        alert("Digite o nome do ingrediente.");
        return;
    }
    if (isNaN(qtd) || qtd <= 0) qtd = 1;

    const dia = CARDAPIO.dias.find(d => d.nome.toLowerCase() === diaNome.toLowerCase());
    if (!dia) return;

    if (dia.ingredientes.some(i => i.nome.toLowerCase() === nome.toLowerCase())) {
        alert(`O ingrediente "${nome}" já consta na lista deste dia.`);
        return;
    }

    dia.ingredientes.push({
        nome: nome,
        quantidadePadrao: qtd,
        unidade: un || "un"
    });

    fecharEditorPratosDia(diaNome);
    salvarEdicaoPratosDia(diaNome, true);
    abrirEditorPratosDia(diaNome);
}

function removerIngredienteDoDia(diaNome, idx) {
    const dia = CARDAPIO.dias.find(d => d.nome.toLowerCase() === diaNome.toLowerCase());
    if (!dia) return;

    if (dia.ingredientes.length <= 1) {
        alert("O dia deve ter pelo menos um ingrediente.");
        return;
    }

    const removido = dia.ingredientes[idx];
    if (removido) {
        const chave = `${dia.nome}-${removido.nome}`;
        delete diaQuantidades[chave];
        delete diaQuantidadesMeta[chave];
        salvarQuantidadesStorage();
    }

    dia.ingredientes.splice(idx, 1);
    fecharEditorPratosDia(diaNome);
    salvarEdicaoPratosDia(diaNome, true);
    abrirEditorPratosDia(diaNome);
}

function restaurarPratosDiaOriginal(diaNome) {
    const diaOrig = DEFAULT_CARDAPIO.dias.find(d => d.nome.toLowerCase() === diaNome.toLowerCase());
    const diaIndex = CARDAPIO.dias.findIndex(d => d.nome.toLowerCase() === diaNome.toLowerCase());
    if (!diaOrig || diaIndex === -1) return;

    if (!confirm(`Restaurar os pratos e ingredientes de ${diaNome}-feira para o padrão oficial original?`)) return;

    CARDAPIO.dias[diaIndex] = JSON.parse(JSON.stringify(diaOrig));
    
    // Limpar quantidades customizadas para este dia
    Object.keys(diaQuantidades).forEach(k => {
        if (k.startsWith(`${diaOrig.nome}-`)) {
            delete diaQuantidades[k];
            delete diaQuantidadesMeta[k];
        }
    });
    salvarQuantidadesStorage();

    saveCardapioData(CARDAPIO, `Restaurou pratos e ingredientes de ${diaOrig.nome}-feira para o padrão`);
    fecharEditorPratosDia(diaNome);
    abrirItensDia(diaNome);
    if (typeof showToast === "function") {
        showToast(`↺ Pratos de ${diaOrig.nome} restaurados ao padrão!`);
    }
}

function salvarEdicaoPratosDia(diaNome, silencioso = false) {
    const dia = CARDAPIO.dias.find(d => d.nome.toLowerCase() === diaNome.toLowerCase());
    if (!dia) return;

    const txtEl = document.getElementById(`editPratosTexto-${dia.nome}`);
    if (txtEl) {
        const linhas = txtEl.value.split("\n").map(l => l.trim()).filter(l => l.length > 0);
        if (linhas.length > 0) {
            dia.itens = linhas;
        }
    }

    saveCardapioData(CARDAPIO, `Alterou pratos e lista de ingredientes de ${dia.nome}-feira`);
    fecharEditorPratosDia(diaNome);
    abrirItensDia(diaNome);

    if (!silencioso && typeof showToast === "function") {
        showToast(`✅ Pratos e ingredientes de ${dia.nome} atualizados e sincronizados!`);
    }
}

/* ---------- Atualizar telas abertas em tempo real ---------- */
function atualizarTelasCardapioAbertas() {
    const corpo = document.querySelector(".cardapio-corpo");
    const cardapioOverlay = document.getElementById("cardapioOverlay");
    if (corpo && cardapioOverlay && cardapioOverlay.classList.contains("aberto")) {
        corpo.innerHTML = montarTabelaCardapio();
    }

    const diaOverlay = document.getElementById("diaItensOverlay");
    if (diaOverlay && diaOverlay.classList.contains("aberto")) {
        const abaAtiva = diaOverlay.querySelector(".dia-aba-btn.ativa");
        if (abaAtiva) {
            const match = abaAtiva.textContent.trim().split(" ")[0];
            if (match) abrirItensDia(match);
        }
    }
}

/* ---------- Atualizar badges informativos no Menu Principal ---------- */
function atualizarBadgesMenu() {
    const badgeAdmin = document.getElementById("badgeCardapioAdmin");
    const badgeUsuario = document.getElementById("badgeCardapioUsuario");
    const ultimaAlt = typeof getCardapioUltimaAlteracao === "function" ? getCardapioUltimaAlteracao() : null;
    const baixas = typeof getBaixasCardapio === "function" ? getBaixasCardapio() : [];
    const baixasUsuario = baixas.filter(b => b.usuario === "Usuário");

    // Verificar se há itens com quantidades alteradas em relação ao padrão
    let totalItensAjustados = 0;
    CARDAPIO.dias.forEach(d => {
        d.ingredientes.forEach(ing => {
            const chave = `${d.nome}-${ing.nome}`;
            if (diaQuantidades[chave] !== undefined && diaQuantidades[chave] !== ing.quantidadePadrao) {
                totalItensAjustados++;
            }
        });
    });

    if (badgeAdmin) {
        if (ultimaAlt && ultimaAlt.usuario === "Usuário") {
            badgeAdmin.style.display = "inline-flex";
            badgeAdmin.className = "cv-cardapio-status-badge badge-alterado";
            badgeAdmin.innerHTML = `✏️ Alterado pelo Usuário (${totalItensAjustados > 0 ? totalItensAjustados + ' ajuste(s)' : 'personalizado'})`;
        } else if (totalItensAjustados > 0) {
            badgeAdmin.style.display = "inline-flex";
            badgeAdmin.className = "cv-cardapio-status-badge badge-alterado";
            badgeAdmin.innerHTML = `✏️ ${totalItensAjustados} ajuste(s) do Usuário`;
        } else if (baixasUsuario.length > 0) {
            badgeAdmin.style.display = "inline-flex";
            badgeAdmin.className = "cv-cardapio-status-badge badge-baixa";
            badgeAdmin.innerHTML = `✅ ${baixasUsuario.length} Baixa(s) do Usuário`;
        } else {
            badgeAdmin.style.display = "none";
        }
    }

    if (badgeUsuario) {
        badgeUsuario.style.display = "inline-flex";
        badgeUsuario.className = "cv-cardapio-status-badge badge-conectado";
        badgeUsuario.innerHTML = "🟢 Conectado ao Administrador";
    }
}

/* ---------- Monta o HTML da tabela ---------- */
function montarTabelaCardapio() {
    const c = CARDAPIO;

    const gov = c.cabecalhoGoverno.map(l => `<div>${l}</div>`).join("");

    // Calcular estatísticas de sincronização e alterações
    const ultimaAlt = typeof getCardapioUltimaAlteracao === "function" ? getCardapioUltimaAlteracao() : null;
    const tipoLogin = typeof getLoggedInType === "function" ? getLoggedInType() : "";
    let totalItensAjustados = 0;
    c.dias.forEach(d => {
        d.ingredientes.forEach(ing => {
            const chave = `${d.nome}-${ing.nome}`;
            if (diaQuantidades[chave] !== undefined && diaQuantidades[chave] !== ing.quantidadePadrao) {
                totalItensAjustados++;
            }
        });
    });

    // Banner informativo de sincronização
    let bannerSyncHtml = "";
    if (ultimaAlt) {
        const badgeClasse = ultimaAlt.usuario === "Usuário" ? "sync-usuario" : "sync-admin";
        const iconPerfil = ultimaAlt.usuario === "Usuário" ? "👤" : "🛡️";
        bannerSyncHtml = `
            <div class="cardapio-banner-sync ${badgeClasse}">
                <div class="sync-info-lado">
                    <span class="sync-icon">🔄</span>
                    <div class="sync-textos">
                        <strong>Sincronização em Tempo Real Ativa (Usuário ↔ Administrador)</strong>
                        <span>Última alteração feita por <b>${iconPerfil} ${ultimaAlt.usuario}</b> em ${ultimaAlt.dataHora}: <em>${ultimaAlt.resumo || 'Ajustes no cardápio'}</em></span>
                    </div>
                </div>
                <div class="sync-acoes-lado">
                    ${totalItensAjustados > 0 ? `
                        <button type="button" class="btn-sync-reset" onclick="restaurarTodosPadroes()" title="Restaurar todas as quantidades para o padrão oficial">
                            ↺ Restaurar Padrões (${totalItensAjustados})
                        </button>
                    ` : ''}
                </div>
            </div>
        `;
    } else {
        bannerSyncHtml = `
            <div class="cardapio-banner-sync sync-neutro">
                <div class="sync-info-lado">
                    <span class="sync-icon">🔄</span>
                    <div class="sync-textos">
                        <strong>Cardápio Conectado</strong>
                        <span>Todas as alterações feitas pelo <b>Usuário</b> ou pelo <b>Administrador</b> são salvas e sincronizadas automaticamente entre os perfis.</span>
                    </div>
                </div>
            </div>
        `;
    }

    // Botões de atalho rápido para selecionar o dia
    const atalhosDias = c.dias.map(d => {
        const b = typeof getUltimaBaixaDoDia === "function" ? getUltimaBaixaDoDia(d.nome) : null;
        let ajustados = 0;
        d.ingredientes.forEach(ing => {
            const k = `${d.nome}-${ing.nome}`;
            if (diaQuantidades[k] !== undefined && diaQuantidades[k] !== ing.quantidadePadrao) ajustados++;
        });
        const tagAjuste = ajustados > 0 ? ` <span style="font-size:11px;color:#c05621;font-weight:700;">(✏️${ajustados})</span>` : '';
        return `
            <button type="button" class="btn-atalho-dia ${b ? 'baixado' : ''}" onclick="abrirItensDia('${d.nome}')">
                📅 ${d.nome} (${d.data})${tagAjuste} ${b ? '<span class="atalho-check">✓</span>' : ''}
            </button>`;
    }).join("");

    const thDias = c.dias.map(d => `
        <th class="cab dia-cab-clicavel" onclick="abrirItensDia('${d.nome}')" title="Clique para ver os itens de ${d.nome} e dar baixa">
            <div class="th-dia-box">
                <span>${d.nome}</span>
                <span class="th-dia-icon">📋</span>
            </div>
        </th>`).join("");

    const thDatas = c.dias.map(d => `
        <th class="cab data dia-cab-clicavel" onclick="abrirItensDia('${d.nome}')" title="Clique para ver os itens de ${d.nome} e dar baixa">
            ${d.data}
        </th>`).join("");

    const tdDias = c.dias.map(d => {
        const b = typeof getUltimaBaixaDoDia === "function" ? getUltimaBaixaDoDia(d.nome) : null;
        let ajustados = 0;
        d.ingredientes.forEach(ing => {
            const k = `${d.nome}-${ing.nome}`;
            if (diaQuantidades[k] !== undefined && diaQuantidades[k] !== ing.quantidadePadrao) ajustados++;
        });
        const badgeAjuste = ajustados > 0 
            ? `<div class="dia-badge-clique" style="background:#fffaf0;color:#c05621;border-color:#fbd38d;">✏️ ${ajustados} item(ns) ajustado(s)</div>` 
            : '';
        const badgeBaixa = b 
            ? `<div class="dia-badge-baixa">✅ Baixa (${b.usuario})</div>`
            : (badgeAjuste || `<div class="dia-badge-clique">👆 Clique p/ itens</div>`);

        return `
        <td class="dia dia-celula-clicavel" onclick="abrirItensDia('${d.nome}')" title="Clique para ver os itens de ${d.nome} e dar baixa">
            <div class="dia-conteudo">
                <div class="dia-itens-texto">
                    ${d.itens.map(i => `<p>${i}</p>`).join("")}
                </div>
                <div class="dia-rodape-celula">
                    ${badgeBaixa}
                    <button type="button" class="btn-dia-acao" onclick="event.stopPropagation(); abrirItensDia('${d.nome}')">
                        📦 Itens / Baixa
                    </button>
                </div>
            </div>
        </td>`;
    }).join("");

    const blocosNutri = c.nutrientes.map(n => `
        <div class="nutri-titulo">${n.nivel}</div>
        <table class="nutri-tabela">
            <tr>${c.nutrientesCabecalho.map(h => `<th>${h}</th>`).join("")}</tr>
            <tr>${n.valores.map(v => `<td>${v}</td>`).join("")}</tr>
        </table>`).join("");

    return `
    ${bannerSyncHtml}

    <div class="cardapio-banner-dica">
        <span class="dica-icon">💡</span>
        <span class="dica-txt">
            <strong>Dica de uso:</strong> Clique em qualquer dia abaixo (na coluna ou nos botões) para ver a <strong>quantidade de cada item para usar</strong>, dar <strong>baixa no estoque</strong> e <strong>imprimir o comprovante</strong>.
        </span>
    </div>

    <div class="cardapio-dias-atalhos">
        <span class="dias-atalhos-label">Dias da Semana:</span>
        <div class="dias-atalhos-botoes">
            ${atalhosDias}
        </div>
    </div>

    <div class="cardapio-folha">
        <div class="cardapio-gov">${gov}</div>
        <div class="cardapio-comunicado">${c.comunicado}</div>
        <div class="cardapio-titulo">${c.titulo}</div>

        <table class="cardapio-tabela">
            <colgroup>
                <col class="col-sem">
                <col class="col-periodo">
                <col><col><col><col><col>
            </colgroup>
            <thead>
                <tr>
                    <th class="cab">Sem</th>
                    <th class="cab">Cardápio</th>
                    ${thDias}
                </tr>
                <tr>
                    <th class="cab" colspan="2">Data</th>
                    ${thDatas}
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="semana" rowspan="2">${c.semana}</td>
                    <td class="periodo">
                        <b>${c.periodo.titulo}</b>
                        ${c.periodo.linhas.map(l => `<div>${l}</div>`).join("")}
                        <div class="noturno">${c.periodo.noturno}</div>
                    </td>
                    ${tdDias}
                </tr>
                <tr>
                    <td class="periodo-vazio"></td>
                    <td colspan="5" style="padding:0;border:none;">
                        ${blocosNutri}
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="cardapio-notas">
            ${c.notas.map(n => `<div>${n}</div>`).join("")}
        </div>
    </div>`;
}

/* ---------- Abre a lista de itens do dia com botões de baixa e impressão ---------- */
function abrirItensDia(diaNome) {
    const dia = CARDAPIO.dias.find(d => d.nome.toLowerCase() === diaNome.toLowerCase());
    if (!dia) return;

    let overlay = document.getElementById("diaItensOverlay");
    if (!overlay) {
        overlay = document.createElement("div");
        overlay.id = "diaItensOverlay";
        overlay.className = "dia-itens-overlay";
        overlay.setAttribute("role", "dialog");
        overlay.setAttribute("aria-modal", "true");
        document.body.appendChild(overlay);

        overlay.addEventListener("click", function(e) {
            if (e.target === overlay) fecharItensDia();
        });
    }

    const ultimaBaixa = typeof getUltimaBaixaDoDia === "function" ? getUltimaBaixaDoDia(dia.nome) : null;

    // Abas de dias
    const abasHtml = CARDAPIO.dias.map(d => {
        const isAtivo = d.nome.toLowerCase() === dia.nome.toLowerCase();
        const b = typeof getUltimaBaixaDoDia === "function" ? getUltimaBaixaDoDia(d.nome) : null;
        return `
            <button type="button" class="dia-aba-btn ${isAtivo ? 'ativa' : ''} ${b ? 'tem-baixa' : ''}" onclick="abrirItensDia('${d.nome}')">
                ${d.nome} (${d.data}) ${b ? '✓' : ''}
            </button>`;
    }).join("");

    // Linhas dos itens
    const itensHtml = dia.ingredientes.map(ing => {
        const prod = encontrarProdutoEstoque(ing.nome);
        const estoque = prod ? prod.quantidade : 0;
        const qtdParaUsar = getQtdParaUsar(dia.nome, ing.nome, ing.quantidadePadrao);
        const insuficiente = qtdParaUsar > estoque;
        const idSafe = `${dia.nome}-${ing.nome.replace(/\s+/g, '_')}`;
        const chave = `${dia.nome}-${ing.nome}`;
        const meta = diaQuantidadesMeta[chave];
        const isAjustado = diaQuantidades[chave] !== undefined && diaQuantidades[chave] !== ing.quantidadePadrao;
        const resp = meta ? meta.usuario : "Usuário";

        const badgeAjustadoHtml = isAjustado ? `
            <span class="item-badge-ajuste">
                ✏️ Ajustado por <strong>${resp}</strong> (Padrão: ${ing.quantidadePadrao} ${ing.unidade})
                <button type="button" class="btn-item-reverter" onclick="redefinirItemDiaPadrao('${dia.nome}', '${ing.nome}')" title="Restaurar quantidade padrão (${ing.quantidadePadrao} ${ing.unidade})">↺</button>
            </span>
        ` : '';

        return `
            <div class="item-card-linha ${insuficiente && qtdParaUsar > 0 ? 'estoque-insuficiente' : ''}" id="card-item-${idSafe}">
                <div class="item-card-info">
                    <span class="item-card-nome">${ing.nome}</span>
                    <span class="item-card-estoque-badge ${estoque > 0 ? 'em-estoque' : 'sem-estoque'}">
                        📦 Estoque atual: <strong>${estoque}</strong>
                    </span>
                    <div id="badge-ajuste-${idSafe}">${badgeAjustadoHtml}</div>
                </div>
                <div class="item-card-controle">
                    <button type="button" class="btn-qty-circ" onclick="ajustarQtdItemDia('${dia.nome}', '${ing.nome}', -1)" title="Diminuir quantidade">−</button>
                    <input type="number" min="0" class="input-qty-box" id="input-qty-${idSafe}" value="${qtdParaUsar}" onchange="definirQtdItemDia('${dia.nome}', '${ing.nome}', this.value)">
                    <button type="button" class="btn-qty-circ" onclick="ajustarQtdItemDia('${dia.nome}', '${ing.nome}', 1)" title="Aumentar quantidade">+</button>
                    <span class="item-unidade-txt">${ing.unidade}</span>
                </div>
            </div>`;
    }).join("");

    // Calcular itens ajustados neste dia
    const itensAjustadosDia = dia.ingredientes.filter(i => {
        const k = `${dia.nome}-${i.nome}`;
        return diaQuantidades[k] !== undefined && diaQuantidades[k] !== i.quantidadePadrao;
    }).length;

    // Mensagem de status
    let statusHtml = "";
    if (ultimaBaixa) {
        statusHtml = `
            <div class="dia-status-alerta status-sucesso">
                <span class="status-icone">✅</span>
                <div class="status-texto">
                    <strong>Baixa já registrada para este dia!</strong>
                    <span>Efetuada em ${ultimaBaixa.dataHora} por <b>${ultimaBaixa.usuario}</b> (Protocolo #${ultimaBaixa.id}). Sincronizado entre Usuário e Administrador. Você pode reimprimir o comprovante abaixo a qualquer momento ou registrar uma nova baixa se necessário.</span>
                </div>
            </div>
        `;
    } else if (itensAjustadosDia > 0) {
        statusHtml = `
            <div class="dia-status-alerta status-pendente" style="background:#fffaf0;border-color:#fbd38d;color:#7b341e;">
                <span class="status-icone">✏️</span>
                <div class="status-texto">
                    <strong>${itensAjustadosDia} ingrediente(s) com quantidade personalizada</strong>
                    <span>As quantidades ajustadas estão <b>sincronizadas em tempo real</b> com o Administrador. Clique em <strong>"Dar Baixa no Dia"</strong> para deduzir do estoque.</span>
                </div>
            </div>
        `;
    } else {
        statusHtml = `
            <div class="dia-status-alerta status-pendente">
                <span class="status-icone">⏳</span>
                <div class="status-texto">
                    <strong>Baixa pendente para ${dia.nome}-feira</strong>
                    <span>Confira a quantidade recomendada de cada ingrediente abaixo, ajuste se necessário e clique em <strong>"Dar Baixa no Dia"</strong> para deduzir do estoque.</span>
                </div>
            </div>
        `;
    }

    overlay.innerHTML = `
        <div class="dia-itens-modal">
            <div class="dia-itens-topo">
                <div class="dia-itens-titulo-area">
                    <div class="dia-itens-subtitulo">ALIMENTAÇÃO ESCOLAR • CORONEL VENÂNCIO</div>
                    <h3 class="dia-itens-titulo">Itens do Dia: <span>${dia.nome}-feira (${dia.data})</span></h3>
                </div>
                <button type="button" class="dia-itens-fechar" onclick="fecharItensDia()" aria-label="Fechar">&times;</button>
            </div>

            <div class="dia-abas-seletor">
                ${abasHtml}
            </div>

            <div class="dia-itens-corpo">
                <div id="diaPratosCardContainer">
                    <div class="dia-pratos-card">
                        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:8px;">
                            <span class="pratos-card-titulo" style="margin-bottom:0;">🍽️ Pratos programados para o dia:</span>
                            <button type="button" class="btn-editar-pratos-dia" onclick="abrirEditorPratosDia('${dia.nome}')">
                                ✏️ Editar Pratos / Ingredientes
                            </button>
                        </div>
                        <div class="pratos-card-lista">
                            ${dia.itens.map(p => `<span class="prato-pill">${p}</span>`).join("")}
                        </div>
                    </div>
                </div>

                ${statusHtml}

                <div class="itens-secao-header">
                    <div>
                        <h4 class="itens-secao-titulo">Quantidade de cada item para usar</h4>
                        <p class="itens-secao-desc">Ajuste com (−) e (+) a quantidade exata a ser utilizada na cantina/cozinha:</p>
                    </div>
                </div>

                <div class="itens-cards-grid" id="itensCardsGrid">
                    ${itensHtml}
                </div>

                <!-- AÇÕES ABAIXO DA LISTA: BOTÃO DE DAR BAIXA E BOTÃO DE IMPRIMIR -->
                <div class="dia-itens-rodape-acoes">
                    <button type="button" class="btn-acao-baixa" id="btnDarBaixaDia" onclick="executarBaixaDia('${dia.nome}')">
                        <span class="btn-icon">📉</span>
                        <span class="btn-txt">Dar Baixa no Dia</span>
                    </button>
                    <button type="button" class="btn-acao-imprimir" id="btnImprimirBaixa" onclick="imprimirBaixaDia('${dia.nome}')">
                        <span class="btn-icon">🖨️</span>
                        <span class="btn-txt">Imprimir Baixa</span>
                    </button>
                    <button type="button" class="btn-acao-voltar" onclick="fecharItensDia()">
                        <span class="btn-icon">←</span>
                        <span class="btn-txt">Voltar ao Cardápio</span>
                    </button>
                </div>
            </div>
        </div>
    `;

    overlay.classList.add("aberto");
}

/* ---------- Fechar a janela de itens do dia ---------- */
function fecharItensDia() {
    const overlay = document.getElementById("diaItensOverlay");
    if (overlay) overlay.classList.remove("aberto");

    // Atualiza a tabela do cardápio para refletir os badges de baixa atualizados
    const corpo = document.querySelector(".cardapio-corpo");
    if (corpo) {
        corpo.innerHTML = montarTabelaCardapio();
    }
}

/* ---------- Executa a baixa dos itens do dia no estoque ---------- */
function executarBaixaDia(diaNome) {
    const dia = CARDAPIO.dias.find(d => d.nome.toLowerCase() === diaNome.toLowerCase());
    if (!dia) return;

    if (typeof getProducts !== "function" || typeof updateProductQuantity !== "function") {
        alert("Sistema de estoque não inicializado.");
        return;
    }

    const products = getProducts();
    const itensParaBaixar = [];
    let erroEstoque = false;
    let totalQtd = 0;

    dia.ingredientes.forEach(ing => {
        const qtd = getQtdParaUsar(dia.nome, ing.nome, ing.quantidadePadrao);
        if (qtd > 0) {
            totalQtd += qtd;
            const prod = encontrarProdutoEstoque(ing.nome);
            if (!prod) {
                // Produto não existe formalmente no estoque: cria ou avisa
                itensParaBaixar.push({
                    ingrediente: ing,
                    produto: { id: null, nome: ing.nome, quantidade: 0 },
                    quantidadeBaixa: qtd,
                    estoqueAnterior: 0,
                    estoqueAtual: 0
                });
            } else if (qtd > prod.quantidade) {
                erroEstoque = true;
                alert(`⚠️ Estoque insuficiente para o item "${ing.nome}"!\n\nEstoque disponível: ${prod.quantidade}\nQuantidade solicitada: ${qtd}\n\nPor favor, ajuste a quantidade antes de dar baixa.`);
            } else {
                itensParaBaixar.push({
                    ingrediente: ing,
                    produto: prod,
                    quantidadeBaixa: qtd,
                    estoqueAnterior: prod.quantidade,
                    estoqueAtual: prod.quantidade - qtd
                });
            }
        }
    });

    if (erroEstoque) return;

    if (totalQtd === 0) {
        alert("Nenhum item com quantidade maior que zero para dar baixa.");
        return;
    }

    const msgConfirm = `Confirma a BAIXA dos itens do Cardápio de ${dia.nome}-feira (${dia.data})?\n\n` +
        itensParaBaixar.map(i => `• ${i.ingrediente.nome}: ${i.quantidadeBaixa} ${i.ingrediente.unidade}`).join("\n") +
        `\n\nTotal: ${totalQtd} unidades/volumes serão deduzidos do estoque.`;

    if (!confirm(msgConfirm)) return;

    // Deduzir os produtos do estoque e registrar movimentações e logs
    const agoraStr = new Date().toLocaleDateString("pt-BR") + " às " + new Date().toLocaleTimeString("pt-BR");
    const responsavel = typeof getLoggedInName === "function" ? getLoggedInName() : "Usuário";
    const itensRegistro = [];

    itensParaBaixar.forEach(item => {
        if (item.produto && item.produto.id !== null) {
            updateProductQuantity(item.produto.id, -item.quantidadeBaixa);
            if (typeof registrarMovimentacao === "function") {
                registrarMovimentacao("saida", item.produto.nome, item.quantidadeBaixa, `Baixa Cardápio - ${dia.nome} (${dia.data})`);
            }
            if (typeof registrarLog === "function") {
                registrarLog("saida", `Baixa de ${item.quantidadeBaixa} ${item.ingrediente.unidade} do produto "${item.produto.nome}" para o Cardápio de ${dia.nome} (${dia.data})`);
            }
        }
        itensRegistro.push({
            nome: item.ingrediente.nome,
            quantidade: item.quantidadeBaixa,
            unidade: item.ingrediente.unidade,
            estoqueAnterior: item.estoqueAnterior,
            estoqueAtual: item.estoqueAtual
        });
    });

    // Salvar registro oficial da baixa
    const baixas = typeof getBaixasCardapio === "function" ? getBaixasCardapio() : [];
    const novaBaixa = {
        id: Date.now(),
        diaNome: dia.nome,
        diaData: dia.data,
        semana: CARDAPIO.semana,
        mesAno: "Setembro / 2026",
        dataHora: agoraStr,
        dataIso: new Date().toISOString(),
        usuario: responsavel,
        pratos: dia.itens,
        itens: itensRegistro,
        totalVolumes: totalQtd
    };

    baixas.push(novaBaixa);
    if (typeof saveBaixasCardapio === "function") {
        saveBaixasCardapio(baixas);
    }

    if (typeof saveCardapioUltimaAlteracao === "function") {
        saveCardapioUltimaAlteracao({
            usuario: responsavel,
            dataHora: agoraStr,
            tipo: "baixa",
            dia: dia.nome,
            resumo: `Baixa de estoque realizada em ${dia.nome}-feira (${dia.data}) - ${totalQtd} volume(s)`
        });
    }
    atualizarBadgesMenu();

    if (typeof showToast === "function") {
        showToast(`✅ Baixa do dia ${dia.nome} realizada com sucesso!`);
    } else {
        alert(`✅ Baixa do dia ${dia.nome} realizada com sucesso!`);
    }

    // Recarregar a tela de itens do dia com os dados atualizados
    abrirItensDia(dia.nome);

    // Perguntar se deseja imprimir imediatamente
    setTimeout(() => {
        if (confirm("🎉 Baixa efetuada no estoque com sucesso!\n\nDeseja imprimir o comprovante da baixa agora?")) {
            imprimirBaixaDia(dia.nome);
        }
    }, 250);
}

/* ---------- Imprime o comprovante oficial da baixa do dia ---------- */
function imprimirBaixaDia(diaNome) {
    const dia = CARDAPIO.dias.find(d => d.nome.toLowerCase() === diaNome.toLowerCase());
    if (!dia) return;

    garantirElementoPrint();

    const ultimaBaixa = typeof getUltimaBaixaDoDia === "function" ? getUltimaBaixaDoDia(dia.nome) : null;
    const responsavel = typeof getLoggedInName === "function" ? getLoggedInName() : "Usuário";
    const agoraStr = new Date().toLocaleDateString("pt-BR") + " às " + new Date().toLocaleTimeString("pt-BR");

    let dadosBaixa;
    if (ultimaBaixa) {
        dadosBaixa = ultimaBaixa;
    } else {
        // Prévia / requisição baseada nas quantidades atualmente definidas
        const itensPrevia = dia.ingredientes.map(ing => {
            const prod = encontrarProdutoEstoque(ing.nome);
            const qtd = getQtdParaUsar(dia.nome, ing.nome, ing.quantidadePadrao);
            const estoque = prod ? prod.quantidade : 0;
            return {
                nome: ing.nome,
                quantidade: qtd,
                unidade: ing.unidade,
                estoqueAnterior: estoque,
                estoqueAtual: Math.max(0, estoque - qtd)
            };
        });
        const total = itensPrevia.reduce((acc, cur) => acc + cur.quantidade, 0);
        dadosBaixa = {
            id: Date.now(),
            diaNome: dia.nome,
            diaData: dia.data,
            semana: CARDAPIO.semana,
            mesAno: "Setembro / 2026",
            dataHora: agoraStr,
            usuario: responsavel,
            pratos: dia.itens,
            itens: itensPrevia,
            totalVolumes: total,
            isPrevia: true
        };
    }

    const containerPrint = document.getElementById("comprovanteBaixaPrint");
    if (!containerPrint) return;

    containerPrint.innerHTML = montarHTMLComprovante(dadosBaixa);

    // Dispara a impressão nativa do navegador
    window.print();
}

/* ---------- Garante a existência do container de impressão no body ---------- */
function garantirElementoPrint() {
    let container = document.getElementById("comprovanteBaixaPrint");
    if (!container) {
        container = document.createElement("div");
        container.id = "comprovanteBaixaPrint";
        container.className = "comprovante-baixa-print";
        document.body.appendChild(container);
    }
    return container;
}

/* ---------- Monta o HTML do comprovante impresso ---------- */
function montarHTMLComprovante(b) {
    const linhasItens = b.itens.map((it, idx) => `
        <tr>
            <td style="text-align:center;font-weight:600;">${idx + 1}</td>
            <td><strong>${it.nome}</strong></td>
            <td style="text-align:center;font-weight:700;font-size:14px;">${it.quantidade}</td>
            <td style="text-align:center;">${it.unidade}</td>
            <td style="text-align:center;">${it.estoqueAnterior !== undefined ? it.estoqueAnterior : '-'}</td>
            <td style="text-align:center;">${it.estoqueAtual !== undefined ? it.estoqueAtual : '-'}</td>
        </tr>
    `).join("");

    const pratosHtml = b.pratos.map(p => `<li>${p.replace(/<[^>]*>?/gm, '')}</li>`).join("");

    return `
    <div class="comprovante-folha">
        <!-- CABEÇALHO -->
        <div class="comprovante-cabecalho">
            <div class="comprovante-logo-lado">
                <img src="../logocv.png" alt="Coronel Venâncio" class="comprovante-escudo" onerror="this.style.display='none'">
                <div>
                    <h1 class="comprovante-escola-nome">Coronel Venâncio</h1>
                    <div class="comprovante-orgao">Governo do Estado de São Paulo • Secretaria da Educação</div>
                    <div class="comprovante-orgao">Coordenadoria de Alimentação Escolar - COALE / DIISE</div>
                </div>
            </div>
            <div class="comprovante-badge-lado">
                <div class="comprovante-tag-titulo">${b.isPrevia ? 'REQUISIÇÃO DE INGREDIENTES' : 'COMPROVANTE DE BAIXA DE ESTOQUE'}</div>
                <div class="comprovante-meta">Protocolo: <strong>#BX-${b.id}</strong></div>
                <div class="comprovante-meta">Emissão: <strong>${b.dataHora}</strong></div>
                <div class="comprovante-meta">Responsável: <strong>${b.usuario}</strong></div>
            </div>
        </div>

        <div class="comprovante-linha-divisoria"></div>

        <!-- DADOS DO DIA E CARDÁPIO -->
        <div class="comprovante-secao-dia">
            <div class="comprovante-dia-destaque">
                <h2>Cardápio: ${b.diaNome}-feira (${b.diaData})</h2>
                <div class="comprovante-dia-sub">Semana ${b.semana || '4'} • Mês de Referência: ${b.mesAno || 'Setembro / 2026'}</div>
            </div>
            <div class="comprovante-pratos-box">
                <strong>Preparações / Pratos do Dia:</strong>
                <ul>${pratosHtml}</ul>
            </div>
        </div>

        <!-- TABELA DE ITENS BAIXADOS -->
        <div class="comprovante-tabela-titulo">
            ITENS UTILIZADOS NA ALIMENTAÇÃO ESCOLAR (${b.itens.length} ITENS CADASTRADOS)
        </div>
        <table class="comprovante-tabela">
            <thead>
                <tr>
                    <th style="width:5%;">#</th>
                    <th style="width:40%;">Item / Ingrediente</th>
                    <th style="width:15%;">Qtd. Utilizada</th>
                    <th style="width:12%;">Unidade</th>
                    <th style="width:14%;">Estoque Anterior</th>
                    <th style="width:14%;">Estoque Atual</th>
                </tr>
            </thead>
            <tbody>
                ${linhasItens}
            </tbody>
        </table>

        <!-- RESUMO -->
        <div class="comprovante-resumo-bloco">
            <div><strong>Total de Itens:</strong> ${b.itens.length} produtos</div>
            <div><strong>Volume Total Utilizado:</strong> ${b.totalVolumes || '-'}</div>
            <div><strong>Finalidade:</strong> Alimentação Escolar / Cantina da Escola</div>
            <div><strong>Status:</strong> ${b.isPrevia ? 'Prévia de Uso (Não baixado no estoque)' : '✅ Baixa Concluída com Sucesso'}</div>
        </div>

        <!-- ASSINATURAS -->
        <div class="comprovante-assinaturas-grid">
            <div class="comprovante-assinatura-col">
                <div class="linha-ass"></div>
                <div class="nome-ass">${b.usuario}</div>
                <div class="cargo-ass">Responsável pela Cantina / Cozinha</div>
            </div>
            <div class="comprovante-assinatura-col">
                <div class="linha-ass"></div>
                <div class="nome-ass">Direção / Coordenação Escolar</div>
                <div class="cargo-ass">Visto da Unidade Escolar</div>
            </div>
        </div>

        <!-- RODAPÉ -->
        <div class="comprovante-rodape-fim">
            <span>Coronel Venâncio • Qualidade, organização e cuidado em cada refeição.</span>
            <small>Documento emitido eletronicamente pelo Sistema de Controle de Estoque e Cardápio da Cantina.</small>
        </div>
    </div>`;
}

/* ---------- Cria o modal (só na primeira vez) ---------- */
function criarModalCardapio() {
    garantirElementoPrint();
    if (document.getElementById("cardapioOverlay")) return;

    const overlay = document.createElement("div");
    overlay.id = "cardapioOverlay";
    overlay.className = "cardapio-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "Cardápio regular");
    overlay.innerHTML = `
        <div class="cardapio-modal">
            <div class="cardapio-topo">
                <span class="cardapio-topo-titulo">Cardápio da Semana</span>
                <button type="button" class="cardapio-fechar" id="cardapioFechar" aria-label="Fechar">&times;</button>
            </div>
            <div class="cardapio-corpo">${montarTabelaCardapio()}</div>
        </div>`;
    document.body.appendChild(overlay);

    // Fechar: botão X, clique fora da caixa
    document.getElementById("cardapioFechar").addEventListener("click", fecharCardapio);
    overlay.addEventListener("click", function (e) {
        if (e.target === overlay) fecharCardapio();
    });
}

/* ---------- Abrir / fechar ---------- */
function abrirCardapio() {
    criarModalCardapio();
    const corpo = document.querySelector(".cardapio-corpo");
    if (corpo) corpo.innerHTML = montarTabelaCardapio();
    document.getElementById("cardapioOverlay").classList.add("aberto");
    document.body.style.overflow = "hidden";
}

function fecharCardapio() {
    const overlay = document.getElementById("cardapioOverlay");
    if (overlay) overlay.classList.remove("aberto");
    fecharItensDia();
    document.body.style.overflow = "";
}

// Fechar com a tecla ESC
document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
        const diaOverlay = document.getElementById("diaItensOverlay");
        if (diaOverlay && diaOverlay.classList.contains("aberto")) {
            fecharItensDia();
        } else {
            fecharCardapio();
        }
    }
});

// Inicialização e atualização de status dos menus
document.addEventListener("DOMContentLoaded", function () {
    carregarQuantidadesStorage();
    CARDAPIO = getCardapioData();
    atualizarBadgesMenu();
});

// Sincronização entre abas/janelas em tempo real
window.addEventListener("storage", function (e) {
    if (
        e.key === "cardapioDiaQuantidades" ||
        e.key === "cardapioQuantidadesMeta" ||
        e.key === "cardapioData" ||
        e.key === "baixasCardapio" ||
        e.key === "cardapioUltimaAlteracao"
    ) {
        carregarQuantidadesStorage();
        CARDAPIO = getCardapioData();
        atualizarTelasCardapioAbertas();
        atualizarBadgesMenu();
    }
});

