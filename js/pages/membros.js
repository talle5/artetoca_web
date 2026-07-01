import { getMembros } from '../repository.js';

const membrosGrid = document.getElementById('membros_grid');
const descriptionWindow = document.getElementById('description_window');

function gerarInstagram(nome) {
    if (!nome) return "@artesao";
    const nomeLimpo = nome
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, ".");
    return `@${nomeLimpo}`;
}

function showDescriptionWindow(artesao) {
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
                    <p style="color:#e17200">${artesao.especialidade}</p>
                    <p class="gray_text_color">Ocara, CE</p>
                    <p class="gray_text_color">${artesao.descricao}</p>
                    <p class="pill instagram border_round">${instagram}</p>
                </div>
            </div>
        </div>
    `;

    document.getElementById('close_modal_btn').addEventListener('click', closeDescriptionWindow);
    const overlay = document.getElementById('modal_overlay');
    overlay.addEventListener('click', (event) => {
        if (event.target === overlay) {
            closeDescriptionWindow();
        }
    });
}

function closeDescriptionWindow() {
    descriptionWindow.innerHTML = '';
}

function criarMembroCardHTML(artesao, id) {
    return `
        <div class="membro_card border_round" data-id="${id}" style="cursor: pointer;">
            <img src="${artesao.img}" alt="${artesao.nome}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 50%;">
            <p class="nome">${artesao.nome}</p>
            <p class="font_size_2 gray_text_color">${artesao.especialidade}</p>
            <p class="font_size_1 gray_text_color">${artesao.data}</p>
        </div>
    `;
}

async function carregarMembros() {
    try {
        const membros = await getMembros();

        membros.forEach(membro => {
            membrosGrid.insertAdjacentHTML('beforeend', criarMembroCardHTML(membro, membro.id));
        });

        membrosGrid.addEventListener('click', (event) => {
            const card = event.target.closest('.membro_card');
            if (card) {
                const artesaoId = card.getAttribute('data-id');
                const artesaoSelecionado = membros.find(a => a.id === artesaoId);
                if (artesaoSelecionado) {
                    showDescriptionWindow(artesaoSelecionado);
                }
            }
        });

    } catch (error) {
        console.error("Erro ao carregar artesãos do Firebase:", error);
    }
}

carregarMembros();