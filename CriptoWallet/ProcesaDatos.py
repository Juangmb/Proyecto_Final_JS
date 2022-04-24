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

    def verifica_cantidad(self, datos):
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

        if datos["from_moneda"] == "ATOM" and datos["from-cantidad"] > contadorATOM:
            return False
        if datos["from_moneda"] == "BCH" and datos["from-cantidad"] > contadorBCH:
            return False
        if datos["from_moneda"] == "BNB" and datos["from-cantidad"] > contadorBNB:
            return False
        if datos["from_moneda"] == "BTC" and datos["from-cantidad"] > contadorBTC:
            return False
        if datos["from_moneda"] == "ETH" and datos["from-cantidad"] > contadorETH:
            return False
        if datos["from_moneda"] == "LINK" and datos["from-cantidad"] > contadorLINK:
            return False
        if datos["from_moneda"] == "LUNA" and datos["from-cantidad"] > contadorLUNA:
            return False
        if datos["from_moneda"] == "SOL" and datos["from-cantidad"] > contadorSOL:
            return False
        if datos["from_moneda"] == "USDT" and datos["from-cantidad"] > contadorUSDT:
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

        contadorATOM = 0
        contadorBCH = 0
        contadorBNB = 0
        contadorBTC = 0
        contadorETH = 0
        contadorLINK = 0
        contadorLUNA = 0
        contadorSOL = 0
        contadorUSDT = 0

        for i in range(0, len(transacciones)):
            if transacciones[i]["to_moneda"] == "ATOM":
                contadorATOM += transacciones[i]["to_cantidad"]
            if transacciones[i]["from_moneda"] == "ATOM":
                contadorATOM -= transacciones[i]["from_cantidad"]

            if transacciones[i]["to_moneda"] == "BCH":
                contadorBCH += transacciones[i]["to_cantidad"]
            if transacciones[i]["from_moneda"] == "BCH":
                contadorBCH -= transacciones[i]["from_cantidad"]

            if transacciones[i]["to_moneda"] == "BNB":
                contadorBNB += transacciones[i]["to_cantidad"]
            if transacciones[i]["from_moneda"] == "BNB":
                contadorBNB -= transacciones[i]["from_cantidad"]

            if transacciones[i]["to_moneda"] == "BTC":
                contadorBTC += transacciones[i]["to_cantidad"]
            if transacciones[i]["from_moneda"] == "BTC":
                contadorBTC -= transacciones[i]["from_cantidad"]

            if transacciones[i]["to_moneda"] == "ETH":
                contadorETH += transacciones[i]["to_cantidad"]
            if transacciones[i]["from_moneda"] == "ETH":
                contadorETH -= transacciones[i]["from_cantidad"]

            if transacciones[i]["to_moneda"] == "LINK":
                contadorLINK += transacciones[i]["to_cantidad"]
            if transacciones[i]["from_moneda"] == "LINK":
                contadorLINK -= transacciones[i]["from_cantidad"]

            if transacciones[i]["to_moneda"] == "LUNA":
                contadorLUNA += transacciones[i]["to_cantidad"]
            if transacciones[i]["from_moneda"] == "LUNA":
                contadorLUNA -= transacciones[i]["from_cantidad"]

            if transacciones[i]["to_moneda"] == "SOL":
                contadorSOL += transacciones[i]["to_cantidad"]
            if transacciones[i]["from_moneda"] == "SOL":
                contadorSOL -= transacciones[i]["from_cantidad"]

            if transacciones[i]["to_moneda"] == "USDT":
                contadorUSDT += transacciones[i]["to_cantidad"]
            if transacciones[i]["from_moneda"] == "USDT":
                contadorUSDT -= transacciones[i]["from_cantidad"]

        rates = hacer_peticion()
        dicRates = json.loads(rates.data)
        valor_actual = 0
        if contadorATOM > 0:
            valor_actual += contadorATOM * dicRates["data"]["ATOM"]["EUR"]
        if contadorBCH > 0:
            valor_actual += contadorBCH * dicRates["data"]["BCH"]["EUR"]
        if contadorBNB > 0:
            valor_actual += contadorBNB * dicRates["data"]["BNB"]["EUR"]
        if contadorBTC > 0:
            valor_actual += contadorBTC * dicRates["data"]["BTC"]["EUR"]
        if contadorETH > 0:
            valor_actual += contadorETH * dicRates["data"]["ETH"]["EUR"]
        if contadorLINK > 0:
            valor_actual += contadorLINK * dicRates["data"]["LINK"]["EUR"]
        if contadorLUNA > 0:
            valor_actual += contadorLUNA * dicRates["data"]["LUNA"]["EUR"]
        if contadorSOL > 0:
            valor_actual += contadorSOL * dicRates["data"]["SOL"]["EUR"]
        if contadorUSDT > 0:
            valor_actual += contadorUSDT * dicRates["data"]["USDT"]["EUR"]



        resultado = {
            "status" : "success",
            "data" : {
                "invertido" : invertido,
                "valor_actual" : valor_actual
            }
        }
        return jsonify(resultado)
