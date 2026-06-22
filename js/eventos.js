import { db, collection, addDoc, getDocs, query, orderBy } from "./firebase_module.js";

const container = document.querySelector('.main_content');

async function carregarEventos() {
    const q = query(collection(db, "eventos"), orderBy("data"));
    const snapshot = await getDocs(q);

    snapshot.forEach((doc) => {
        const evento = doc.data();
        container.insertAdjacentHTML('beforeend', criarCardHTML(evento));
    });
}

function formatData(data) {
    const map = ['', 'janeiro', 'fevereiro', 'merço', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']
    const splited = data.split('-')
    return `${splited[0]} de ${map[Number(splited[1])]}, ${splited[2]}`
}

function criarCardHTML(evento) {
    const statusClasse = {
        "Em Breve": "embreve",
        "Acontecendo": "acontecendo",
        "Realizado": "realizado"
    }[evento.status] || "";

    return `
        <div class="event_card">
            <h3>${evento.titulo}</h3>
            <div class="pill ${statusClasse}">
                <p>${evento.status}</p>
            </div>
            <p>${evento.descricao}</p>
            <div>
                <div>
                    <img src="../assets/icons/calendario.png" alt="">
                    <p>${formatData(evento.data)}</p>
                </div>
                <div>
                    <img src="../assets/icons/relogio.png" alt="">
                    <p>${evento.hora_inicio} - ${evento.hora_termino}</p>
                </div>
                <div>
                    <img src="../assets/icons/mapas-e-bandeiras.png" alt="">
                    <p>${evento.local}</p>
                </div>
            </div>
        </div>
    `;
}

carregarEventos();