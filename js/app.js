//! Variables

const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

//! addEventListeners

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
})

//! Funciones

function buscarClima(e) {
    e.preventDefault();

    //? Validar
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if (ciudad === '' || pais === '') {
        mostrarError('Ambos campos son obligatorios');

        return;
    }
    //? Consular la API
    consultarAPI(ciudad, pais);
}

function mostrarError(mensaje) {

    const alerta = document.querySelector('.bg-red-100');

    if (!alerta) { // Si la alerta esta activa no repite la notificacion en pantalla
        const alerta = document.createElement('div');
        alerta.classList.add('bg-red-100', "border-red-400", "text-red-700", "px-4", "py-3", "rounded", "relative", "max-w-md", "mx-auto", "mt-6", "text-center");

        alerta.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <span class="block sm:inline">${mensaje}</span>
        `;

        container.appendChild(alerta);

        setTimeout(() => {
            alerta.remove();
        }, 3000);

    }
}

function consultarAPI(cuidad, pais) {

    limpiarHTML();

    const appID = '3a5d0897de2f622ae439fd50ef9d5935';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cuidad},${pais}&appid=${appID}`

    //* Muestra un Spinner de carga
    Spinner();

    fetch(url)
        .then(respuesta => respuesta.json()) // .then(respuesta => { return respuesta.json()})
        .then(datos => {

            limpiarHTML();
            if (datos.cod === '404') {
                mostrarError('Ciudad no encontrada');
                return;
            }

            mostrarClima(datos);
        })
        .catch(error => console.log(error))
}

function mostrarClima(datos) {

    const { name, main: { temp, temp_max, temp_min } } = datos;

    const centigrados = kelvinAGrados(temp);
    const max = kelvinAGrados(temp_max);
    const min = kelvinAGrados(temp_min);

    //TODO Temperatura actual
    const actual = document.createElement('P');
    actual.innerHTML = `${centigrados} &#8451`;
    actual.classList.add('font-bold', 'text-6xl');

    //TODO Temperatura Max
    const tempMax = document.createElement('P');
    tempMax.innerHTML = `Max: ${max} &#8451`;
    tempMax.classList.add('text-xl');

    //TODO Temperatura Min
    const tempMin = document.createElement('P');
    tempMin.innerHTML = `Min: ${min} &#8451`;
    tempMin.classList.add('text-xl');

    //TODO Nombre de la Ciudad
    const nombreCiudad = document.createElement('P');
    nombreCiudad.textContent = `Clima en ${name}`;
    nombreCiudad.classList.add('font-bold', 'text-2xl')

    const resultadoDiv = document.createElement('DIV');
    resultadoDiv.classList.add('text-center', 'text-white');

    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMax);
    resultadoDiv.appendChild(tempMin);

    resultado.appendChild(resultadoDiv);
}


function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function kelvinAGrados(grados) {            // const kelvinAGrados = grados => (grados - 273.15).toFixed(1);
    return (grados - 273.15).toFixed(1);
}

function Spinner() {

    limpiarHTML();

    const divSpinner = document.createElement('DIV');
    divSpinner.classList.add('sk-fading-circle');

    divSpinner.innerHTML = `
  <div class="sk-circle1 sk-circle"></div>
  <div class="sk-circle2 sk-circle"></div>
  <div class="sk-circle3 sk-circle"></div>
  <div class="sk-circle4 sk-circle"></div>
  <div class="sk-circle5 sk-circle"></div>
  <div class="sk-circle6 sk-circle"></div>
  <div class="sk-circle7 sk-circle"></div>
  <div class="sk-circle8 sk-circle"></div>
  <div class="sk-circle9 sk-circle"></div>
  <div class="sk-circle10 sk-circle"></div>
  <div class="sk-circle11 sk-circle"></div>
  <div class="sk-circle12 sk-circle"></div>
    `

    resultado.appendChild(divSpinner);
}





















