const peticionCartera = new XMLHttpRequest()
const peticionTransacciones = new XMLHttpRequest()
const peticionRates = new XMLHttpRequest()
const peticionNuevo = new XMLHttpRequest()
const peticionCarteraMaximo = new XMLHttpRequest()
const peticionStatus = new XMLHttpRequest()

var rates = {}


/*FUNCIONES CREAN TABLAS CARTERA TRANSACCIONES*/

function listaCartera () {
    if (this.readyState === 4 && this.status === 200) {
        const respuesta = JSON.parse(this.responseText)
        const monedas_en_posesion = respuesta.data.monedas_en_posesion
        const monedas = ["ATOM", "BCH", "BNB", "BTC", "ETH", "LINK", "LUNA", "SOL", "USDT"]

        const tbody = document.querySelector("#tbody-cartera")
        tbody.innerHTML = ""
        
 
        for (moneda of monedas) {
            if (monedas_en_posesion[moneda] > 0) {
                const fila = document.createElement("tr")
                const celdaCripto = document.createElement("td")
                celdaCripto.innerHTML = moneda
                const celdaCantidad = document.createElement("td")
                celdaCantidad.innerHTML = monedas_en_posesion[moneda].toFixed(2)
                const celdaValor = document.createElement("td")
                celdaValor.innerHTML = (monedas_en_posesion[moneda] * rates[moneda]["EUR"]).toFixed(2) + " €"
                celdaValor.classList.add("ValorActual")
                fila.appendChild(celdaCripto)
                fila.appendChild(celdaCantidad)
                fila.appendChild(celdaValor)
                tbody.appendChild(fila)
            }
        }
    }
}

function calcula_maximo () {
    if (this.readyState === 4 && this.status === 200) {
        const respuesta = JSON.parse(this.responseText)
        const monedas_en_posesion = respuesta.data.monedas_en_posesion
        const opciones = document.getElementById("origen")
        const seleccionado = opciones.selectedOptions
        const monedas = ["ATOM", "BCH", "BNB", "BTC", "ETH", "LINK", "LUNA", "SOL", "USDT"]

        const campos = ["from_moneda", "from_cantidad", "to_moneda", "to_cantidad"]

        if (seleccionado.item(0).text === "EUR") {
            document.getElementById("submit").removeAttribute("disabled")
        } else {
            for (moneda of monedas) {
                if (seleccionado.item(0).text === moneda) {
                    document.getElementById("cantidad_origen").setAttribute("max", monedas_en_posesion[moneda])
                    if (document.getElementById("cantidad_origen").value > monedas_en_posesion[moneda]) {
                        document.getElementById("submit").setAttribute("disabled", true)
                        const respuesta = "No dispones de suficientes " + moneda
                        alert(respuesta)
                    } else {
                        document.getElementById("submit").removeAttribute("disabled")
                    }
                }
            }
        }
        
    } else {
        alert("Error")
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
                    celda.innerHTML = parseFloat(movimiento[campo])
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
        alert("Se ha producido un error. Inténtelo de nuevo más tarde")
    }
}

function invertido () {
    if (this.readyState === 4 && this.status === 200) {
        const respuesta = JSON.parse(this.responseText)
        const status = respuesta.data
        
        const tbodyInv = document.querySelector("#tbody-inversion")
        tbodyInv.innerHTML = ""
        
        let invertido = status["invertido"]
        const filaInv = document.createElement("tr")
        const celdaInv = document.createElement("td")
        if (invertido > 0) {
            celdaInv.innerHTML = invertido.toFixed(2) + " €"
        } else {
            celdaInv.innerHTML = 0.00 + " €"
        }
        filaInv.appendChild(celdaInv)

        let retorno = status["valor_actual"] - status["invertido"]
        const celdaRetorno = document.createElement("td")
        celdaRetorno.innerHTML = retorno.toFixed(2) + " €"
        filaInv.appendChild(celdaRetorno)
        tbodyInv.appendChild(filaInv)
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
    peticionCartera.open("GET", "http://localhost:5000/api/v01/status", false)
    peticionCartera.onload = listaCartera
    peticionCartera.send()
}

function maximo_a_gastar () {
    peticionCarteraMaximo.open("GET", "http://localhost:5000/api/v01/status", false)
    peticionCarteraMaximo.onload = calcula_maximo
    peticionCarteraMaximo.send()
}

function pedir_rates () {
    peticionRates.open("GET", "http://localhost:5000/api/v01/exchange_rates", false)
    peticionRates.onload = recupera_rates
    peticionRates.send()
}

function pedir_estado () {
    peticionStatus.open("GET", "http://localhost:5000/api/v01/status", false)
    peticionStatus.onload = invertido
    peticionStatus.send()
}


/*CLICKS INICIO CARTERA TRANSACCIONES COMPRAVENTA*/

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
document.getElementById("BTN-Wallet").addEventListener("click", pedir_estado)
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

