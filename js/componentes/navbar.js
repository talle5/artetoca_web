
const links = [
    { href: 'index.html', icon: '../assets/icons/casa.png', label: 'Inicio' },
    { href: 'galeria.html', icon: '../assets/icons/galeria-de-fotos.png', label: 'Galeria' },
    { href: 'eventos.html', icon: '../assets/icons/calendario.png', label: 'Eventos' },
    { href: 'membros.html', icon: '../assets/icons/user.png', label: 'Membros' },
    { href: 'contato.html', icon: '../assets/icons/e-mail.png', label: 'Contato' },
];

const currentPage = window.location.pathname.split('/').pop();
const navBar = document.getElementById('nav_bar')

navBar.innerHTML = `
    <div class="header_logo">
        <img src="../assets/icons/icon.png" alt="">
        <div>
            <h1>Associação dos Artesãos</h1>
            <p class="gray_text_color">Ocara</p>
        </div>
    </div>
    <div class="grid_row">
        ${links.map(link => `
            <a href="${link.href}" class="category ${currentPage === link.href ? 'selected' : ''}">
                <img src="${link.icon}" alt="">
                <p>${link.label}</p>
            </a>
        `).join('')}
    </div>
    <div class=""></div>
`
