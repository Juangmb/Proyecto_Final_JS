const peticionCartera = new XMLHttpRequest()
const peticionTransacciones = new XMLHttpRequest()
const peticionCompraVenta = new XMLHttpRequest()
const peticionRates = new XMLHttpRequest()
const peticionNuevo = new XMLHttpRequest()
const peticionInvertido = new XMLHttpRequest()
const peticionCarteraMaximo = new XMLHttpRequest()

var contadorATOM = 0
var contadorBCH = 0
var contadorBNB = 0
var contadorBTC = 0
var contadorETH = 0
var contadorLINK = 0
var contadorLUNA = 0
var contadorSOL = 0
var contadorUSDT = 0

var rates = {/*
    "ATOM": {
      "ATOM": 1, 
      "BCH": 0.07289380503283148, 
      "BNB": 0.05792837341768437, 
      "BTC": 0.0005776320856348577, 
      "ETH": 0.007842371301665473, 
      "EUR": 22.115001521691166, 
      "LINK": 1.7297255493939008, 
      "LUNA": 0.2478938490176412, 
      "SOL": 0.2277296102074821, 
      "USDT": 23.961938355536912
    }, 
    "BCH": {
      "ATOM": 13.718586916262614, 
      "BCH": 1, 
      "BNB": 0.7946954256482199, 
      "BTC": 0.007924295972403845, 
      "ETH": 0.10758625233150136, 
      "EUR": 303.38657052860026, 
      "LINK": 23.729390290640332, 
      "LUNA": 3.4007533137553927, 
      "SOL": 3.1241284510379494, 
      "USDT": 328.72393401256
    }, 
    "BNB": {
      "ATOM": 17.26269772482029, 
      "BCH": 1.2583437222937537, 
      "BNB": 1, 
      "BTC": 0.009971488090472056, 
      "ETH": 0.13538048522645646, 
      "EUR": 381.7645864528953, 
      "LINK": 29.85972930608561, 
      "LUNA": 4.279316583433778, 
      "SOL": 3.931227424002912, 
      "USDT": 413.647698732411
    }, 
    "BTC": {
      "ATOM": 1731.205770712911, 
      "BCH": 126.1941759220597, 
      "BNB": 100.28593434870758, 
      "BTC": 1, 
      "ETH": 13.57675845351659, 
      "EUR": 38285.618253676555, 
      "LINK": 2994.5108528602814, 
      "LUNA": 429.1552619435755, 
      "SOL": 394.2468153533949, 
      "USDT": 41483.04595857254
    }, 
    "ETH": {
      "ATOM": 127.51245274342361, 
      "BCH": 9.294867869537258, 
      "BNB": 7.386588977925874, 
      "BTC": 0.0736552840226, 
      "ETH": 1, 
      "EUR": 2819.938086455386, 
      "LINK": 220.5615473761822, 
      "LUNA": 31.60955270824736, 
      "SOL": 29.03836115985984, 
      "USDT": 3055.44553220123
    }, 
    "EUR": {
      "ATOM": 0.04521817459606164, 
      "BCH": 0.003296124802945851, 
      "BNB": 0.0026194153032667077, 
      "BTC": 2.6119468500524225e-05, 
      "ETH": 0.0003546177147658525, 
      "EUR": 1, 
      "LINK": 0.07821503189576205, 
      "LUNA": 0.011209307346169442, 
      "SOL": 0.010297517275054987, 
      "USDT": 1.0835151122207343
    }, 
    "LINK": {
      "ATOM": 0.5781263971908156, 
      "BCH": 0.04214183288116061, 
      "BNB": 0.03348992181909008, 
      "BTC": 0.00033394435656989695, 
      "ETH": 0.004533881866064507, 
      "EUR": 12.785266153604718, 
      "LINK": 1, 
      "LUNA": 0.1433139778183329, 
      "SOL": 0.1316564990829204, 
      "USDT": 13.853029091194971
    }, 
    "LUNA": {
      "ATOM": 4.033984723553329, 
      "BCH": 0.294052495944117, 
      "BNB": 0.2336821734272315, 
      "BTC": 0.002330159009285264, 
      "ETH": 0.03163600602735155, 
      "EUR": 89.21157829986079, 
      "LINK": 6.977686442194885, 
      "LUNA": 1, 
      "SOL": 0.9186577686777371, 
      "USDT": 96.66209327296248
    }, 
    "SOL": {
      "ATOM": 4.391172492188917, 
      "BCH": 0.3200892715111517, 
      "BNB": 0.25437347986898334, 
      "BTC": 0.0025364821250455, 
      "ETH": 0.034437205133405216, 
      "EUR": 97.1107863467663, 
      "LINK": 7.59552325153486, 
      "LUNA": 1.0885446507890988, 
      "SOL": 1, 
      "USDT": 105.22100456636024
    }, 
    "USDT": {
      "ATOM": 0.04173285087218034, 
      "BCH": 0.003042066294940945, 
      "BNB": 0.0024175161691081973, 
      "BTC": 2.4106233688786017e-05, 
      "ETH": 0.0003272845120166719, 
      "EUR": 0.9229220605427786, 
      "LINK": 0.07218637840265586, 
      "LUNA": 0.010345317033184007, 
      "SOL": 0.009503805861968606, 
      "USDT": 1
    }*/
  }



