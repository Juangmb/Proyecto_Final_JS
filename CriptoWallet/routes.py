from CriptoWallet import app
from CriptoWallet.ProcesaDatos import ProcesaDatos
from flask import render_template, jsonify, request
import sqlite3
from CriptoWallet.Api import hacer_peticion

rates = {
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
  }
}

ruta_db = app.config['RUTA_BBDD']
data_manager = ProcesaDatos(ruta_db)

@app.route("/")
def inicio():
    return render_template("base.html")

@app.route("/api/v01/transacciones")
def transacciones():
    try:
        datos = data_manager.recupera_transacciones()
        return jsonify({"status" : "success", "data" : datos})
    except sqlite3.Error as e:
        return jsonify({"status" : "fail", "mensaje" : "No se ha podido recuperar los movimientos"})

@app.route("/api/v01/exchange_rates")
def exchange_rates():
  return jsonify({"status" : "success", "data" : rates})
  """try: 
      rates = hacer_peticion()
      return jsonify({"status" : "success", "data" : rates})
    except:
      return jsonify({"status" : "fail", "mensaje" : "No se ha podido recuperar las rates"})"""

@app.route("/api/v01/cartera")
def cartera():
    pass    #  archivo.py con funcion que recuente las monedas que tenemos en este momento, 
            #  asi no tengo que hacer los contadores con js y puedo acceder con una peticion para pintar la cartera

@app.route("/api/v01/movimiento", methods=["UPDATE"])
def transaccion():
    datos = request.json
    try:
        data_manager.nueva_transaccion((datos["fecha"], datos["hora"], datos["from_moneda"], datos["from_cantidad"], datos["to_moneda"], datos["to_cantidad"]))
        """data_manager.update_cartera((datos["to_cantidad"], datos["from_moneda"], datos["to_moneda"]))"""
        return jsonify({"status" : "success"})
    except sqlite3.Error as e:
        return jsonify({"status" : "error", "msg" : str(e)})
