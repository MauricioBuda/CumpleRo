// =========================================
// ELEMENTOS
// =========================================

const titulo = document.querySelector("#titulo");
const mensaje = document.querySelector("#mensaje");

const dias = document.querySelector("#dias");
const horas = document.querySelector("#horas");
const minutos = document.querySelector("#minutos");
const segundos = document.querySelector("#segundos");

const contador = document.querySelector("#contador");
const contenido = document.querySelector("#contenido");

const background = document.querySelector("#background");

const particles = document.querySelector("#particles");
const confetti = document.querySelector("#confetti");
const sparkles = document.querySelector("#sparkles");

const musica = document.querySelector("#musicaFondo");

const btnMusica = document.querySelector("#btnMusica");

// =========================================
// FECHAS
// =========================================

// =========================================
// FECHAS
// =========================================

// IMPORTANTE:
// Para probar el proyecto solamente cambiá ESTA fecha.
// Las demás etapas se calculan automáticamente.

const cumpleaños = new Date(2026, 6, 19, 0, 0, 0);

// ----- ETAPA 13 HS -----

const etapa13 = new Date(cumpleaños);
etapa13.setHours(13, 0, 0, 0);

// ----- ETAPA 18 HS -----

const etapa18 = new Date(cumpleaños);
etapa18.setHours(18, 0, 0, 0);

// ----- ETAPA 23 HS -----

const etapa23 = new Date(cumpleaños);
etapa23.setHours(21, 0, 0, 0);

// =========================================
// ESTADO
// =========================================

let aventuraComenzada = false;

let etapa = 1;


let preguntaActual = 0;


// =========================================
// LOCAL STORAGE
// =========================================

function guardarEstado() {

    const estado = {

        etapa,
        aventuraComenzada,
        preguntaActual

    };

    localStorage.setItem(
        "cumpleMauri2026",
        JSON.stringify(estado)
    );

}



async function iniciarMusica(cancion) {

    // Si ya está sonando esa misma canción, no hacemos nada
    if (musica.src.endsWith(cancion) && !musica.paused) {

        return;

    }

    // ==========================
    // BAJAR VOLUMEN
    // ==========================

    while (musica.volume > 0.02 && !musica.paused) {

        musica.volume -= 0.02;

        await esperar(60);

    }

    musica.pause();

    musica.currentTime = 0;

    // ==========================
    // CAMBIAR CANCIÓN
    // ==========================

    musica.src = cancion;

    localStorage.setItem("musicaActual", cancion);

    musica.load();

    musica.volume = 0;

    try {

        await musica.play();

        // ==========================
        // SUBIR VOLUMEN
        // ==========================

        while (musica.volume < 0.18) {

            musica.volume += 0.02;

            if (musica.volume > 0.18) {

                musica.volume = 0.18;

            }

            await esperar(60);

        }

        btnMusica.textContent = "🔊";

        localStorage.setItem("musica", "on");

    }

    catch (error) {

        console.log("La reproducción fue bloqueada.");

        btnMusica.textContent = "🔇";

    }

}



function detenerMusica(){

    musica.pause();

    btnMusica.textContent = "🔇";

    localStorage.setItem("musica","off");

}



function cargarEstado() {

    const estado = JSON.parse(
        localStorage.getItem("cumpleMauri2026")
    );

    if (!estado) return;

    etapa = estado.etapa ?? 1;
    aventuraComenzada = estado.aventuraComenzada ?? false;
    preguntaActual = estado.preguntaActual ?? 0;

}