/*FUNCIONES CREAN TABLAS CARTERA TRANSACCIONES*/

function listaCartera () {
    const campos = ["from_moneda", "from_cantidad", "to_moneda", "to_cantidad"]

    if (this.readyState === 4 && this.status === 200) {
        const respuesta = JSON.parse(this.responseText)
        const transacciones = respuesta.data

        const tbody = document.querySelector("#tbody-cartera")
        tbody.innerHTML = ""

        contadorATOM = 0
        valorATOM = 0
        contadorBCH = 0
        valorBCH = 0
        contadorBNB = 0
        valorBNB = 0
        contadorBTC = 0
        valorBTC = 0
        contadorETH = 0
        valorETH = 0
        contadorLINK = 0
        valorLINK = 0
        contadorLUNA = 0
        valorLUNA = 0
        contadorSOL = 0
        valorSOL = 0
        contadorUSDT = 0
        valorUSDT = 0

        for (let i = 0; i < transacciones.length; i++) {
            const activo = transacciones[i]
            for (campo of campos) {
                if (campo === "from_moneda") {
                    if (activo[campo] === "ATOM") {
                        contadorATOM -= activo["from_cantidad"]
                    }
                } if (campo === "to_moneda") {
                    if (activo[campo] === "ATOM") {
                        contadorATOM += activo["to_cantidad"]
                    }
                }
                if (campo === "from_moneda") {
                    if (activo[campo] === "BCH") {
                        contadorBCH -= activo["from_cantidad"]
                    }
                } if (campo === "to_moneda") {
                    if (activo[campo] === "BCH") {
                        contadorBCH += activo["to_cantidad"]
                    }
                } 
                if (campo === "from_moneda") {
                    if (activo[campo] === "BNB") {
                        contadorBNB -= activo["from_cantidad"]
                    }
                } if (campo === "to_moneda") {
                    if (activo[campo] === "BNB") {
                        contadorBNB += activo["to_cantidad"]
                    }
                }
                if (campo === "from_moneda") {
                    if (activo[campo] === "BTC") {
                        contadorBTC -= activo["from_cantidad"]
                    }
                } if (campo === "to_moneda") {
                    if (activo[campo] === "BTC") {
                        contadorBTC += activo["to_cantidad"]
                    }
                }
                if (campo === "from_moneda") {
                    if (activo[campo] === "ETH") {
                        contadorETH -= activo["from_cantidad"]
                    }
                } if (campo === "to_moneda") {
                    if (activo[campo] === "ETH") {
                        contadorETH += activo["to_cantidad"]
                    }
                }
                if (campo === "from_moneda") {
                    if (activo[campo] === "LINK") {
                        contadorLINK -= activo["from_cantidad"]
                    }
                } if (campo === "to_moneda") {
                    if (activo[campo] === "LINK") {
                        contadorLINK += activo["to_cantidad"]
                    }
                }
                if (campo === "from_moneda") {
                    if (activo[campo] === "LUNA") {
                        contadorLUNA -= activo["from_cantidad"]
                    }
                } if (campo === "to_moneda") {
                    if (activo[campo] === "LUNA") {
                        contadorLUNA += activo["to_cantidad"]
                    }
                }
                if (campo === "from_moneda") {
                    if (activo[campo] === "SOL") {
                        contadorSOL -= activo["from_cantidad"]
                    }
                } if (campo === "to_moneda") {
                    if (activo[campo] === "SOL") {
                        contadorSOL += activo["to_cantidad"]
                    }
                }
                if (campo === "from_moneda") {
                    if (activo[campo] === "USDT") {
                        contadorUSDT -= activo["from_cantidad"]
                    }
                } if (campo === "to_moneda") {
                    if (activo[campo] === "USDT") {
                        contadorUSDT += activo["to_cantidad"]
                    }
                }
            }
        
        }
        if (contadorATOM !== 0) {
            const fila = document.createElement("tr")
            const celdaCripto = document.createElement("td")
            celdaCripto.innerHTML = "ATOM"
            const celdaCantidad = document.createElement("td")
            celdaCantidad.innerHTML = contadorATOM.toFixed(2)
            const celdaValor = document.createElement("td")
            celdaValor.innerHTML = (contadorATOM * rates["ATOM"]["EUR"]).toFixed(2) + " €"
            celdaValor.classList.add("ValorActual")
            fila.appendChild(celdaCripto)
            fila.appendChild(celdaCantidad)
            fila.appendChild(celdaValor)
            tbody.appendChild(fila)
        }
        if (contadorBCH !== 0) {
            const fila = document.createElement("tr")
            const celdaCripto = document.createElement("td")
            celdaCripto.innerHTML = "BCH"
            const celdaCantidad = document.createElement("td")
            celdaCantidad.innerHTML = contadorBCH.toFixed(2)
            const celdaValor = document.createElement("td")
            celdaValor.innerHTML = (contadorBCH * rates["BCH"]["EUR"]).toFixed(2) + " €"
            celdaValor.classList.add("ValorActual")
            fila.appendChild(celdaCripto)
            fila.appendChild(celdaCantidad)
            fila.appendChild(celdaValor)
            tbody.appendChild(fila)
        }
        if (contadorBNB !== 0) {
            const fila = document.createElement("tr")
            const celdaCripto = document.createElement("td")
            celdaCripto.innerHTML = "BNB"
            const celdaCantidad = document.createElement("td")
            celdaCantidad.innerHTML = contadorBNB.toFixed(2)
            const celdaValor = document.createElement("td")
            celdaValor.innerHTML = (contadorBNB * rates["BNB"]["EUR"]).toFixed(2) + " €"
            celdaValor.classList.add("ValorActual")
            fila.appendChild(celdaCripto)
            fila.appendChild(celdaCantidad)
            fila.appendChild(celdaValor)
            tbody.appendChild(fila)
        }
        if (contadorBTC !== 0) {
            const fila = document.createElement("tr")
            const celdaCripto = document.createElement("td")
            celdaCripto.innerHTML = "BTC"
            const celdaCantidad = document.createElement("td")
            celdaCantidad.innerHTML = contadorBTC.toFixed(2)
            const celdaValor = document.createElement("td")
            celdaValor.innerHTML = (contadorBTC * rates["BTC"]["EUR"]).toFixed(2) + " €"
            celdaValor.classList.add("ValorActual")
            fila.appendChild(celdaCripto)
            fila.appendChild(celdaCantidad)
            fila.appendChild(celdaValor)
            tbody.appendChild(fila)
        }
        if (contadorETH !== 0) {
            const fila = document.createElement("tr")
            const celdaCripto = document.createElement("td")
            celdaCripto.innerHTML = "ETH"
            const celdaCantidad = document.createElement("td")
            celdaCantidad.innerHTML = contadorETH.toFixed(2)
            const celdaValor = document.createElement("td")
            celdaValor.innerHTML = (contadorETH * rates["ETH"]["EUR"]).toFixed(2) + " €"
            celdaValor.classList.add("ValorActual")
            fila.appendChild(celdaCripto)
            fila.appendChild(celdaCantidad)
            fila.appendChild(celdaValor)
            tbody.appendChild(fila)
        }
        if (contadorLINK !== 0) {
            const fila = document.createElement("tr")
            const celdaCripto = document.createElement("td")
            celdaCripto.innerHTML = "LINK"
            const celdaCantidad = document.createElement("td")
            celdaCantidad.innerHTML = contadorLINK.toFixed(2)
            const celdaValor = document.createElement("td")
            celdaValor.innerHTML = (contadorLINK * rates["LINK"]["EUR"]).toFixed(2) + " €"
            celdaValor.classList.add("ValorActual")
            fila.appendChild(celdaCripto)
            fila.appendChild(celdaCantidad)
            fila.appendChild(celdaValor)
            tbody.appendChild(fila)
        }
        if (contadorLUNA !== 0) {
            const fila = document.createElement("tr")
            const celdaCripto = document.createElement("td")
            celdaCripto.innerHTML = "LUNA"
            const celdaCantidad = document.createElement("td")
            celdaCantidad.innerHTML = contadorLUNA.toFixed(2)
            const celdaValor = document.createElement("td")
            celdaValor.innerHTML = (contadorLUNA * rates["LUNA"]["EUR"]).toFixed(2) + " €"
            celdaValor.classList.add("ValorActual")
            fila.appendChild(celdaCripto)
            fila.appendChild(celdaCantidad)
            fila.appendChild(celdaValor)
            tbody.appendChild(fila)
            
        }
        if (contadorSOL !== 0) {
            const fila = document.createElement("tr")
            const celdaCripto = document.createElement("td")
            celdaCripto.innerHTML = "SOL"
            const celdaCantidad = document.createElement("td")
            celdaCantidad.innerHTML = contadorSOL.toFixed(2)
            const celdaValor = document.createElement("td")
            celdaValor.innerHTML = (contadorSOL * rates["SOL"]["EUR"]).toFixed(2) + " €"
            celdaValor.classList.add("ValorActual")
            fila.appendChild(celdaCripto)
            fila.appendChild(celdaCantidad)
            fila.appendChild(celdaValor)
            tbody.appendChild(fila)
          
        }
        if (contadorUSDT !== 0) {
            const fila = document.createElement("tr")
            const celdaCripto = document.createElement("td")
            celdaCripto.innerHTML = "USDT"
            const celdaCantidad = document.createElement("td")
            celdaCantidad.innerHTML = contadorUSDT.toFixed(2)
            const celdaValor = document.createElement("td")
            celdaValor.innerHTML = (contadorUSDT * rates["USDT"]["EUR"]).toFixed(2) + " €"
            celdaValor.classList.add("ValorActual")
            fila.appendChild(celdaCripto)
            fila.appendChild(celdaCantidad)
            fila.appendChild(celdaValor)
            tbody.appendChild(fila)
           
        }
    } else {
        alert("Se ha producido un error contadores. Inténtelo de nuevo más tarde")
    }
}

