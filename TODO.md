# TODO - Redesign completo (identidade visual "Coronel Venâncio")

## Objetivo
Padronizar todas as telas do sistema de controle de estoque e pedidos com a identidade visual do Coronel Venâncio (escudo SVG, paleta navy `#12305c`/`#1a4fbf`, fonte Playfair Display), sem imagens e sem `background-image`.

## Passos

- [x] 1. Redesign da tela de login (`index.html`) com base em `login.chatgpt.png`
- [x] 2. Redesign do menu do administrador (`admin/menu.html`) - "O que quer fazer?"
- [x] 3. Criar classes `cv-*` reutilizáveis em `css/style.css` (escudo, título, divider, menu, rodapé)
- [x] 4. Redesign dos logins internos: `admin/login.html` e `usuario/login.html`
- [x] 5. Redesign do menu do usuário: `usuario/menu.html`
- [x] 6. Redesign das telas operacionais do admin: `admin/entrada|saida|estoque|pedidos|relatorios`
- [x] 7. Redesign das telas operacionais do usuário: `usuario/estoque|pedidos|carrinho|saida`
- [x] 8. Tornar a página `admin/relatorios.html` funcional (estava truncada; criar `getMovimentacoes`/`getHistoricoPedidos` em `app.js`)
- [x] 9. Registrar movimentações de entrada/saída em `app.js` (para alimentar os relatórios)
- [x] 10. Trocar gradientes roxos antigos (`#667eea`/`#764ba2`) pela paleta navy CV
- [x] 11. Validar tudo: `node --check` em `app.js` e scripts inline; balanceamento de tags HTML
- [x] 12. Unificar a tela inicial (`index.html`) com a estética CV (escudo SVG, Playfair, cards `cv-menu-btn`) e manter todos os botões funcionais
- [x] 13. Substituir todas as ocorrências de "Colégio Coronel Venâncio" por "Coronel Venâncio" (removido o kicker "Colégio" dos logos e comentários)
- [x] 14. Substituir os escudos SVG pela imagem `logocv.png` em todas as telas (14 páginas)
- [x] 15. Recriar a imagem `logocv.png` com os traços pretos alterados para azul-marinho `#12305c` (preservando os traços/anti-aliasing); o original `logocv.png.png` foi mantido intacto
- [x] 16. Simplificar a fonte das opções dos menus (retirada a Playfair Display do texto dos cards) e deixar os traços dos ícones das opções em branco
- [x] 17. Alterar o fundo das páginas de azul claro para azul escuro: gerada `Tela de fundo escuro.png` a partir da original (fundo azul claro → navy `#0A1E41`, traços das comidas → azul claro `#9CC3F5`, anti-aliasing e traços originais preservados); removidos o overlay `body::after` e o padrão SVG `body::before` do CSS; a imagem original permanece intacta
- [x] 18. Reduzir em 60% a opacidade dos traços das comidas: `Tela de fundo escuro.png` regenerada com os traços a 40% da intensidade (azul claro `#9CC3F5` sobre navy ⇒ `#446089` efetivo), anti-aliasing e traços originais preservados
- [x] 19. Reduzir a opacidade dos traços em mais 30% (40% → 28% da intensidade original): `Tela de fundo escuro.png` regenerada (traços ⇒ `#334C73` efetivo sobre navy), anti-aliasing e traços originais preservados
- [x] 20. Escurecer a cor dos traços, deixando-os semelhantes ao fundo mas ainda visíveis (28% → 18% da intensidade original): `Tela de fundo escuro.png` regenerada (traços ⇒ `#243C61` efetivo sobre navy `#0A1E41`), anti-aliasing e traços originais preservados
- [x] 21. Uniformizar os botões verdes/vermelhos com a estética do botão "Voltar ao Início": `.btn-success` e `.btn-danger` agora com fundo branco, borda `#e4e8ef` 1.5px, raio 18px, texto navy `#12305c`, sombra suave e hover `#f7f9fc` (mesmas palavras e funções preservadas)
- [x] 22. Botões "Confirmar Entrada"/"Confirmar Saída" (barra fixa) com a estrutura completa do botão Voltar (ícone de check SVG navy + divisória + texto em Playfair); barra fixa rebaixada (padding inferior 12px → 6px, gradiente 0.95 → 0.88) e `.with-fixed-bottom` com padding-bottom 96px → 130px para que a frase "Qualidade, organização e cuidado em cada refeição." apareça acima do botão (aplicado em `admin/entrada`, `admin/saida` e `usuario/saida`)
- [x] 23. Cardápio da Semana: ao clicar no dia (Segunda a Sexta), exibição da lista de ingredientes com quantidade recomendada de cada item para usar no dia (com controles de ajuste - e +), verificação de estoque em tempo real, botão "Dar Baixa no Dia" (deduz estoque, registra movimentação e log de auditoria) e botão "Imprimir Baixa" com comprovante oficial formatado para impressão (`@media print`)
- [x] 24. Conexão completa e em tempo real do "Cardápio da Semana" entre Usuário e Administrador: persistência de quantidades ajustadas (`cardapioDiaQuantidades`) e metadados (`cardapioQuantidadesMeta`) no `localStorage`; registro automático no Histórico de Atividades (`admin/logs.html`) sob a categoria "✏️ Alteração" com autor, data/hora e valores; banner de status de sincronização no cardápio; badges indicando quem ajustou cada ingrediente e botões de restauração individual e geral; editor de pratos e inclusão/remoção de ingredientes por dia (`cardapioData`); badge no menu do Administrador alertando sobre alterações feitas pelo Usuário; sincronização instantânea entre abas/janelas via evento `storage`.

## Observações
- A imagem `oqfazer.png.png` (screenshot de referência do menu) não pôde ser analisada diretamente (modelo sem suporte a imagens), mas o padrão CV foi aplicado seguindo o que já estava em `admin/menu.html`.


