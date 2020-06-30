class Interfaz {
    constructor() {
        this.init();
    }
    init() {
        this.construirSelect();
    }

    construirSelect() {
        cotizador.obtenerMonedasAPI()
            .then(monedas => {
                //crear un select de opsiones
                const select = document.querySelector('#criptomoneda');
                //interar por los resultados de la api
                for (const [key, value] of Object.entries(monedas.monedas.Data)) {
                    ///añadir elSYmbol y el nombre como opsiones
                    const opcion = document.createElement('option');
                    opcion.value = value.Symbol;
                    opcion.appendChild(document.createTextNode(value.CoinName));
                    select.appendChild(opcion);
                }
                //console.log(monedas.monedas.Data);
                //Object.entries toma el objeto y lo vuelve un areglo
                //console.log(Object.entries(monedas.monedas.Data));
            })

    }
    mostrarMensaje(mensaje, clases) {

        const div = document.createElement('div');
        div.className = clases;
        div.appendChild(document.createTextNode(mensaje));
        //seleccionar mensajes y mostrar contenido
        const divMensaje = document.querySelector('.mensajes');
        divMensaje.appendChild(div);

        setTimeout(() => {
            document.querySelector('.mensajes div').remove();
        }, 2000);
    }

    //imprime el resultado de la cotizacion de la priptomoneda
    mostrarResultado(resultado, moneda, crypto) {
            // en caso de un resultado anterior ocultarlo
            const resultadoAnterior = document.querySelector('#resultado > div');

            if (resultadoAnterior) {
                resultadoAnterior.remove();
            }


            const datosMoneda = resultado[crypto][moneda];
            console.log(datosMoneda);

            //recortar dijitos de precio
            let precio = datosMoneda.PRICE.toFixed(3);
            let porcentaje = datosMoneda.CHANGEPCTDAY.toFixed(3),
                actualizado = new Date(datosMoneda.LASTUPDATE * 1000).toLocaleDateString('es-MX');


            //construir el tamplate
            let templateHTML = `
        <div class ="card bg-warning">
        <div class ="card-body text-light">
        <h2 class="card-title>" >Resultado: </h2>
        <p>El precio de ${datosMoneda.FROMSYMBOL} a moneda ${datosMoneda.TOSYMBOL} es de: $ ${precio}</p>
        <p>Variación del ultimo día % ${porcentaje}</p>
        <p>Ultima actualizacion: ${actualizado}</p>
        </div>
        </div>
        `;
            this.mostrarOcultarSpiner('block');
            setTimeout(() => {
                //insertar resultado
                document.querySelector('#resultado').innerHTML = templateHTML;
                //ocultar el spiner
                this.mostrarOcultarSpiner('none')
            }, 3000)

        }
        //mostrar espiner de carga al enviar la cotizacion
    mostrarOcultarSpiner(vista) {
        const spiner = document.querySelector('.contenido-spinner');
        spiner.style.display = vista;

    }


}