function listaTransacciones () {
    const campos = ["fecha", "hora", "from_moneda", "from_cantidad", "to_moneda", "to_cantidad"]

    if (this.readyState === 4 && this.status === 200) {
        const respuesta = JSON.parse(this.responseText)
        const transacciones = respuesta.data

        const tbody = document.querySelector("#tbody-transacciones")
        
        tbody.innerHTML = ""
        
        
        for (let i = 0; i < transacciones.length; i++) {
            const fila = document.createElement("tr")
            const movimiento = transacciones[i]
            for (campo of campos) {
                if (campo === "from_cantidad" || campo === "to_cantidad") {
                    const celda = document.createElement("td")
                    celda.innerHTML = movimiento[campo].toFixed(2)
                    fila.appendChild(celda)
                } else {
                    const celda = document.createElement("td")
                    celda.innerHTML = movimiento[campo]
                    fila.appendChild(celda)
                }
            }
            tbody.appendChild(fila)
        }
        
    } else {
        alert("Se ha producido un error lista trans. Inténtelo de nuevo más tarde")
    }
}

function invertido () {
    const campos = ["from_moneda", "from_cantidad", "to_moneda", "to_cantidad"]
    if (this.readyState === 4 && this.status === 200) {
        const respuesta = JSON.parse(this.responseText)
        const transacciones = respuesta.data

        const tbodyInv = document.querySelector("#tbody-inversion")
        tbodyInv.innerHTML = ""
        let inversion = 0

        for (let i = 0; i < transacciones.length; i++) {
            if (transacciones[i]["from_moneda"] == "EUR") {
                inversion += parseFloat(transacciones[i]["from_cantidad"])
            } else if (transacciones[i]["to_moneda"] == "EUR") {
                inversion -= parseFloat(transacciones[i]["to_cantidad"])
            }
        }

        let sumatorio = 0
        todos = document.getElementsByClassName("ValorActual")
        for (let i = 0; i < todos.length; i++) {
            sumatorio += parseFloat(todos[i].innerHTML)
        }
        const filaInv = document.createElement("tr")
        const celdaInv = document.createElement("td")
        celdaInv.innerHTML = inversion.toFixed(2) +" €"
        celdaInv.classList.add("InversionRealizada")
        filaInv.appendChild(celdaInv)

        let retorno = sumatorio - inversion
        const celdaRetorno = document.createElement("td")
        celdaRetorno.innerHTML = retorno.toFixed(2) + " €"
        filaInv.appendChild(celdaRetorno)
        tbodyInv.appendChild(filaInv)
        
    } else {
        alert("Se ha producido un error invertido")
    }

}