const preguntasEtapa1 = [

    {
        pregunta: "25 - 4 x 12 - 165 / 3 + 501",
        respuesta: "423",

        memeCorrecto: "/img/memes/etapa00/correcto1.png",
        memeIncorrecto: "/img/memes/etapa00/incorrecto1.jpg"
    },

    {
        pregunta: "¿Cual fué la verdura que te olvidaste de comprar, indispensable para lo que íbamos a cocinar?",
        respuesta: "Puerro",

        memeCorrecto: "/img/memes/etapa00/correcto2.png",
        memeIncorrecto: "/img/memes/etapa00/incorrecto2.png"
    },

    {
        pregunta: "La respuesta a nuestro código secreto (específicamente a este): 'El año pasó más rápido...' ",
        respuesta: "Es el efecto placebo",

        memeCorrecto: "/img/memes/etapa00/correcto3.png",
        memeIncorrecto: "/img/memes/etapa00/incorrecto3.png"
    }

];




const preguntasEtapa2 = [

    {

        pregunta: "Mes en el que nos conocimos",
        respuesta: "Agosto",

        memeCorrecto: "/img/memes/etapa13/correcto1.jpg",
        memeIncorrecto: "/img/memes/etapa13/incorrecto1.jpg"

    },

    {

        pregunta: "(Mi número preferido de la ruleta) x (Día que salimos para el viaje de egresados) - (Tu día de cumple) x (Mi dia de cumple)",
        respuesta: "59",

        memeCorrecto: "/img/memes/etapa13/correcto2.jpg",
        memeIncorrecto: "/img/memes/etapa13/incorrecto2.jpg"

    },

    {

        pregunta: "Primer apodo de la gorda (diminutivo)",
        respuesta: "Carbonsito",

        memeCorrecto: "/img/memes/etapa13/correcto3.jpg",
        memeIncorrecto: "/img/memes/etapa13/incorrecto3.jpg"

    }

];




const preguntasEtapa3 = [

    {

        pregunta: "(La cantidad de letras de tus nombres + apellido) + (Lo mismo pero con mis datos) + (mi DNI - tu DNI)",
        respuesta: "885502",

        memeCorrecto: "/img/memes/etapa18/correcto1.jpg",
        memeIncorrecto: "/img/memes/etapa18/incorrecto1.jpg"

    },

    {

        pregunta: "Apodo del único novio registrado de kika",
        respuesta: "Mexicano",

        memeCorrecto: "/img/memes/etapa18/correcto2.jpg",
        memeIncorrecto: "/img/memes/etapa18/incorrecto2.jpg"

    },

    {

        pregunta: "Uno de los emprendimientos de nuestro angelito papin (se que hay varios, pero es uno solo el correcto acá)",
        respuesta: "El rey goma",

        memeCorrecto: "/img/memes/etapa18/correcto3.jpg",
        memeIncorrecto: "/img/memes/etapa18/incorrecto3.jpg"

    }

];


const preguntasEtapaFinal = [

    {

        pregunta: "Frase épica de tu papá el día que le preguntamos si quería algo del chino",
        respuesta: "Crema de leche",

        memeCorrecto: "/img/memes/etapa23/correcto1.jpg",
        memeIncorrecto: "/img/memes/etapa23/incorrecto1.jpg"

    },

    {

        pregunta: "Suma de las edades que teníamos al conocernos",
        respuesta: "35",

        memeCorrecto: "/img/memes/etapa23/correcto2.jpg",
        memeIncorrecto: "/img/memes/etapa23/incorrecto2.jpg"

    },

    {

        pregunta: "Como dice siempre Grisa que estaba yo, cuando mis papas me dejaron en Mar del Tuyu",
        respuesta: "Raquitico",

        memeCorrecto: "/img/memes/etapa23/correcto3.jpg",
        memeIncorrecto: "/img/memes/etapa23/incorrecto3.jpg"

    }

];





let preguntas = preguntasEtapa1;

// =========================================
// MENSAJES
// =========================================

