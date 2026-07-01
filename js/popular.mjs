// 1. Importações diretas do pacote npm do Firebase
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// 2. Cole aqui as configurações do seu Firebase (Firebase Console > Project Settings)
const firebaseConfig = {
    apiKey: "AIzaSyDmMnWK_NZuh1ZC5W5Pej-oJt6uAvHKnbw",
    authDomain: "learnig-firebase-535ad.firebaseapp.com",
    projectId: "learnig-firebase-535ad",
    storageBucket: "learnig-firebase-535ad.firebasestorage.app",
    messagingSenderId: "640811250767",
    appId: "1:640811250767:web:545d2896fb1e5ab67ae63a",
    measurementId: "G-6B1QCZL2YB"
};

// 3. Inicializa o Firebase e o Banco de Dados (Firestore)
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 4. Dados a serem populados
const eventos = [{
    titulo: "Feira de Artesanato de",
    status: 'Em Breve',
    descricao: 'Grande feira com exposição e venda de produtos artesanais locais.',
    data: '10-06-2026',
    hora_inicio: "14:00",
    hora_termino: "20:00",
    local: 'Praça Central de Ocara'
},
{
    titulo: 'Oficina de Cerâmica',
    status: 'Acontecendo',
    descricao: 'Aprenda técnicas tradicionais de modelagem e queima de cerâmica.',
    data: '25-05-2026',
    hora_inicio: '10:00',
    hora_termino: '18:00',
    local: 'Sede da Associação'
},
{
    titulo: "Exposição de Arte Popular",
    status: 'Realizado',
    descricao: 'Mostra com trabalhos de artistas locais.',
    data: '15-04-2026',
    hora_inicio: '10:00',
    hora_termino: '18:00',
    local: 'Museu Municipal'
}];

const artesoes = [
    {
        nome: "Aldo Batista",
        especialidade: "Papel Machê",
        descricao: "Utilizando materiais diversos como papel machê, massas artesanais, colas, castanhas, palhas, madeira de refugo e cabaças, Aldo transforma elementos simples e naturais em peças que retratam a identidade cultural do sertão nordestino.",
        data: "2025",
        img: "https://githubraw.com/profBruno-UFC-Qx/classroom-mobile-final-artetoca/main/perfil/aldo.png"
    },
    {
        nome: "Laís Almeida",
        especialidade: "Bordado",
        descricao: "Além de universitária, Laís trabalha com crochê e bordado de forma moderna e criativa. Suas bolsas, biquínis e acessórios unem estilo e arte, valorizando o artesanato como expressão contemporânea e autoral.",
        data: "2025",
        img: "https://githubraw.com/profBruno-UFC-Qx/classroom-mobile-final-artetoca/main/perfil/lais-almeida.png"
    },
    {
        nome: "Dami Mendes",
        especialidade: "Quadros/Pinturas",
        descricao: "Dami é um grande exemplo de superação, sensibilidade e amor pela arte. Ao começar a perder a audição, Eudami Mendes encontrou na arte não apenas um meio de expressão, mas também uma forma de mostrar ao mundo a força e a beleza que brotam de suas mãos talentosas e inquietas.",
        data: "2025",
        img: "https://githubraw.com/profBruno-UFC-Qx/classroom-mobile-final-artetoca/main/perfil/Eudami.jpg"
    },
    {
        nome: "Mônica Gomes",
        especialidade: "Crochê",
        descricao: "Neta de Maria Evangelista Gomes, uma artesã de mão cheia, que fazia panelas, cuscuzeiras, tachos (frigideira) de barro e peças com palhas de carnaúba. Com crochê, Mônica produz peças delicadas e cheias de estilo.",
        data: "2025",
        img: "https://githubraw.com/profBruno-UFC-Qx/classroom-mobile-final-artetoca/main/perfil/monica.png"
    },
    {
        nome: "Ritinha",
        especialidade: "Macramê",
        descricao: "Apaixonada por plantas, Ritinha começou a produzir macramê quando viajou durante a pandemia para a Fortaleza. Encantada por um suporte que viu em uma loja, perguntou do que era feito e descobriu o macramê. Atualmente produz peças e ministra oficinas de Macramê em escolas e associações de artesãos.",
        data: "2025",
        img: "https://githubraw.com/profBruno-UFC-Qx/classroom-mobile-final-artetoca/main/perfil/ritinha.png"
    },
    {
        nome: "Neidinha",
        especialidade: "Palha",
        descricao: "Cozinheira de mão cheia, Neidinha também produz objetos de palha de carnaúba e bananeira.",
        data: "2026",
        img: "https://githubraw.com/profBruno-UFC-Qx/classroom-mobile-final-artetoca/main/perfil/neidinha.jpeg"
    }
];

// 5. Função principal
async function popular() {
    try {
        console.log("Iniciando a população do Firebase...");

        for (const evento of eventos) {
            const ref = await addDoc(collection(db, "eventos"), evento);
            console.log(`Evento adicionado com ID: ${ref.id}`);
        }

        for (const artesao of artesoes) {
            const ref = await addDoc(collection(db, "artesoes"), artesao);
            console.log(`Artesão adicionado com ID: ${ref.id}`);
        }

        console.log("Banco de dados populado com sucesso!");
        process.exit(0);

    } catch (error) {
        console.error("Erro ao popular o Firebase:", error);
        process.exit(1);
    }
}

popular();