/*FUNCION RECUPERA RATES PARA COMPRA/VENTA E INVERSION */

function recupera_rates () {
    if (this.readyState === 4 && this.status === 200) {
        const respuesta = JSON.parse(this.responseText)
        rates = respuesta.data
    } else {
        alert("Se ha producido un error rates")
    }
}


/*FUNCIONES COMPRA/VENTA */

function seleccion_origen () {
    document.getElementById("destino").removeAttribute("disabled")
    document.getElementById("cantidad_origen").removeAttribute("disabled")
    const opciones = document.getElementById("origen")
    const seleccionado = opciones.selectedOptions
    if (seleccionado.item(0).text === "ATOM") {
        document.getElementById("atom-destino").setAttribute("disabled", "true")
        document.getElementById("bch-destino").removeAttribute("disabled")
        document.getElementById("bnb-destino").removeAttribute("disabled")
        document.getElementById("btc-destino").removeAttribute("disabled")
        document.getElementById("eth-destino").removeAttribute("disabled")
        document.getElementById("eur-destino").removeAttribute("disabled")
        document.getElementById("link-destino").removeAttribute("disabled")
        document.getElementById("luna-destino").removeAttribute("disabled")
        document.getElementById("sol-destino").removeAttribute("disabled")
        document.getElementById("usdt-destino").removeAttribute("disabled")
    } if (seleccionado.item(0).text === "BCH") {
        document.getElementById("bch-destino").setAttribute("disabled", "true")
        document.getElementById("atom-destino").removeAttribute("disabled")
        document.getElementById("bnb-destino").removeAttribute("disabled")
        document.getElementById("btc-destino").removeAttribute("disabled")
        document.getElementById("eth-destino").removeAttribute("disabled")
        document.getElementById("eur-destino").removeAttribute("disabled")
        document.getElementById("link-destino").removeAttribute("disabled")
        document.getElementById("luna-destino").removeAttribute("disabled")
        document.getElementById("sol-destino").removeAttribute("disabled")
        document.getElementById("usdt-destino").removeAttribute("disabled")
    } if (seleccionado.item(0).text === "BNB") {
        document.getElementById("bnb-destino").setAttribute("disabled", "true")
        document.getElementById("atom-destino").removeAttribute("disabled")
        document.getElementById("bch-destino").removeAttribute("disabled")
        document.getElementById("btc-destino").removeAttribute("disabled")
        document.getElementById("eth-destino").removeAttribute("disabled")
        document.getElementById("eur-destino").removeAttribute("disabled")
        document.getElementById("link-destino").removeAttribute("disabled")
        document.getElementById("luna-destino").removeAttribute("disabled")
        document.getElementById("sol-destino").removeAttribute("disabled")
        document.getElementById("usdt-destino").removeAttribute("disabled")
    } if (seleccionado.item(0).text === "BTC") {
        document.getElementById("btc-destino").setAttribute("disabled", "true")
        document.getElementById("atom-destino").removeAttribute("disabled")
        document.getElementById("bch-destino").removeAttribute("disabled")
        document.getElementById("bnb-destino").removeAttribute("disabled")
        document.getElementById("eth-destino").removeAttribute("disabled")
        document.getElementById("eur-destino").removeAttribute("disabled")
        document.getElementById("link-destino").removeAttribute("disabled")
        document.getElementById("luna-destino").removeAttribute("disabled")
        document.getElementById("sol-destino").removeAttribute("disabled")
        document.getElementById("usdt-destino").removeAttribute("disabled")
    } if (seleccionado.item(0).text === "ETH") {
        document.getElementById("eth-destino").setAttribute("disabled", "true")
        document.getElementById("atom-destino").removeAttribute("disabled")
        document.getElementById("bch-destino").removeAttribute("disabled")
        document.getElementById("bnb-destino").removeAttribute("disabled")
        document.getElementById("btc-destino").removeAttribute("disabled")
        document.getElementById("eur-destino").removeAttribute("disabled")
        document.getElementById("link-destino").removeAttribute("disabled")
        document.getElementById("luna-destino").removeAttribute("disabled")
        document.getElementById("sol-destino").removeAttribute("disabled")
        document.getElementById("usdt-destino").removeAttribute("disabled")
    } if (seleccionado.item(0).text === "EUR") {
        document.getElementById("eur-destino").setAttribute("disabled", "true")
        document.getElementById("atom-destino").removeAttribute("disabled")
        document.getElementById("bch-destino").removeAttribute("disabled")
        document.getElementById("bnb-destino").removeAttribute("disabled")
        document.getElementById("btc-destino").removeAttribute("disabled")
        document.getElementById("eth-destino").removeAttribute("disabled")
        document.getElementById("link-destino").removeAttribute("disabled")
        document.getElementById("luna-destino").removeAttribute("disabled")
        document.getElementById("sol-destino").removeAttribute("disabled")
        document.getElementById("usdt-destino").removeAttribute("disabled")
    } if (seleccionado.item(0).text === "LINK") {
        document.getElementById("link-destino").setAttribute("disabled", "true")
        document.getElementById("atom-destino").removeAttribute("disabled")
        document.getElementById("bch-destino").removeAttribute("disabled")
        document.getElementById("bnb-destino").removeAttribute("disabled")
        document.getElementById("btc-destino").removeAttribute("disabled")
        document.getElementById("eth-destino").removeAttribute("disabled")
        document.getElementById("eur-destino").removeAttribute("disabled")
        document.getElementById("luna-destino").removeAttribute("disabled")
        document.getElementById("sol-destino").removeAttribute("disabled")
        document.getElementById("usdt-destino").removeAttribute("disabled")
    } if (seleccionado.item(0).text === "LUNA") {
        document.getElementById("luna-destino").setAttribute("disabled", "true")
        document.getElementById("atom-destino").removeAttribute("disabled")
        document.getElementById("bch-destino").removeAttribute("disabled")
        document.getElementById("bnb-destino").removeAttribute("disabled")
        document.getElementById("btc-destino").removeAttribute("disabled")
        document.getElementById("eth-destino").removeAttribute("disabled")
        document.getElementById("eur-destino").removeAttribute("disabled")
        document.getElementById("link-destino").removeAttribute("disabled")
        document.getElementById("sol-destino").removeAttribute("disabled")
        document.getElementById("usdt-destino").removeAttribute("disabled")
    } if (seleccionado.item(0).text === "SOL") {
        document.getElementById("sol-destino").setAttribute("disabled", "true")
        document.getElementById("atom-destino").removeAttribute("disabled")
        document.getElementById("bch-destino").removeAttribute("disabled")
        document.getElementById("bnb-destino").removeAttribute("disabled")
        document.getElementById("btc-destino").removeAttribute("disabled")
        document.getElementById("eth-destino").removeAttribute("disabled")
        document.getElementById("eur-destino").removeAttribute("disabled")
        document.getElementById("link-destino").removeAttribute("disabled")
        document.getElementById("luna-destino").removeAttribute("disabled")
        document.getElementById("usdt-destino").removeAttribute("disabled")
    } if (seleccionado.item(0).text === "USDT") {
        document.getElementById("usdt-destino").setAttribute("disabled", "true")
        document.getElementById("atom-destino").removeAttribute("disabled")
        document.getElementById("bch-destino").removeAttribute("disabled")
        document.getElementById("bnb-destino").removeAttribute("disabled")
        document.getElementById("btc-destino").removeAttribute("disabled")
        document.getElementById("eth-destino").removeAttribute("disabled")
        document.getElementById("eur-destino").removeAttribute("disabled")
        document.getElementById("link-destino").removeAttribute("disabled")
        document.getElementById("luna-destino").removeAttribute("disabled")
        document.getElementById("sol-destino").removeAttribute("disabled")

    } 

}