function obtenerEstadoCuentaRegresiva(restante) {

    const diasRestantes = restante / 1000 / 60 / 60 / 24;

    if (diasRestantes > 10) {

        return {

            titulo: "Faltan varios días",

            mensaje: "Paciencia, todavía faltan:"

        };

    }

    if (diasRestantes > 7) {

        return {

            titulo: "Faltan varios días",

            mensaje: "Cada segundo nos acerca un poquito más."

        };

    }

    if (diasRestantes > 3) {

        return {

            titulo: "Cada vez falta menos ❤️",

            mensaje: "Menos de una semana... prometo que la espera va a valer la pena (espero)"

        };

    }

    if (diasRestantes > 1) {

        return {

            titulo: "Ya casi ❤️",

            mensaje: "Ya casi puedo dejar de guardar el secreto! Ah re que sabes todo ya"

        };

    }

    if (diasRestantes > 0.02) {

        return {

            titulo: "❤️ En un ratico!! ❤️",

            mensaje: "Ya casi empieza esta pequeña aventura jeje"

        };

    }

    return {

        titulo: "❤️ Ya casi ❤️",

        mensaje: "Dale Rosetaaaaaaaaaaa"

    };

}

// =========================================
// FORMATO
// =========================================

function dosDigitos(numero) {

    return numero.toString().padStart(2, "0");

}


function esperar(ms) {

    return new Promise(resolve => setTimeout(resolve, ms));

}

// =========================================
// PANTALLA DE BIENVENIDA
// =========================================

function mostrarPantallaComenzar() {

    titulo.textContent = "❤️ Hoy es tu día ❤️";

    mensaje.textContent = "Todo está preparado. Cuando quieras, podemos empezar.";

    contador.style.display = "none";

    contenido.innerHTML = `

        <div id="intro" class="fade">

            <button id="btnComenzar">

                Comenzar ❤️

            </button>

        </div>

    `;

    document.querySelector("#btnComenzar").onclick = () => {

aventuraComenzada = true;

guardarEstado();

iniciarMusica("/audio/RAPSUSKLEI ft HORUS - SOY VIDA (PROD SOLO SOUL).m4a");

iniciarIntroduccion();

    };

}




async function iniciarIntroduccion() {

    const frases = [

        "Si estás viendo esto...",

        "Es porque por fin llegó el día.",

        "Feliz cumpleaños ❤️",

        "Vamos a hacer un juego de preguntas sencillas jeje:"

    ];

    titulo.textContent = "";
    mensaje.textContent = "";

    for (const frase of frases) {

        contenido.innerHTML = `

            <div class="fade">

                <h1>${frase}</h1>

            </div>

        `;

        await esperar(2500);

    }

    mostrarPrimerAcertijo();

}





// =========================================
// PRIMER ACERTIJO (PROVISORIO)
// =========================================

function mostrarPrimerAcertijo() {

    preguntas = preguntasEtapa1;

    preguntaActual = 0;

    guardarEstado();

    mostrarPregunta();

}




function terminarEtapa() {

    switch (etapa) {

        // ==========================
        // ETAPA 1
        // ==========================

        case 1:

            titulo.textContent = "❤️ Excelente ❤️";

            mensaje.textContent = "";

            contenido.innerHTML = `

                <div class="fade">

                    <h2>

                        Terminaste el primer desafío, hermosa.
                        Demostraste una gran sabiduría.
                        El premio a esta hazaña lo vas a encontrar
                        adentro de una cartera tuya 😏
                        Son regalitos pequeños, pero con mucho amor ❤️

                    </h2>

                    <br>

                    <button id="continuar">

                        Continuar ❤️

                    </button>

                </div>

            `;

            document
                .querySelector("#continuar")
                .onclick = () => {

                    etapa = 2;

                    guardarEstado();

                    actualizarCuentaRegresiva();

                };

        break;



        // ==========================
        // ETAPA 3
        // ==========================

        case 3:

            titulo.textContent = "❤️ Excelente ❤️";

            mensaje.textContent = "";

            contenido.innerHTML = `

                <div class="fade">

                    <h2>

                        Me seguis soprendiendo con tanta genialidad. Espero que esta experiencia no esté siendo tediosa. Para que no te aburras, revisá las valijas de viaje jeje

                    </h2>

                    <br>

                    <button id="continuar">

                        Continuar ❤️

                    </button>

                </div>

            `;

            document
                .querySelector("#continuar")
                .onclick = () => {

                    etapa = 4;

                    guardarEstado();

                    actualizarCuentaRegresiva();

                };

        break;


        // ==========================
// ETAPA 5
// ==========================

case 5:

    titulo.textContent = "❤️ Excelente ❤️";

    mensaje.textContent = "";

    contenido.innerHTML = `

        <div class="fade">

            <h2>

                Wow! Ese cerebro está sacando chispas! (con tono de Negan se puede leer je). Para motivarte y que no me odies, podes revisar el en la caja de mi monitor ❤️ 

            </h2>

            <br>

            <button id="continuar">

                Continuar ❤️

            </button>

        </div>

    `;

    document
        .querySelector("#continuar")
        .onclick = () => {

            etapa = 6;

            guardarEstado();

            actualizarCuentaRegresiva();

        };

break;


// ==========================
// ETAPA 7 (FINAL)
// ==========================

case 7:

    mostrarCelebracionFinal();

break;

    }

}




