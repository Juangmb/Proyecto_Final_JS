const peticionCartera = new XMLHttpRequest()
const peticionTransacciones = new XMLHttpRequest()
const peticionCompraVenta = new XMLHttpRequest()
const peticionRates = new XMLHttpRequest()
const peticionNuevo = new XMLHttpRequest()
const peticionInvertido = new XMLHttpRequest()

function listaCartera() {
    const campos = ["moneda", "cantidad_en_posesion", "valor_compra"]
    const monedas = ["ATOM", "BCH", "BNB", "BTC", "ETH", "LINK", "LUNA", "SOL", "USDT"]

    if (this.readyState === 4 && this.status === 200) {
        const cartera = JSON.parse(this.responseText)

        const tbody = document.querySelector("#tbody-cartera")
        tbody.innerHTML = ""

        for (let i = 0; i < cartera.length; i++) {
            const fila = document.createElement("tr")
            const activo = cartera[i]
            for (campo of campos) {
                const celda = document.createElement("td")
                if (campo !== "valor_compra") {
                    celda.innerHTML = activo[campo]
                } else {
                    celda.innerHTML = activo[campo] + " €"
                }
                fila.appendChild(celda)
            
            
            }
            tbody.appendChild(fila)
        }

    } else {
        alert("Se ha producido un error. Inténtelo de nuevo más tarde")
    }
}

function invertido() {
    const campos = ["from_moneda", "from_cantidad", "to_moneda", "to_cantidad"]
    if (this.readyState === 4 && this.status === 200) {
        const transacciones = JSON.parse(this.responseText)

        const tbodyInv = document.querySelector("#tbody-inversion")
        tbodyInv.innerHTML = ""
        invertido = 0
        for (let i = 0; i < transacciones.length; i++) {
            if (transacciones[i]["from_moneda"] == "EUR") {
                invertido += parseFloat(transacciones[i]["from_cantidad"])
            } else if (transacciones[i]["to_moneda"] == "EUR") {
                invertido -= parseFloat(transacciones[i]["to_cantidad"])
            }
        }
        const filaInv = document.createElement("tr")
        const celdaInv = document.createElement("td")
        celdaInv.innerHTML = invertido
        filaInv.appendChild(celdaInv)
        tbodyInv.appendChild(filaInv)
    } else {
        alert("Se ha producido un error")
    }

}

function listaTransacciones() {
    const campos = ["fecha", "hora", "from_moneda", "from_cantidad", "to_moneda", "to_cantidad"]

    if (this.readyState === 4 && this.status === 200) {
        const transacciones = JSON.parse(this.responseText)

        const tbody = document.querySelector("#tbody-transacciones")
        
        tbody.innerHTML = ""
        
        
        for (let i = 0; i < transacciones.length; i++) {
            const fila = document.createElement("tr")
            const movimiento = transacciones[i]
            for (campo of campos) {
                const celda = document.createElement("td")
                celda.innerHTML = movimiento[campo]
                fila.appendChild(celda)
            }
            tbody.appendChild(fila)
        }
        
    } else {
        alert("Se ha producido un error. Inténtelo de nuevo más tarde")
    }
}

const btnTransacciones = document.querySelector("#BTN-Transaciones")
btnTransacciones.addEventListener("click", clickTransacciones)

function clickTransacciones(ev) {
    peticionTransacciones.open("GET", "http://localhost:5000/api/v01/transacciones", true)
    peticionTransacciones.onload = listaTransacciones
    peticionTransacciones.send()
    peticionInvertido.open("GET", "http://localhost:5000/api/v01/transacciones", true)
    peticionInvertido.onload = invertido
    peticionInvertido.send()
    document.querySelector("#mensaje-inicio").classList.add("inactive")
    document.querySelector("#cartera").classList.add("inactive")
    document.querySelector("#transacciones").classList.remove("inactive")
    document.querySelector("#compraventa").classList.add("inactive")
    document.querySelector("#BTN-Wallet").classList.remove("inactive")
    document.querySelector("#BTN-Transaciones").classList.add("inactive")
    document.querySelector("#BTN-CompraVenta").classList.remove("inactive")
    document.querySelector("#BTN-Inicio").classList.remove("inactive")
}

const btnCartera = document.querySelector("#BTN-Wallet")
btnCartera.addEventListener("click", clickCartera)

function clickCartera(ev) {
    peticionCartera.open("GET", "http://localhost:5000/api/v01/cartera_virtual", true)
    peticionCartera.onload = listaCartera
    peticionCartera.send()
    document.querySelector("#mensaje-inicio").classList.add("inactive")
    document.querySelector("#cartera").classList.remove("inactive")
    document.querySelector("#transacciones").classList.add("inactive")
    document.querySelector("#compraventa").classList.add("inactive")
    document.querySelector("#BTN-Wallet").classList.add("inactive")
    document.querySelector("#BTN-Transaciones").classList.remove("inactive")
    document.querySelector("#BTN-CompraVenta").classList.remove("inactive")
    document.querySelector("#BTN-Inicio").classList.remove("inactive")
}

const btnCompraventa = document.querySelector("#BTN-CompraVenta")
btnCompraventa.addEventListener("click", clickCompraventa)

function clickCompraventa(ev) {
    /* Funcion que consiga las exchange rates y calcule el cambio rellenando el input y poniendo maximo en funcion de la cantidad disponible*/
    document.querySelector("#mensaje-inicio").classList.add("inactive")
    document.querySelector("#cartera").classList.add("inactive")
    document.querySelector("#transacciones").classList.add("inactive")
    document.querySelector("#compraventa").classList.remove("inactive")
    document.querySelector("#BTN-Wallet").classList.remove("inactive")
    document.querySelector("#BTN-Transaciones").classList.remove("inactive")
    document.querySelector("#BTN-CompraVenta").classList.add("inactive")
    document.querySelector("#BTN-Inicio").classList.remove("inactive")
}

const btnInicio = document.querySelector("#BTN-Inicio")
btnInicio.addEventListener("click", clickInicio)

function clickInicio(ev) {
    document.querySelector("#BTN-Inicio").classList.add("inactive")
    document.querySelector("#cartera").classList.add("inactive")
    document.querySelector("#transacciones").classList.add("inactive")
    document.querySelector("#compraventa").classList.add("inactive")
    document.querySelector("#mensaje-inicio").classList.remove("inactive")
    document.querySelector("#BTN-Wallet").classList.remove("inactive")
    document.querySelector("#BTN-Transaciones").classList.remove("inactive")
    document.querySelector("#BTN-CompraVenta").classList.remove("inactive")
}

document.querySelector("#submit").addEventListener("click", (ev) => {
    ev.preventDefault()
    const date = new Date().toLocaleDateString()
        
    const transaccion = {
        fecha : date,
        hora : "hour",
        from_moneda : document.querySelector("#origen").value,
        from_cantidad : document.querySelector("#cantidad_origen").value,
        to_moneda : document.querySelector("#destino").value,
        to_cantidad : document.querySelector("#cantidad_destino").value,
    }
    peticionNuevo.open("UPDATE", "/api/v01/movimiento", true)
    peticionNuevo.onload = nuevaTransaccion
    peticionNuevo.setRequestHeader("Content-Type", "application/json")
    peticionNuevo.send(JSON.stringify(transaccion))
})



function nuevaTransaccion() {
    if (this.readyState === 4 && this.status === 200) {
        respuesta = JSON.parse(this.responseText)
        if (respuesta.status === "success") {
            peticionTransacciones.send()
        } else {
            alert(respuesta.msg)
        }
    } else {
        alert("Se ha producido un error")
    }
}