function calcula_maximo () {
    if (this.readyState === 4 && this.status === 200) {
        const respuesta = JSON.parse(this.responseText)
        const cartera = respuesta.data
        const opciones = document.getElementById("origen")
        const seleccionado = opciones.selectedOptions
        const campos = ["from_moneda", "from_cantidad", "to_moneda", "to_cantidad"]

        contadorATOM = 0
        contadorBCH = 0
        contadorBNB = 0
        contadorBTC = 0
        contadorETH = 0
        contadorLINK = 0
        contadorLUNA = 0
        contadorSOL = 0
        contadorUSDT = 0

        for (let i = 0; i < cartera.length; i++) {
            const activo = cartera[i]
            for (campo of campos) {
                if (campo === "from_moneda") {
                    if (activo[campo] === "ATOM") {
                        contadorATOM -= activo["from_cantidad"]
                    }
                } if (campo === "to_moneda") {
                    if (activo[campo] === "ATOM") {
                        contadorATOM += activo["to_cantidad"]
                    }
                }
                if (campo === "from_moneda") {
                    if (activo[campo] === "BCH") {
                        contadorBCH -= activo["from_cantidad"]
                    }
                } if (campo === "to_moneda") {
                    if (activo[campo] === "BCH") {
                        contadorBCH += activo["to_cantidad"]
                    }
                } 
                if (campo === "from_moneda") {
                    if (activo[campo] === "BNB") {
                        contadorBNB -= activo["from_cantidad"]
                    }
                } if (campo === "to_moneda") {
                    if (activo[campo] === "BNB") {
                        contadorBNB += activo["to_cantidad"]
                    }
                }
                if (campo === "from_moneda") {
                    if (activo[campo] === "BTC") {
                        contadorBTC -= activo["from_cantidad"]
                    }
                } if (campo === "to_moneda") {
                    if (activo[campo] === "BTC") {
                        contadorBTC += activo["to_cantidad"]
                    }
                }
                if (campo === "from_moneda") {
                    if (activo[campo] === "ETH") {
                        contadorETH -= activo["from_cantidad"]
                    }
                } if (campo === "to_moneda") {
                    if (activo[campo] === "ETH") {
                        contadorETH += activo["to_cantidad"]
                    }
                }
                if (campo === "from_moneda") {
                    if (activo[campo] === "LINK") {
                        contadorLINK -= activo["from_cantidad"]
                    }
                } if (campo === "to_moneda") {
                    if (activo[campo] === "LINK") {
                        contadorLINK += activo["to_cantidad"]
                    }
                }
                if (campo === "from_moneda") {
                    if (activo[campo] === "LUNA") {
                        contadorLUNA -= activo["from_cantidad"]
                    }
                } if (campo === "to_moneda") {
                    if (activo[campo] === "LUNA") {
                        contadorLUNA += activo["to_cantidad"]
                    }
                }
                if (campo === "from_moneda") {
                    if (activo[campo] === "SOL") {
                        contadorSOL -= activo["from_cantidad"]
                    }
                } if (campo === "to_moneda") {
                    if (activo[campo] === "SOL") {
                        contadorSOL += activo["to_cantidad"]
                    }
                }
                if (campo === "from_moneda") {
                    if (activo[campo] === "USDT") {
                        contadorUSDT -= activo["from_cantidad"]
                    }
                } if (campo === "to_moneda") {
                    if (activo[campo] === "USDT") {
                        contadorUSDT += activo["to_cantidad"]
                    }
                }
            }
        


        for (let i = 0; i < cartera.length; i++) {
            const activo = cartera[i]
            if (activo["moneda"] === seleccionado.item(0).text) {
                document.getElementById("cantidad_origen").setAttribute("max", activo["cantidad_en_posesion"])
            }
            
        }
        }

        if (seleccionado.item(0).text === "ATOM") {
            document.getElementById("cantidad_origen").setAttribute("max", contadorATOM)
            if (document.querySelector("#cantidad_origen").value > contadorATOM) {
                document.getElementById("submit").setAttribute("disabled", true)
                alert("No dispones de suficientes ATOM")
            } else {
                document.getElementById("submit").removeAttribute("disabled")
            }
            
        } if (seleccionado.item(0).text === "BCH") {
            document.getElementById("cantidad_origen").setAttribute("max", contadorBCH)
            if (document.querySelector("#cantidad_origen").value > contadorBCH) {
                document.getElementById("submit").setAttribute("disabled", true)
                alert("No dispones de suficientes BCH")
            } else {
                document.getElementById("submit").removeAttribute("disabled")
            }
            
        } if (seleccionado.item(0).text === "BNB") {
            document.getElementById("cantidad_origen").setAttribute("max", contadorBNB)
            if (document.querySelector("#cantidad_origen").value > contadorBNB) {
                document.getElementById("submit").setAttribute("disabled", true)
                alert("No dispones de suficientes BNB")
            } else {
                document.getElementById("submit").removeAttribute("disabled")
            }
            
        } if (seleccionado.item(0).text === "BTC") {
            document.getElementById("cantidad_origen").setAttribute("max", contadorBTC)
            if (document.querySelector("#cantidad_origen").value > contadorBTC) {
                document.getElementById("submit").setAttribute("disabled", true)
                alert("No dispones de suficientes BTC")
            } else {
                document.getElementById("submit").removeAttribute("disabled")
            }
            
        } if (seleccionado.item(0).text === "ETH") {
            document.getElementById("cantidad_origen").setAttribute("max", contadorETH)
            if (document.querySelector("#cantidad_origen").value > contadorETH) {
                document.getElementById("submit").setAttribute("disabled", true)
                alert("No dispones de suficientes ETH")
            } else {
                document.getElementById("submit").removeAttribute("disabled")
            }
            
        } if (seleccionado.item(0).text === "LINK") {
            document.getElementById("cantidad_origen").setAttribute("max", contadorLINK)
            if (document.querySelector("#cantidad_origen").value > contadorLINK) {
                document.getElementById("submit").setAttribute("disabled", true)
                alert("No dispones de suficientes LINK")
            } else {
                document.getElementById("submit").removeAttribute("disabled")
            }
            
        } if (seleccionado.item(0).text === "LUNA") {
            document.getElementById("cantidad_origen").setAttribute("max", contadorLUNA)
            if (document.querySelector("#cantidad_origen").value > contadorLUNA) {
                document.getElementById("submit").setAttribute("disabled", true)
                alert("No dispones de suficientes LUNA")
            } else {
                document.getElementById("submit").removeAttribute("disabled")
            }
            
        } if (seleccionado.item(0).text === "SOL") {
            document.getElementById("cantidad_origen").setAttribute("max", contadorSOL)
            if (document.querySelector("#cantidad_origen").value > contadorSOL) {
                document.getElementById("submit").setAttribute("disabled", true)
                alert("No dispones de suficientes SOL")
            } else {
                document.getElementById("submit").removeAttribute("disabled")
            }
            
        } if (seleccionado.item(0).text === "USDT") {
            document.getElementById("cantidad_origen").setAttribute("max", contadorUSDT)
            if (document.querySelector("#cantidad_origen").value > contadorUSDT) {
                document.getElementById("submit").setAttribute("disabled", true)
                alert("No dispones de suficientes USDT")
            } else {
                document.getElementById("submit").removeAttribute("disabled")
            }
            
        } if (seleccionado.item(0).text === "EUR") {
            document.getElementById("cantidad_origen").removeAttribute("max")
            document.getElementById("submit").removeAttribute("disabled")
        }

    } else {
        alert("Error")
    }
}