function mostrarPregunta() {

    if (preguntaActual >= preguntas.length) {

        terminarEtapa();
        return;

    }

    const p = preguntas[preguntaActual];

    guardarEstado();

    titulo.textContent = `Pregunta ${preguntaActual + 1} de ${preguntas.length}`;

    mensaje.textContent = "";

    contenido.innerHTML = `

        <div class="fade">

            <h2>${p.pregunta}</h2>

            <br>

        <input
            id="respuestaUsuario"
            autocomplete="off"
            autocorrect="off"
            autocapitalize="none"
            spellcheck="false"
            placeholder="Escribí tu respuesta">

            <br>

            <button id="btnResponder">

                Responder

            </button>

        </div>

    `;


    document
        .querySelector("#btnResponder")
        .onclick = verificarRespuesta;

        document
    .querySelector("#respuestaUsuario")
    .addEventListener("keydown", (evento) => {

        if (evento.key === "Enter") {

            verificarRespuesta();

        }

    });

    document
    .querySelector("#respuestaUsuario")
    .focus();

}



function verificarRespuesta() {

    const p = preguntas[preguntaActual];

    const boton = document.querySelector("#btnResponder");

    boton.disabled = true;

    const respuesta = document
        .querySelector("#respuestaUsuario")
        .value
        .trim()
        .toLowerCase();

    if (respuesta === p.respuesta.toLowerCase()) {

        mostrarMeme(true);

    }

    else {

        mostrarMeme(false);

    }

}



async function mostrarMeme(correcto) {

    const p = preguntas[preguntaActual];

    const imagen = correcto
        ? p.memeCorrecto
        : p.memeIncorrecto;

    contenido.innerHTML = `

        <div class="fade">

            <img
                id="imagenMeme"
                src="${imagen}"
                class="meme">

        </div>

    `;

    // El meme permanece visible
    await esperar(2000);

    // Empieza la animación de salida
    document
        .querySelector("#imagenMeme")
        .classList.add("ocultar");

    // Espera a que termine la animación
    await esperar(450);

    if (correcto) {

        preguntaActual++;

guardarEstado();

if (preguntaActual >= preguntas.length) {

    terminarEtapa();

}

        else {

            mostrarPregunta();

        }

    }

    else {

        mostrarPregunta();

    }

}


// =========================================
// ETAPAS
// =========================================

