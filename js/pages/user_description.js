
import { db, collection, getDocs, query, orderBy } from "../firebase/firebase_module.js";

// Container onde os membros serão exibidos
const membrosGrid = document.getElementById('membros_grid');
const descriptionWindow = document.getElementById('description_window');

// Função para parsear a descrição longa vinda do banco
function extrairInfoArtesao(descricaoCompleta) {
    let categoria = "Artesanato";
    let descricaoLimpa = descricaoCompleta;

    if (!descricaoCompleta) {
        return { categoria, descricaoLimpa: "" };
    }

    // Extrai categoria (ex: "Categoria: Papel Machê.")
    const catMatch = descricaoCompleta.match(/Categoria:\s*([^.]+)/i);
    if (catMatch) {
        categoria = catMatch[1].trim();
        descricaoLimpa = descricaoLimpa.replace(/Categoria:\s*[^.]+\.\s*/i, "");
    }
    return { categoria, descricaoLimpa };
}

// Gera o nome do Instagram com base no nome do artesão
function gerarInstagram(nome) {
    if (!nome) return "@artesao";
    const nomeLimpo = nome
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // Remove acentos
        .replace(/\s+/g, "."); // Substitui espaços por pontos
    return `@${nomeLimpo}`;
}

// Abre o modal de descrição com os dados dinâmicos do artesão
function showDescriptionWindow(artesao) {
    const { categoria, descricaoLimpa } = extrairInfoArtesao(artesao.descricao);
    const instagram = gerarInstagram(artesao.nome);

    descriptionWindow.innerHTML = `
        <div id="modal_overlay">
            <div class="membro_description_window border_round">
                <div class="info_header">
                    <img id="close_modal_btn" src="../assets/icons/close.png" alt="Fechar" style="cursor: pointer;">
                </div>
                <div class="membro_description font_small">
                    <img class="border_round" src="${artesao.img}" alt="${artesao.nome}" style="width: 120px; height: 120px; object-fit: cover; border-radius: 50%; border: 4px solid white; position: relative; z-index: 10; margin-top: -76px; background-color: white; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);">
                    <h2>${artesao.nome}</h2>
                    <p style="color:#e17200">${categoria}</p>
                    <p class="gray_text_color">Ocara, CE</p>
                    <p class="gray_text_color">${descricaoLimpa}</p>
                    <p class="pill instagram border_round">${instagram}</p>
                </div>
            </div>
        </div>
    `;

    // Adiciona evento de fechar ao clicar no botão "X"
    document.getElementById('close_modal_btn').addEventListener('click', closeDescriptionWindow);

    // Adiciona evento de fechar ao clicar no fundo escuro (overlay)
    const overlay = document.getElementById('modal_overlay');
    overlay.addEventListener('click', (event) => {
        if (event.target === overlay) {
            closeDescriptionWindow();
        }
    });
}

// Fecha o modal de descrição
function closeDescriptionWindow() {
    descriptionWindow.innerHTML = '';
}

// Cria o HTML do cartão de membro na lista
function criarMembroCardHTML(artesao, id) {
    const { categoria } = extrairInfoArtesao(artesao.descricao);
    return `
        <div class="membro_card border_round" data-id="${id}" style="cursor: pointer;">
            <img src="${artesao.img}" alt="${artesao.nome}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 50%;">
            <p class="nome">${artesao.nome}</p>
            <p class="font_size_2 gray_text_color">${categoria}</p>
            <p class="font_size_1 gray_text_color">Desde ${artesao.data || '2018'}</p>
        </div>
    `;
}

// Carrega os artesãos do Firestore
async function carregarMembros() {
    try {
        const q = query(collection(db, "artesoes"), orderBy("nome"));
        const snapshot = await getDocs(q);

        // Limpa a grid estática antes de carregar
        membrosGrid.innerHTML = '';

        const listaArtesoes = [];

        snapshot.forEach((doc) => {
            const artesao = doc.data();
            const id = doc.id;
            listaArtesoes.push({ id, ...artesao });
            membrosGrid.insertAdjacentHTML('beforeend', criarMembroCardHTML(artesao, id));
        });

        // Configura evento de clique nos cartões (event delegation)
        membrosGrid.addEventListener('click', (event) => {
            const card = event.target.closest('.membro_card');
            if (card) {
                const artesaoId = card.getAttribute('data-id');
                const artesaoSelecionado = listaArtesoes.find(a => a.id === artesaoId);
                if (artesaoSelecionado) {
                    showDescriptionWindow(artesaoSelecionado);
                }
            }
        });

    } catch (error) {
        console.error("Erro ao carregar artesãos do Firebase:", error);
    }
}

// Inicializa o carregamento ao carregar o script
carregarMembros();