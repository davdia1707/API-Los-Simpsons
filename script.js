const quoteText = document.getElementById('quote-text');
const charName = document.getElementById('character-name');
const charImg = document.getElementById('character-img');
const btnNext = document.getElementById('btn-next');
const btnFav = document.getElementById('btn-fav');
const favList = document.getElementById('fav-list');
const btnClear = document.getElementById('btn-clear');

let currentQuote = null;

// --- NUESTRA PROPIA API LOCAL (¡A prueba de fallos!) ---
// --- NUESTRA PROPIA API LOCAL SÚPER COMPLETA ---
const simpsonsQuotes = [
    // Homer Simpson
    { quote: "¡D'oh!", character: "Homer Simpson", image: "HomerFoto.png" },
    { quote: "Mmm... rosquillas.", character: "Homer Simpson", image: "HomerFoto.png" },
    { quote: "No vives de ensalada.", character: "Homer Simpson", image: "HomerFoto.png" },
    
    // Marge Simpson
    { quote: "¡Mmmmm! (gruñido de desaprobación)", character: "Marge Simpson", image: "MargeFoto.png" },
    { quote: "Homer, no creo que sea una buena idea.", character: "Marge Simpson", image: "MargeFoto.png" },
    
    // Bart Simpson
    { quote: "¡Ay, caramba!", character: "Bart Simpson", image: "BartFoto.png" },
    { quote: "Multiplícate por cero.", character: "Bart Simpson", image: "BartFoto.png" },
    { quote: "Yo no fui.", character: "Bart Simpson", image: "BartFoto.png" },
    
    // Lisa Simpson
    { quote: "Si alguien me necesita, estaré en mi habitación.", character: "Lisa Simpson", image: "LisaFoto.png" },
    { quote: "¡Baaart, deja de hacer eso!", character: "Lisa Simpson", image: "LisaFoto.png" },
    
    // Ned Flanders
    { quote: "¡Holaaa, holita, vecinito!", character: "Ned Flanders", image: "FlandersFoto.png" },
    { quote: "¡Perfectirijillo!", character: "Ned Flanders", image: "FlandersFoto.png" },
    
    // Mr. Burns
    { quote: "Excelente...", character: "Sr. Burns", image: "BurnsFoto.png" },
    { quote: "Smithers, suelte a los perros.", character: "Sr. Burns", image: "BurnsFoto.png" },
    
    // Ralph Wiggum (Ralph Gorgory)
    { quote: "El aliento de mi gato huele a comida para gatos.", character: "Ralph Wiggum", image: "RalphFoto.png" },
    { quote: "¡Corre, plátano!", character: "Ralph Wiggum", image: "RalphFoto.png" },
    
    // Jefe Wiggum (Jefe Gorgory)
    { quote: "Llévense a este muchacho, muchachos.", character: "Jefe Wiggum", image: "WiggumFoto.png" },
    { quote: "Nada que ver aquí, circulen.", character: "Jefe Wiggum", image: "WiggumFoto.png" },
    
    // Milhouse
    { quote: "¡A Milhouse le gusta Lisa!", character: "Milhouse", image: "MilhouseFoto.png" },
    { quote: "¡Mis gafas hacen daño a mis ojos!", character: "Milhouse", image: "MilhouseFoto.png" },

    // Krusty el Payaso
    { quote: "¡Hola, niños! ¡Soy Krusty el payaso! Jajajaja.", character: "Krusty", image: "KrustyFoto.png" },

    // Moe Szyslak
    { quote: "¿Hay algún Empal Mado aquí? ¡Que alguien me diga si hay un Empal Mado!", character: "Moe Szyslak", image: "MoeFoto.png" }
];

// --------------------------------------------------------

// Función para obtener datos de nuestra lista local
function getQuote() {
    // Escoger un número aleatorio basado en la cantidad de frases que tenemos
    const randomIndex = Math.floor(Math.random() * simpsonsQuotes.length);
    currentQuote = simpsonsQuotes[randomIndex];

    // Mostrarlo en la web
    quoteText.innerText = `"${currentQuote.quote}"`;
    charName.innerText = currentQuote.character;
    charImg.src = currentQuote.image;
    charImg.alt = currentQuote.character;
}

// Guardar en Favoritos
function saveFavorite() {
    if (!currentQuote) return;
    
    let favs = JSON.parse(localStorage.getItem('simpson_favs')) || [];
    const nuevaCita = `${currentQuote.character}: ${currentQuote.quote}`;
    
    if (!favs.includes(nuevaCita)) {
        favs.push(nuevaCita);
        localStorage.setItem('simpson_favs', JSON.stringify(favs));
        renderFavorites();
    } else {
        alert("¡Ya tienes esta cita en tus favoritos! ⭐");
    }
}

// Mostrar favoritos
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

// Iniciar la primera vez
getQuote();
renderFavorites();