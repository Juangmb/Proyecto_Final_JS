from CriptoWallet import app
from CriptoWallet.ProcesaDatos import ProcesaDatos
from flask import redirect, render_template, jsonify, request, url_for
import sqlite3

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

@app.route("/api/v01/exchange_rates/{}/{}")
def exchange_rates():
    return redirect("https://rest.coinapi.io/v1/exchangerate/{}/{}/?apikey=73FCB3D2-DDDE-46FB-A5C8-F507C0504765")