function nuevaTransaccion () {
    if (this.readyState === 4 && this.status === 200) {
        respuesta = JSON.parse(this.responseText)
        if (respuesta.status === "success") {
            peticionTransacciones.open("GET", "http://localhost:5000/api/v01/transacciones", true)
            peticionTransacciones.onload = listaTransacciones
            peticionTransacciones.send()
        } else {
            alert(respuesta.msg)
        }
    } else {
        alert("Se ha producido un error transaccion")
    }
}

function calcula_cambio_destino(ev) {
    ev.preventDefault()
    const seleccion_origen = document.getElementById("origen").selectedOptions
    const seleccion_destino = document.getElementById("destino").selectedOptions

    const moneda_origen = seleccion_origen.item(0).text
    const moneda_destino = seleccion_destino.item(0).text
    const cantidad_origen = document.getElementById("cantidad_origen").value
    const cantidad_destino = document.getElementById("cantidad_destino")

    const valor_destino = (cantidad_origen * rates[moneda_origen][moneda_destino]).toFixed(5)
    cantidad_destino.setAttribute("value", valor_destino)
}

function bloquea_aceptar () {
    document.getElementById("submit").setAttribute("disabled", true)
}

function grabar_movimiento (ev) {
    ev.preventDefault()
    if (document.querySelector("#origen").value !== "" && document.querySelector("#cantidad_origen").value !== "" && document.querySelector("#destino").value !== "" && document.querySelector("#cantidad_destino").value !== "") {
        const form = document.getElementById("myForm")
        const fecha = new Date()
        let h = fecha.getHours().toString()
        let m = fecha.getMinutes().toString()
        let s = fecha.getSeconds().toString()
        const time = h.padStart(2, "0") + ":" + m.padStart(2, "0") + ":" + s.padStart(2, "0")
        const date = fecha.toLocaleDateString()

        const transaccion = {
            fecha : date,
            hora : time,
            from_moneda : document.querySelector("#origen").value,
            from_cantidad : document.querySelector("#cantidad_origen").value,
            to_moneda : document.querySelector("#destino").value,
            to_cantidad : document.querySelector("#cantidad_destino").value,
        }
        peticionNuevo.open("UPDATE", "/api/v01/movimiento", false)
        peticionNuevo.onload = nuevaTransaccion
        peticionNuevo.setRequestHeader("Content-Type", "application/json")
        peticionNuevo.send(JSON.stringify(transaccion))
        
        clickTransacciones()

        form.reset()
        } else {
            alert("Todos los campos deben rellenarse")
        }
}


