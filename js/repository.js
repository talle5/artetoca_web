import { db, collection, getDocs, query, orderBy } from "./firebase/firebase_module.js";

/**
 * @typedef {Object} Evento
 * @property {string} titulo
 * @property {string} status
 * @property {string} descricao
 * @property {string} data
 * @property {string} hora_inicio
 * @property {string} hora_termino
 * @property {string} local
 */

/**
 * @typedef {Object} Artesao
 * @property {string} id
 * @property {string} nome
 * @property {string} descricao
 * @property {string} img
 * @property {string} [data]
 */

/**
 * Busca todos os eventos do Firebase ordenados por data.
 * @returns {Promise<Evento[]>} Uma promessa que resolve com a lista de eventos.
 */
async function getEventos() {
    try {
        const q = query(collection(db, "eventos"), orderBy("data"));
        const snapshot = await getDocs(q);
        return snapshot.docs.map((doc) => /** @type {Evento} */ (doc.data()));
    }
    catch (error) {
        console.error("Erro ao carregar eventos do Firebase:", error);
        return [];
    }
}

/**
 * Busca todos os artesãos do Firebase ordenados por nome.
 * @returns {Promise<Artesao[]>} Uma promessa que resolve com a lista de artesãos.
 */
async function getMembros() {
    try {
        const q = query(collection(db, "artesoes"), orderBy("nome"));
        const snapshot = await getDocs(q);
        return snapshot.docs.map((doc) => /** @type {Artesao} */ ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Erro ao carregar artesãos do Firebase:", error);
        return [];
    }
}

export { getEventos, getMembros };