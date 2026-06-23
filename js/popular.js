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
}]

async function popular() {
    for (const evento of eventos) {
        const ref = await addDoc(collection(db,"eventos"),evento);
        console.log("Adicionado:", ref.id);
    }
}