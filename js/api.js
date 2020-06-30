class API {
    constructor(apiKey) {
            this.apiKey = apiKey;
        }
        //obtener todas las monetas
    async obtenerMonedasAPI() {
        const url = `https://min-api.cryptocompare.com/data/all/coinlist?api_key=${this.apiKey}`;
        //fetch a la api
        const urlObtenerMonedas = await fetch(url);
        const monedas = await urlObtenerMonedas.json();
        //console.log(monedas);
        return {
            monedas
        }
    }

    async obtenerValores(moneda, criptomoneda) {
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}&api_key=${this.apiKey}`;
        //consultar en rest api
        const urlConvertir = await fetch(url);
        const resultado = await urlConvertir.json();

        return {
            resultado
        }
    }

}