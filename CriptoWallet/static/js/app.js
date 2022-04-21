const peticionCartera = new XMLHttpRequest()
const peticionTransacciones = new XMLHttpRequest()
const peticionCompraVenta = new XMLHttpRequest()
const peticionRates = new XMLHttpRequest()
const peticionNuevo = new XMLHttpRequest()
const peticionInvertido = new XMLHttpRequest()
const peticionCarteraMaximo = new XMLHttpRequest()

function listaCartera() {
    const campos = ["from_moneda", "from_cantidad", "to_moneda", "to_cantidad"]
    const monedas = ["ATOM", "BCH", "BNB", "BTC", "ETH", "LINK", "LUNA", "SOL", "USDT"]

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
            celdaCantidad.innerHTML = contadorATOM
            fila.appendChild(celdaCripto)
            fila.appendChild(celdaCantidad)
            tbody.appendChild(fila)
            /*Calcular valor*/
        }
        if (contadorBCH !== 0) {
            const fila = document.createElement("tr")
            const celdaCripto = document.createElement("td")
            celdaCripto.innerHTML = "BCH"
            const celdaCantidad = document.createElement("td")
            celdaCantidad.innerHTML = contadorBCH
            fila.appendChild(celdaCripto)
            fila.appendChild(celdaCantidad)
            tbody.appendChild(fila)
            /*Calcular valor*/
        }
        if (contadorBNB !== 0) {
            const fila = document.createElement("tr")
            const celdaCripto = document.createElement("td")
            celdaCripto.innerHTML = "BNB"
            const celdaCantidad = document.createElement("td")
            celdaCantidad.innerHTML = contadorBNB
            fila.appendChild(celdaCripto)
            fila.appendChild(celdaCantidad)
            tbody.appendChild(fila)
            /*Calcular valor*/
        }
        if (contadorBTC !== 0) {
            const fila = document.createElement("tr")
            const celdaCripto = document.createElement("td")
            celdaCripto.innerHTML = "BTC"
            const celdaCantidad = document.createElement("td")
            celdaCantidad.innerHTML = contadorBTC
            fila.appendChild(celdaCripto)
            fila.appendChild(celdaCantidad)
            tbody.appendChild(fila)
            /*Calcular valor*/
        }
        if (contadorETH !== 0) {
            const fila = document.createElement("tr")
            const celdaCripto = document.createElement("td")
            celdaCripto.innerHTML = "ETH"
            const celdaCantidad = document.createElement("td")
            celdaCantidad.innerHTML = contadorETH
            fila.appendChild(celdaCripto)
            fila.appendChild(celdaCantidad)
            tbody.appendChild(fila)
            /*Calcular valor*/
        }
        if (contadorLINK !== 0) {
            const fila = document.createElement("tr")
            const celdaCripto = document.createElement("td")
            celdaCripto.innerHTML = "LINK"
            const celdaCantidad = document.createElement("td")
            celdaCantidad.innerHTML = contadorLINK
            fila.appendChild(celdaCripto)
            fila.appendChild(celdaCantidad)
            tbody.appendChild(fila)
            /*Calcular valor*/
        }
        if (contadorLUNA !== 0) {
            const fila = document.createElement("tr")
            const celdaCripto = document.createElement("td")
            celdaCripto.innerHTML = "LUNA"
            const celdaCantidad = document.createElement("td")
            celdaCantidad.innerHTML = contadorLUNA
            fila.appendChild(celdaCripto)
            fila.appendChild(celdaCantidad)
            tbody.appendChild(fila)
            /*Calcular valor*/
        }
        if (contadorSOL !== 0) {
            const fila = document.createElement("tr")
            const celdaCripto = document.createElement("td")
            celdaCripto.innerHTML = "SOL"
            const celdaCantidad = document.createElement("td")
            celdaCantidad.innerHTML = contadorSOL
            fila.appendChild(celdaCripto)
            fila.appendChild(celdaCantidad)
            tbody.appendChild(fila)
            /*Calcular valor*/
        }
        if (contadorUSDT !== 0) {
            const fila = document.createElement("tr")
            const celdaCripto = document.createElement("td")
            celdaCripto.innerHTML = "USDT"
            const celdaCantidad = document.createElement("td")
            celdaCantidad.innerHTML = contadorUSDT
            fila.appendChild(celdaCripto)
            fila.appendChild(celdaCantidad)
            tbody.appendChild(fila)
            /*Calcular valor*/
        }
    } else {
        alert("Se ha producido un error. Inténtelo de nuevo más tarde")
    }
}

function invertido() {
    const campos = ["from_moneda", "from_cantidad", "to_moneda", "to_cantidad"]
    if (this.readyState === 4 && this.status === 200) {
        const respuesta = JSON.parse(this.responseText)
        const transacciones = respuesta.data

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
        const respuesta = JSON.parse(this.responseText)
        const transacciones = respuesta.data

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
    peticionInvertido.open("GET", "http://localhost:5000/api/v01/transacciones", false)
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
    peticionCartera.open("GET", "http://localhost:5000/api/v01/transacciones", true)
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

const form = document.getElementById("myForm")

document.querySelector("#submit").addEventListener("click", (ev) => {
    ev.preventDefault()
    const fecha = new Date()
    let h = fecha.getHours()
    let m = fecha.getMinutes()
    let s = fecha.getSeconds()
    const time = h + ":" + m + ":" + s
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
})



function nuevaTransaccion() {
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
        alert("Se ha producido un error")
    }
}

document.getElementById("origen").addEventListener("change", seleccion_origen)
document.getElementById("origen").addEventListener("change", maximo_a_gastar)

function maximo_a_gastar () {
    peticionCarteraMaximo.open("GET", "http://localhost:5000/api/v01/transacciones", false)
    peticionCarteraMaximo.onload = calcula_maximo
    peticionCarteraMaximo.send()
}

function calcula_maximo() {
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
        } if (seleccionado.item(0).text === "BCH") {
            document.getElementById("cantidad_origen").setAttribute("max", contadorBCH)
        } if (seleccionado.item(0).text === "BNB") {
            document.getElementById("cantidad_origen").setAttribute("max", contadorBNB)
        } if (seleccionado.item(0).text === "BTC") {
            document.getElementById("cantidad_origen").setAttribute("max", contadorBTC)
        } if (seleccionado.item(0).text === "ETH") {
            document.getElementById("cantidad_origen").setAttribute("max", contadorETH)
        } if (seleccionado.item(0).text === "LINK") {
            document.getElementById("cantidad_origen").setAttribute("max", contadorLINK)
        } if (seleccionado.item(0).text === "LUNA") {
            document.getElementById("cantidad_origen").setAttribute("max", contadorLUNA)
        } if (seleccionado.item(0).text === "SOL") {
            document.getElementById("cantidad_origen").setAttribute("max", contadorSOL)
        } if (seleccionado.item(0).text === "USDT") {
            document.getElementById("cantidad_origen").setAttribute("max", contadorUSDT)
        } if (seleccionado.item(0).text === "EUR") {
            document.getElementById("cantidad_origen").removeAttribute("max")
        }

    } else {
        alert("Error")
    }
}

function seleccion_origen () {
    document.getElementById("destino").removeAttribute("disabled")
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

document.getElementById("cantidad_origen").addEventListener("change", calcula_rate)

function calcula_rate() {
    document.getElementById("cantidad_destino").removeAttribute("disabled")
    /*Calcular destino en funcion del input de origen utilizando API rates, no quiero que se habilite para escribir*/
}