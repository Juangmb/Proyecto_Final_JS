from CriptoWallet import app
from CriptoWallet.ProcesaDatos import ProcesaDatos
from flask import render_template, jsonify, request
import sqlite3
from CriptoWallet.Api import hacer_peticion

ruta_db = app.config['RUTA_BBDD']
data_manager = ProcesaDatos(ruta_db)

@app.route("/")
def inicio():
    return render_template("base.html")

@app.route("/api/v01/transacciones")
def transacciones():
    datos = data_manager.recupera_transacciones()
    return jsonify({"status" : "success", "data" : datos})

@app.route("/api/v01/exchange_rates")
def exchange_rates():
    rates = hacer_peticion()
    return jsonify(rates)

@app.route("/api/v01/movimiento", methods=["UPDATE"])
def transaccion():
    datos = request.json
    try:
        data_manager.nueva_transaccion((datos["fecha"], datos["hora"], datos["from_moneda"], datos["from_cantidad"], datos["to_moneda"], datos["to_cantidad"]))
        """data_manager.update_cartera((datos["to_cantidad"], datos["from_moneda"], datos["to_moneda"]))"""
        return jsonify({"status" : "success"})
    except sqlite3.Error as e:
        return jsonify({"status" : "error", "msg" : str(e)})
