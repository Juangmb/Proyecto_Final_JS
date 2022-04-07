const peticionCartera = new XMLHttpRequest()
const peticionTransacciones = new XMLHttpRequest()
const peticionCompraVenta = new XMLHttpRequest()

function listaCartera() {
    const campos = ["moneda", "cantidad_en_posesion", "valor_compra"]

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

function botonesCompraVenta() {
    document.querySelector("#compraventa")
}

const btnTransacciones = document.querySelector("#BTN-Transaciones")
btnTransacciones.addEventListener("click", clickTransacciones)

function clickTransacciones(ev) {
    peticionTransacciones.open("GET", "http://localhost:5000/api/v01/transacciones", true)
    peticionTransacciones.onload = listaTransacciones
    peticionTransacciones.send()
    document.querySelector("#mensaje-inicio").classList.add("inactive")
    document.querySelector("#cartera").classList.add("inactive")
    document.querySelector("#transacciones").classList.remove("inactive")
    document.querySelector("#compraventa").classList.add("inactive")
    document.querySelector("#BTN-Wallet").classList.remove("inactive")
    document.querySelector("#BTN-Transaciones").classList.add("inactive")
    document.querySelector("#BTN-CompraVenta").classList.remove("inactive")
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
}

const btnCompraventa = document.querySelector("#BTN-CompraVenta")
btnCompraventa.addEventListener("click", clickCompraventa)

function clickCompraventa(ev) {
    document.querySelector("#mensaje-inicio").classList.add("inactive")
    document.querySelector("#cartera").classList.add("inactive")
    document.querySelector("#transacciones").classList.add("inactive")
    document.querySelector("#compraventa").classList.remove("inactive")
    document.querySelector("#BTN-Wallet").classList.remove("inactive")
    document.querySelector("#BTN-Transaciones").classList.remove("inactive")
    document.querySelector("#BTN-CompraVenta").classList.add("inactive")
    document.querySelector("#activos").classList.remove("inactive")
}