function mostrarEtapa() {

    switch (etapa) {

        case 1:

            // Primera etapa
            return;

        case 2:

            mostrarEspera13();

            return;

case 3:

    titulo.textContent = "❤️ Ya son las 13:00 ❤️";

    mensaje.textContent = "¿Lista para el segundo desafío?";

    contador.style.display = "none";

    contenido.innerHTML = `

        <div class="fade">

            <button id="btnEtapa2">

                Comenzar ❤️

            </button>

        </div>

    `;

document
    .querySelector("#btnEtapa2")
    .onclick = () => {

        etapa = 3;

        preguntas = preguntasEtapa2;

        preguntaActual = 0;

        guardarEstado();

        iniciarMusica("/audio/Canserbero - De la vida como película y su tragedia comedia y ficción LETRA.m4a");

        mostrarPregunta();

    };

    return;

case 4:

    mostrarEspera18();

    return;

case 5:

    titulo.textContent = "❤️ Ya son las 18:00 ❤️";

    mensaje.textContent = "¿Lista para el tercer desafío?";

    contador.style.display = "none";

    contenido.innerHTML = `

        <div class="fade">

            <button id="btnEtapa3">

                Comenzar ❤️

            </button>

        </div>

    `;

document
    .querySelector("#btnEtapa3")
    .onclick = () => {

        etapa = 5;

        preguntas = preguntasEtapa3;

        preguntaActual = 0;

        guardarEstado();

        iniciarMusica("/audio/Los Piojos - Bicho de Ciudad (Video oficial).m4a");

        mostrarPregunta();

    };

    return;


    case 6:

    mostrarEspera23();

    return;

case 7:

    titulo.textContent = "❤️ Ya son las 21:00 ❤️";

    mensaje.textContent = "Última sorpresa... ❤️";

    contador.style.display = "none";

    contenido.innerHTML = `

        <div class="fade">

            <button id="btnFinal">

                Comenzar ❤️

            </button>

        </div>

    `;

document
    .querySelector("#btnFinal")
    .onclick = () => {

        etapa = 7;

        preguntas = preguntasEtapaFinal;

        preguntaActual = 0;

        guardarEstado();

        iniciarMusica("/audio/John Legend - All of Me (Official Video).m4a");

        mostrarPregunta();

    };

    return;
    }

}




function reanudarAventura() {

    switch (etapa) {

        // ==========================
        // PRIMER ACERTIJO
        // ==========================

        case 1:

            preguntas = preguntasEtapa1;

            mostrarPregunta();

        break;


        // ==========================
        // ESPERA 13 HS
        // ==========================

        case 2:

            mostrarEspera13();

        break;


        // ==========================
        // SEGUNDO ACERTIJO
        // ==========================

        case 3:

            preguntas = preguntasEtapa2;

            mostrarPregunta();

        break;


        // ==========================
        // ESPERA 18 HS
        // ==========================

        case 4:

            mostrarEspera18();

        break;


        // ==========================
        // TERCER ACERTIJO
        // ==========================

        case 5:

            preguntas = preguntasEtapa3;

            mostrarPregunta();

        break;


        // ==========================
        // ESPERA 23 HS
        // ==========================

        case 6:

            mostrarEspera23();

        break;


        // ==========================
        // ETAPA FINAL
        // ==========================

        case 7:

            mostrarEtapa();

        break;

    }

}




function mostrarEspera13() {

    contador.style.display = "flex";

    titulo.textContent = "❤️ Nos vemos a las 13:00 ❤️";

    mensaje.textContent = "Disfrutá tu primer regalo ❤️";

    contenido.innerHTML = "";

}

function mostrarEspera18(){

    contador.style.display = "flex";

    titulo.textContent = "❤️ Nos vemos a las 18:00 ❤️";

    mensaje.textContent = "Todavía quedan sorpresas ❤️";

    contenido.innerHTML = "";

}


function mostrarEspera23(){

    contador.style.display = "flex";

    titulo.textContent = "❤️ Nos vemos a las 21:00 ❤️";

    mensaje.textContent = "Ya falta muy poquito ❤️";

    contenido.innerHTML = "";

}


function cambiarFondoFinal() {

    background.style.backgroundImage =
        'url("/img/FondoLosTresFinal.jpg")';

}


