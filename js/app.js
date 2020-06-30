const cotizador = new API('69bdb902a37521110230eb3ce82ac62982ff171b2e431dd0b6ec2ab4bdd7ea2f');
const ui = new Interfaz();

//cotizador.obtenerMonedasAPI();

//leer el formulario
const formulario = document.querySelector('#formulario');
//agregar event listener
formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    //leer la moneda seleccionada
    const monedaSelect = document.querySelector('#moneda');
    const monenaSelecionada = monedaSelect.options[monedaSelect.selectedIndex].value;
    //leer la criptomoneda seleccionada
    const criptoMonedaSelect = document.querySelector('#criptomoneda');
    const criptoMonenaSelecionada = criptoMonedaSelect.options[criptoMonedaSelect.selectedIndex].value;
    //comprovar que ambos campos esten seleccionados

    if (monenaSelecionada === '' || criptoMonenaSelecionada === '') {
        ui.mostrarMensaje('Ambos campos son obligatorios', 'alert bg-danger text-center');
    } else {
        cotizador.obtenerValores(monenaSelecionada, criptoMonenaSelecionada)
            .then(data => {
                ui.mostrarResultado(data.resultado.RAW, monenaSelecionada, criptoMonenaSelecionada);
            })
    }


});