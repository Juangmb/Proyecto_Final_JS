import sqlite3
from flask import jsonify
import requests
import json
from Api.Api import hacer_peticion


class ProcesaDatos:
    def __init__(self, file=":memory:"):
        self.origen_datos = file

    def crea_diccionario(self, cur):
        filas = cur.fetchall()

        campos = []
        for item in cur.description:
            campos.append(item[0])

        resultado = []

        for fila in filas:
            registro = {}

            for clave, valor in zip(campos, fila):
                registro[clave] = valor

            resultado.append(registro)
        return resultado 

    def results(self, cur, con):
 
        if cur.description:
            resultado = self.crea_diccionario(cur)
        else:
            resultado = None
            con.commit()
        return resultado

    def haz_consulta(self, consulta, params=[]):
        con = sqlite3.connect(self.origen_datos)
        cur = con.cursor()

        cur.execute(consulta, params)

        resultado = self.results(cur, con)

        con.close()

        return resultado



    def recupera_transacciones(self):
        return self.haz_consulta("""
                        SELECT transaction_id, fecha, hora, from_moneda, from_cantidad, to_moneda, to_cantidad
                        FROM transacciones
                        ORDER BY fecha, hora
                    """
        )
    
    def nueva_transaccion(self, values):
        return self.haz_consulta("""
                        INSERT INTO transacciones (fecha, hora, from_moneda, from_cantidad, to_moneda, to_cantidad)
                        values (?, ?, ?, ?, ?, ?)
        """, values)

    def recuenta_monedas(self):
        respuesta = requests.get("http://localhost:5000/api/v01/transacciones")
        dic = json.loads(respuesta.text)
        data = dic["data"]

        contadorATOM = 0
        contadorBCH = 0
        contadorBNB = 0
        contadorBTC = 0
        contadorETH = 0
        contadorLINK = 0
        contadorLUNA = 0
        contadorSOL = 0
        contadorUSDT = 0

        for i in range(0, len(data)):
            if data[i]["to_moneda"] == "ATOM":
                contadorATOM += data[i]["to_cantidad"]
            if data[i]["from_moneda"] == "ATOM":
                contadorATOM -= data[i]["from_cantidad"]

            if data[i]["to_moneda"] == "BCH":
                contadorBCH += data[i]["to_cantidad"]
            if data[i]["from_moneda"] == "BCH":
                contadorBCH -= data[i]["from_cantidad"]

            if data[i]["to_moneda"] == "BNB":
                contadorBNB += data[i]["to_cantidad"]
            if data[i]["from_moneda"] == "BNB":
                contadorBNB -= data[i]["from_cantidad"]

            if data[i]["to_moneda"] == "BTC":
                contadorBTC += data[i]["to_cantidad"]
            if data[i]["from_moneda"] == "BTC":
                contadorBTC -= data[i]["from_cantidad"]

            if data[i]["to_moneda"] == "ETH":
                contadorETH += data[i]["to_cantidad"]
            if data[i]["from_moneda"] == "ETH":
                contadorETH -= data[i]["from_cantidad"]

            if data[i]["to_moneda"] == "LINK":
                contadorLINK += data[i]["to_cantidad"]
            if data[i]["from_moneda"] == "LINK":
                contadorLINK -= data[i]["from_cantidad"]

            if data[i]["to_moneda"] == "LUNA":
                contadorLUNA += data[i]["to_cantidad"]
            if data[i]["from_moneda"] == "LUNA":
                contadorLUNA -= data[i]["from_cantidad"]

            if data[i]["to_moneda"] == "SOL":
                contadorSOL += data[i]["to_cantidad"]
            if data[i]["from_moneda"] == "SOL":
                contadorSOL -= data[i]["from_cantidad"]

            if data[i]["to_moneda"] == "USDT":
                contadorUSDT += data[i]["to_cantidad"]
            if data[i]["from_moneda"] == "USDT":
                contadorUSDT -= data[i]["from_cantidad"]
        
        monedas = {
            "ATOM" : contadorATOM,
            "BCH" : contadorBCH,
            "BNB" : contadorBNB,
            "BTC" : contadorBTC,
            "ETH" : contadorETH,
            "LINK" : contadorLINK,
            "LUNA" : contadorLUNA,
            "SOL" : contadorSOL,
            "USDT" : contadorUSDT,
        }

        return monedas

    def verifica_cantidad(self, datos):
        monedas = self.recuenta_monedas()

        if datos["from_moneda"] == "ATOM" and float(datos["from_cantidad"]) > monedas["ATOM"]:
            return False
        if datos["from_moneda"] == "BCH" and float(datos["from_cantidad"]) > monedas["BCH"]:
            return False
        if datos["from_moneda"] == "BNB" and float(datos["from_cantidad"]) > monedas["BNB"]:
            return False
        if datos["from_moneda"] == "BTC" and float(datos["from_cantidad"]) > monedas["BTC"]:
            return False
        if datos["from_moneda"] == "ETH" and float(datos["from_cantidad"]) > monedas["ETH"]:
            return False
        if datos["from_moneda"] == "LINK" and float(datos["from_cantidad"]) > monedas["LINK"]:
            return False
        if datos["from_moneda"] == "LUNA" and float(datos["from_cantidad"]) > monedas["LUNA"]:
            return False
        if datos["from_moneda"] == "SOL" and float(datos["from_cantidad"]) > monedas["SOL"]:
            return False
        if datos["from_moneda"] == "USDT" and float(datos["from_cantidad"]) > monedas["USDT"]:
            return False
        else:
            return True

        """(datos["from_moneda"], datos["from_cantidad"])"""
        
    def status(self):
        
        transacciones = self.recupera_transacciones()
        invertido = 0
        for i in range(0, len(transacciones)):
            if transacciones[i]["from_moneda"] == "EUR":
                invertido += transacciones[i]["from_cantidad"]
            if transacciones[i]["to_moneda"] == "EUR":
                invertido -= transacciones[i]["to_cantidad"]

        monedas = self.recuenta_monedas()
        rates = hacer_peticion()
        dicRates = json.loads(rates.data)
        valor_actual = 0
        if monedas["ATOM"] > 0:
            valor_actual += monedas["ATOM"] * dicRates["data"]["ATOM"]["EUR"]
        if monedas["BCH"] > 0:
            valor_actual += monedas["BCH"] * dicRates["data"]["BCH"]["EUR"]
        if monedas["BNB"] > 0:
            valor_actual += monedas["BNB"] * dicRates["data"]["BNB"]["EUR"]
        if monedas["BTC"] > 0:
            valor_actual += monedas["BTC"] * dicRates["data"]["BTC"]["EUR"]
        if monedas["ETH"] > 0:
            valor_actual += monedas["ETH"] * dicRates["data"]["ETH"]["EUR"]
        if monedas["LINK"] > 0:
            valor_actual += monedas["LINK"] * dicRates["data"]["LINK"]["EUR"]
        if monedas["LUNA"] > 0:
            valor_actual += monedas["LUNA"] * dicRates["data"]["LUNA"]["EUR"]
        if monedas["SOL"] > 0:
            valor_actual += monedas["SOL"] * dicRates["data"]["SOL"]["EUR"]
        if monedas["USDT"] > 0:
            valor_actual += monedas["USDT"] * dicRates["data"]["USDT"]["EUR"]

        resultado = {
            "status" : "success",
            "data" : {
                "invertido" : invertido,
                "valor_actual" : valor_actual,
                "monedas_en_posesion" : monedas
            }
        }
        return jsonify(resultado)
