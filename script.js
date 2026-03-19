const quoteText = document.getElementById('quote-text');
const charName = document.getElementById('character-name');
const charImg = document.getElementById('character-img');
const btnNext = document.getElementById('btn-next');
const btnFav = document.getElementById('btn-fav');
const favList = document.getElementById('fav-list');
const btnClear = document.getElementById('btn-clear');

let currentQuote = null;

// Función para obtener datos de la API
async function getQuote() {
    try {
        const response = await fetch('https://thesimpsonsquoteapi.glitch.me/quotes');
        const data = await response.json();
        currentQuote = data[0];

        quoteText.innerText = `"${currentQuote.quote}"`;
        charName.innerText = currentQuote.character;
        charImg.src = currentQuote.image;
        charImg.alt = currentQuote.character;
    } catch (error) {
        quoteText.innerText = "¡D'oh! Hubo un error al cargar la cita.";
    }
}

// Guardar en Favoritos (LocalStorage)
function saveFavorite() {
    if (!currentQuote) return;
    
    let favs = JSON.parse(localStorage.getItem('simpson_favs')) || [];
    favs.push(`${currentQuote.character}: ${currentQuote.quote}`);
    localStorage.setItem('simpson_favs', JSON.stringify(favs));
    
    renderFavorites();
}

// Mostrar favoritos en la pantalla
function renderFavorites() {
    const favs = JSON.parse(localStorage.getItem('simpson_favs')) || [];
    favList.innerHTML = favs.map(f => `<li>⭐ ${f}</li>`).join('');
}

// Limpiar todo
btnClear.addEventListener('click', () => {
    localStorage.removeItem('simpson_favs');
    renderFavorites();
});

btnNext.addEventListener('click', getQuote);
btnFav.addEventListener('click', saveFavorite);

// Cargar una cita al iniciar
getQuote();
renderFavorites();