function mostrarCelebracionFinal(){

    cambiarFondoFinal();
    lanzarConfeti();
    lanzarDestellos();

    contador.style.display = "none";

    titulo.textContent = "❤️ FELIZ CUMPLEAÑOS ❤️";

    mensaje.textContent = "";

    contenido.innerHTML = `

        <div class="fade">

            <h2>

                Felicitaciones!! Llegamos al final. Se que los regalos buenos son con tu bono, pero al menos quería que tengas algo del lado sentimental. Capaz no parece pero atras de esto hay muchas horas de programación jaja. Meno basta de cháchara, tu premio final está arriba del botiquin del baño. Jamás te vas a imaginar lo que representas en mi vida, sos literalmente todo. Te amo, para siempre y todas las vidas!!


            </h2>

        </div>

    `;

}



// =========================================
// CONTADOR
// =========================================

function actualizarCuentaRegresiva() {

    const ahora = new Date();

    //====================================
    // ANTES DEL CUMPLEAÑOS
    //====================================

if (ahora < cumpleaños) {

    contador.style.display = "flex";

    const diferencia = cumpleaños - ahora;

    const d = Math.floor(diferencia / 1000 / 60 / 60 / 24);

    const h = Math.floor((diferencia / 1000 / 60 / 60) % 24);

    const m = Math.floor((diferencia / 1000 / 60) % 60);

    const s = Math.floor((diferencia / 1000) % 60);

    dias.textContent = dosDigitos(d);
    horas.textContent = dosDigitos(h);
    minutos.textContent = dosDigitos(m);
    segundos.textContent = dosDigitos(s);

    const estado = obtenerEstadoCuentaRegresiva(diferencia);

    titulo.textContent = estado.titulo;

    mensaje.textContent = estado.mensaje;

    return;

}

    //====================================
    // PRIMERA VEZ
    //====================================

if (!aventuraComenzada) {

    mostrarPantallaComenzar();
    return;

}

if (etapa === 1) {

    return;

}

    //====================================
    // ETAPA 2
    //====================================




    if (etapa === 2) {

    mostrarEspera13();

    const diferencia = etapa13 - ahora;

    if (diferencia <= 0) {

        etapa = 3;

        guardarEstado();

        mostrarEtapa();

        return;

    }

    const d = Math.floor(diferencia / 1000 / 60 / 60 / 24);

    const h = Math.floor((diferencia / 1000 / 60 / 60) % 24);

    const m = Math.floor((diferencia / 1000 / 60) % 60);

    const s = Math.floor((diferencia / 1000) % 60);

    dias.textContent = dosDigitos(d);
    horas.textContent = dosDigitos(h);
    minutos.textContent = dosDigitos(m);
    segundos.textContent = dosDigitos(s);

}


//====================================
// ETAPA 4
//====================================


if (etapa === 4) {

    mostrarEspera18();

    const diferencia = etapa18 - ahora;

    if (diferencia <= 0) {

        etapa = 5;

        guardarEstado();

        mostrarEtapa();

        return;

    }

    const d = Math.floor(diferencia / 1000 / 60 / 60 / 24);

    const h = Math.floor((diferencia / 1000 / 60 / 60) % 24);

    const m = Math.floor((diferencia / 1000 / 60) % 60);

    const s = Math.floor((diferencia / 1000) % 60);

    dias.textContent = dosDigitos(d);
    horas.textContent = dosDigitos(h);
    minutos.textContent = dosDigitos(m);
    segundos.textContent = dosDigitos(s);

}


//====================================
// ETAPA 6
//====================================

if (etapa === 6) {

    mostrarEspera23();

    const diferencia = etapa23 - ahora;

    if (diferencia <= 0) {

        etapa = 7;

        guardarEstado();

        mostrarEtapa();

        return;

    }

    const d = Math.floor(diferencia / 1000 / 60 / 60 / 24);

    const h = Math.floor((diferencia / 1000 / 60 / 60) % 24);

    const m = Math.floor((diferencia / 1000 / 60) % 60);

    const s = Math.floor((diferencia / 1000) % 60);

    dias.textContent = dosDigitos(d);
    horas.textContent = dosDigitos(h);
    minutos.textContent = dosDigitos(m);
    segundos.textContent = dosDigitos(s);

}


}


