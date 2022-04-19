from CriptoWallet import app
from CriptoWallet.ProcesaDatos import ProcesaDatos
from flask import render_template, jsonify, request
import sqlite3
from CriptoWallet.pruebaFiltrar import rates

ruta_db = app.config['RUTA_BBDD']
data_manager = ProcesaDatos(ruta_db)

@app.route("/")
def inicio():
    return render_template("base.html")

@app.route("/api/v01/transacciones")
def transacciones():
    datos = data_manager.recupera_transacciones()
    return jsonify(datos)

@app.route("/api/v01/cartera_virtual")
def cartera_virtual():
    datos = data_manager.recupera_wallet()
    return jsonify(datos)

@app.route("/api/v01/exchange_rates")
def exchange_rates():
    return jsonify(rates)

@app.route("/api/v01/movimiento", methods=["UPDATE"])
def transaccion():
    datos = request.json
    try:
        data_manager.nueva_transaccion((datos["fecha"], datos["hora"], datos["from_moneda"], datos["from_cantidad"], datos["to_moneda"], datos["to_cantidad"]))
        return jsonify({"status" : "succes"})
    except sqlite3.Error as e:
        return jsonify({"status" : "error", "msg" : str(e)})
