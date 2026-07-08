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

const particles = document.querySelector("#particles");

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
etapa23.setHours(23, 0, 0, 0);

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

        memeCorrecto: "/img/memes/correcto1.png",
        memeIncorrecto: "/img/memes/incorrecto1.jpg"
    },

    {
        pregunta: "¿Cual fué la verdura que te olvidaste de comprar, indispensable para lo que íbamos a cocinar?",
        respuesta: "Puerro",

        memeCorrecto: "/img/memes/correcto2.png",
        memeIncorrecto: "/img/memes/incorrecto2.png"
    },

    {
        pregunta: "La respuesta a nuestro código secreto (específicamente a este): 'El año pasó más rápido...' ",
        respuesta: "Es el efecto placebo",

        memeCorrecto: "/img/memes/correcto3.png",
        memeIncorrecto: "/img/memes/incorrecto3.png"
    }

];

// =========================================
// MENSAJES
// =========================================

function obtenerMensaje(restante) {

    const diasRestantes = restante / 1000 / 60 / 60 / 24;

    if (diasRestantes > 10) {
        return "Paciencia, todavía faltan:";
    }

    if (diasRestantes > 7) {
        return "Cada segundo nos acerca un poquito más.";
    }

    if (diasRestantes > 3) {
        return "Una semana más... prometo que la espera va a valer la pena.";
    }

    if (diasRestantes > 1) {
        return "Ya casi puedo dejar de guardar el secreto.";
    }

    if (diasRestantes > 0.02) {
        return "Mañana empieza esta pequeña aventura.";
    }

    return "Respirá hondo... estamos a segundos de comenzar.";

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

iniciarIntroduccion();

    };

}




async function iniciarIntroduccion() {

    const frases = [

        "Si estás viendo esto...",

        "Es porque por fin llegó el día.",

        "Feliz cumpleaños ❤️"

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

    preguntaActual = 0;

guardarEstado();

    mostrarPregunta();

}




function mostrarPregunta() {

    const p = preguntas[preguntaActual];

    titulo.textContent = `Pregunta ${preguntaActual + 1} de ${preguntas.length}`;

    mensaje.textContent = "";

    contenido.innerHTML = `

        <div class="fade">

            <h2>${p.pregunta}</h2>

            <br>

            <input
                id="respuestaUsuario"
                autocomplete="off"
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

}



function verificarRespuesta() {

    const p = preguntas[preguntaActual];

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

            titulo.textContent = "❤️ Excelente ❤️";

            mensaje.textContent = "";

            contenido.innerHTML = `

                <div class="fade">

                    <h2>

                        Terminaste el primer desafío, hermosa.
                        Demostraste una gran sabiduría.
                        El premio a esta hazaña lo vas a encontrar
                        adentro de una cartera tuya 😏

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

            mensaje.textContent = "";

            contador.style.display = "none";

            contenido.innerHTML = `

                <div class="fade">

                    <button id="btnEtapa2">

                        Comenzar ❤️

                    </button>

                </div>

            `;

            return;

    }

}




function mostrarEspera13() {

    contador.style.display = "flex";

    titulo.textContent = "❤️ Nos vemos a las 13:00 ❤️";

    mensaje.textContent = "Disfrutá tu primer regalo ❤️";

    contenido.innerHTML = "";

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

        mensaje.textContent = obtenerMensaje(diferencia);

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
// if (etapa === 2) {

//     // Si ya llegó la hora, pasamos inmediatamente a la etapa siguiente.
//     if (ahora >= etapa13) {

//         etapa = 3;
//         guardarEstado();

//         // Más adelante acá llamaremos al segundo acertijo.
//         return;

//     }

//     contador.style.display = "flex";

//     titulo.textContent = "❤️ Nos vemos a las 13:00 ❤️";

//     mensaje.textContent = "Disfrutá tu primer regalo ❤️";

//     contenido.innerHTML = "";

//     const diferencia = etapa13 - ahora;

//     const d = Math.floor(diferencia / 1000 / 60 / 60 / 24);

//     const h = Math.floor((diferencia / 1000 / 60 / 60) % 24);

//     const m = Math.floor((diferencia / 1000 / 60) % 60);

//     const s = Math.floor((diferencia / 1000) % 60);

//     dias.textContent = dosDigitos(d);
//     horas.textContent = dosDigitos(h);
//     minutos.textContent = dosDigitos(m);
//     segundos.textContent = dosDigitos(s);

// }

}


cargarEstado();



setInterval(actualizarCuentaRegresiva, 1000);

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

setInterval(() => {

    if (document.querySelectorAll(".particle").length < 35) {

        crearParticula();

    }

}, 500);

for (let i = 0; i < 25; i++) {

    crearParticula();

}





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

        location.reload();

    });