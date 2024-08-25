// Se você precisar de rolagem suave, pode adicionar o comportamento diretamente no CSS.
document.querySelector('html').style.scrollBehavior = 'smooth';

// Adiciona comportamento personalizado, se necessário
document.addEventListener('DOMContentLoaded', () => {
    const link1 = document.getElementById("link1");
    const link2 = document.getElementById("link2");
    const link3 = document.getElementById("link3");

    link1.addEventListener('click', () => {
        document.querySelector('#habilidades').scrollIntoView({ behavior: 'smooth' });
    });

    link2.addEventListener('click', () => {
        document.querySelector('#projetos').scrollIntoView({ behavior: 'smooth' });
    });

    link3.addEventListener('click', () => {
        document.querySelector('#sobre').scrollIntoView({ behavior: 'smooth' });
    });
});