/*FUNCIONES PIDEN DATOS*/

function pedir_transacciones () {
    peticionTransacciones.open("GET", "http://localhost:5000/api/v01/transacciones", false)
    peticionTransacciones.onload = listaTransacciones
    peticionTransacciones.send()
}

function pedir_cartera () {
    peticionCartera.open("GET", "http://localhost:5000/api/v01/transacciones", false)
    peticionCartera.onload = listaCartera
    peticionCartera.send()
}

function maximo_a_gastar () {
    peticionCarteraMaximo.open("GET", "http://localhost:5000/api/v01/transacciones", false)
    peticionCarteraMaximo.onload = calcula_maximo
    peticionCarteraMaximo.send()
}

function pedir_rates () {
    peticionRates.open("GET", "http://localhost:5000/api/v01/exchange_rates", false)
    peticionRates.onload = recupera_rates
    peticionRates.send()
}

function calculaInversion () {
    peticionInvertido.open("GET", "http://localhost:5000/api/v01/transacciones", true)
    peticionInvertido.onload = invertido
    peticionInvertido.send()
}


/*CLICK INICIO CARTERA TRANSACCIONES COMPRAVENTA*/

function clickInicio(ev) {
    document.querySelector("#BTN-Inicio").classList.add("inactive")
    document.querySelector("#cartera").classList.add("inactive")
    document.querySelector("#transacciones").classList.add("inactive")
    document.querySelector("#compraventa").classList.add("inactive")
    document.querySelector("#mensaje-inicio").classList.remove("inactive")
    document.querySelector("#BTN-Wallet").classList.remove("inactive")
    document.querySelector("#BTN-Transacciones").classList.remove("inactive")
    document.querySelector("#BTN-CompraVenta").classList.remove("inactive")
    document.getElementById("myForm").reset()
    document.getElementById("cantidad_origen").setAttribute("value", "")
    document.getElementById("cantidad_destino").setAttribute("value", "")
}