cargarEstado();



const musicaGuardada = localStorage.getItem("musicaActual");

if (
    localStorage.getItem("musica") === "on" &&
    musicaGuardada
) {

    iniciarMusica(musicaGuardada);

}

if(aventuraComenzada){

    reanudarAventura();

}

setInterval(actualizarCuentaRegresiva,1000);

actualizarCuentaRegresiva();

// =========================================
// PARTICULAS
// =========================================

function crearParticula() {

    const particula = document.createElement("div");

    particula.classList.add("particle");

    const tamaño = Math.random() * 6 + 2;

    particula.style.width = tamaño + "px";
    particula.style.height = tamaño + "px";

    particula.style.left = Math.random() * 100 + "%";

    particula.style.animationDuration = (Math.random() * 12 + 10) + "s";

    particula.style.animationDelay = Math.random() * 5 + "s";

    particula.style.opacity = Math.random() * 0.5;

    particles.appendChild(particula);

    particula.addEventListener("animationend", () => {

        particula.remove();

    });

}


function lanzarConfeti() {

    const colores = [

        "#D94C6A",
        "#F08AA2",
        "#F5E8C7",
        "#FFD166",
        "#FFFFFF"

    ];

    let cantidad = 0;

    const intervalo = setInterval(() => {

        for (let i = 0; i < 12; i++) {

            const papel = document.createElement("div");

            papel.classList.add("confetti");

            papel.style.left = Math.random() * 100 + "%";

            papel.style.background =
                colores[Math.floor(Math.random() * colores.length)];

            const tamaño = Math.random() * 10 + 6;

            papel.style.width = tamaño + "px";
            papel.style.height = tamaño * 1.8 + "px";

            papel.style.animationDuration =
                (Math.random() * 2 + 4) + "s";

            papel.style.transform =
                `rotate(${Math.random() * 360}deg)`;

            confetti.appendChild(papel);

            papel.addEventListener("animationend", () => {

                papel.remove();

            });

        }

        cantidad++;

        // 6 papeles cada 100 ms durante 5 segundos
        if (cantidad >= 80) {

            clearInterval(intervalo);

        }

    }, 100);

}



function lanzarDestellos() {

    let tiempo = 0;

    const intervalo = setInterval(() => {

        const brillo = document.createElement("div");

        brillo.classList.add("sparkle");

        brillo.style.left = Math.random() * 100 + "%";

        brillo.style.top = Math.random() * 100 + "%";

        const tamaño = Math.random() * 10 + 6;

        brillo.style.width = tamaño + "px";

        brillo.style.height = tamaño + "px";

        sparkles.appendChild(brillo);

        brillo.addEventListener("animationend", () => {

            brillo.remove();

        });

        tiempo += 120;

        if (tiempo >= 7000) {

            clearInterval(intervalo);

        }

    }, 120);

}




setInterval(() => {

    if (document.querySelectorAll(".particle").length < 35) {

        crearParticula();

    }

}, 500);

for (let i = 0; i < 25; i++) {

    crearParticula();

}




// =========================================
// BOTÓN MÚSICA
// =========================================

btnMusica.onclick = () => {

    if (musica.paused) {

        musica.play();

        btnMusica.textContent = "🔊";

    }

    else {

        detenerMusica();

    }

};





// =========================================
// BOTÓN REINICIAR (SOLO DESARROLLO)
// =========================================

document
    .querySelector("#btnReset")
    .addEventListener("click", () => {

        const confirmar = confirm(
            "¿Querés reiniciar toda la aventura?"
        );

        if (!confirmar) return;

        localStorage.removeItem("cumpleMauri2026");
        localStorage.removeItem("musica");
        localStorage.removeItem("musicaActual");

        // Vuelve al fondo inicial
        background.style.backgroundImage =
            'url("/img/EllosJugando.jpg")';

        // Detiene la música
        musica.pause();
        musica.currentTime = 0;

        location.reload();

    });