function clickCartera(ev) {
    document.querySelector("#mensaje-inicio").classList.add("inactive")
    document.querySelector("#cartera").classList.remove("inactive")
    document.querySelector("#transacciones").classList.add("inactive")
    document.querySelector("#compraventa").classList.add("inactive")
    document.querySelector("#BTN-Wallet").classList.add("inactive")
    document.querySelector("#BTN-Transacciones").classList.remove("inactive")
    document.querySelector("#BTN-CompraVenta").classList.remove("inactive")
    document.querySelector("#BTN-Inicio").classList.remove("inactive")
    document.getElementById("myForm").reset()
    document.getElementById("cantidad_origen").setAttribute("value", "")
    document.getElementById("cantidad_destino").setAttribute("value", "")
}

function clickTransacciones(ev) {
    document.querySelector("#mensaje-inicio").classList.add("inactive")
    document.querySelector("#cartera").classList.add("inactive")
    document.querySelector("#transacciones").classList.remove("inactive")
    document.querySelector("#compraventa").classList.add("inactive")
    document.querySelector("#BTN-Wallet").classList.remove("inactive")
    document.querySelector("#BTN-Transacciones").classList.add("inactive")
    document.querySelector("#BTN-CompraVenta").classList.remove("inactive")
    document.querySelector("#BTN-Inicio").classList.remove("inactive")
    document.getElementById("myForm").reset()
    document.getElementById("cantidad_origen").setAttribute("value", "")
    document.getElementById("cantidad_destino").setAttribute("value", "")
}

function clickCompraventa(ev) {
    document.querySelector("#mensaje-inicio").classList.add("inactive")
    document.querySelector("#cartera").classList.add("inactive")
    document.querySelector("#transacciones").classList.add("inactive")
    document.querySelector("#compraventa").classList.remove("inactive")
    document.querySelector("#BTN-Wallet").classList.remove("inactive")
    document.querySelector("#BTN-Transacciones").classList.remove("inactive")
    document.querySelector("#BTN-CompraVenta").classList.add("inactive")
    document.querySelector("#BTN-Inicio").classList.remove("inactive")
    document.getElementById("myForm").reset()
    document.getElementById("cantidad_origen").setAttribute("value", "")
    document.getElementById("cantidad_destino").setAttribute("value", "")
}


/*LISTENERS*/

document.getElementById("BTN-Inicio").addEventListener("click", clickInicio)

document.getElementById("BTN-Wallet").addEventListener("click", clickCartera)
document.getElementById("BTN-Wallet").addEventListener("click", pedir_rates)
document.getElementById("BTN-Wallet").addEventListener("click", calculaInversion)
document.getElementById("BTN-Wallet").addEventListener("click", pedir_cartera)

document.getElementById("BTN-CompraVenta").addEventListener("click", clickCompraventa)
document.getElementById("BTN-CompraVenta").addEventListener("click", bloquea_aceptar)

document.getElementById("BTN-Transacciones").addEventListener("click", clickTransacciones)
document.getElementById("BTN-Transacciones").addEventListener("click", pedir_transacciones)

document.getElementById("origen").addEventListener("change", seleccion_origen)
document.getElementById("cantidad_origen").addEventListener("change", bloquea_aceptar)

document.getElementById("destino").addEventListener("change", bloquea_aceptar)

document.getElementById("calcular").addEventListener("click", maximo_a_gastar)
document.getElementById("calcular").addEventListener("click", pedir_rates,)
document.getElementById("calcular").addEventListener("click", calcula_cambio_destino)

document.getElementById("cancelar").addEventListener("click", clickInicio)

document.getElementById("submit").addEventListener("click", maximo_a_gastar)
document.getElementById("submit").addEventListener("click", grabar_movimiento)

