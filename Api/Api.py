import json
from flask import jsonify
import requests
from Api.config import API_KEY
from Api import URL_TASA_EUR



def hacer_peticion():
    respuesta = requests.get(URL_TASA_EUR.format(API_KEY))

    if respuesta.status_code == 200:
        string = respuesta.text

        monedas = json.loads(string)

        rates = { "EUR" : {},
            "ATOM" : {},
            "BCH" : {},
            "BNB" : {},
            "BTC" : {},
            "ETH" : {},
            "LINK" : {},
            "LUNA" : {},
            "SOL" : {},
            "USDT" : {},}

        lista_monedas = ["ATOM", "BCH", "BNB", "BTC", "ETH", "LINK", "LUNA", "SOL", "USDT"]
        
        for i in range(0, len(monedas["rates"])):
            if monedas["rates"][i]["asset_id_quote"] in lista_monedas:
                rates["EUR"][monedas["rates"][i]["asset_id_quote"]] = monedas["rates"][i]["rate"]
        rates["EUR"]["EUR"] = 1

        rates["ATOM"]["ATOM"] = 1
        rates["ATOM"]["EUR"] = 1 / rates["EUR"]["ATOM"]
        rates["ATOM"]["BCH"] =  (1 / rates["EUR"]["ATOM"]) / (1 / rates["EUR"]["BCH"])
        rates["ATOM"]["BNB"] =  (1 / rates["EUR"]["ATOM"]) / (1 / rates["EUR"]["BNB"])
        rates["ATOM"]["BTC"] =  (1 / rates["EUR"]["ATOM"]) / (1 / rates["EUR"]["BTC"])
        rates["ATOM"]["ETH"] =  (1 / rates["EUR"]["ATOM"]) / (1 / rates["EUR"]["ETH"])
        rates["ATOM"]["LINK"] =  (1 / rates["EUR"]["ATOM"]) / (1 / rates["EUR"]["LINK"])
        rates["ATOM"]["LUNA"] =  (1 / rates["EUR"]["ATOM"]) / (1 / rates["EUR"]["LUNA"])
        rates["ATOM"]["SOL"] =  (1 / rates["EUR"]["ATOM"]) / (1 / rates["EUR"]["SOL"])
        rates["ATOM"]["USDT"] =  (1 / rates["EUR"]["ATOM"]) / (1 / rates["EUR"]["USDT"])

        rates["BCH"]["BCH"] = 1
        rates["BCH"]["EUR"] = 1 / rates["EUR"]["BCH"]
        rates["BCH"]["ATOM"] =  (1 / rates["EUR"]["BCH"]) / (1 / rates["EUR"]["ATOM"])
        rates["BCH"]["BNB"] =  (1 / rates["EUR"]["BCH"]) / (1 / rates["EUR"]["BNB"])
        rates["BCH"]["BTC"] =  (1 / rates["EUR"]["BCH"]) / (1 / rates["EUR"]["BTC"])
        rates["BCH"]["ETH"] =  (1 / rates["EUR"]["BCH"]) / (1 / rates["EUR"]["ETH"])
        rates["BCH"]["LINK"] =  (1 / rates["EUR"]["BCH"]) / (1 / rates["EUR"]["LINK"])
        rates["BCH"]["LUNA"] =  (1 / rates["EUR"]["BCH"]) / (1 / rates["EUR"]["LUNA"])
        rates["BCH"]["SOL"] =  (1 / rates["EUR"]["BCH"]) / (1 / rates["EUR"]["SOL"])
        rates["BCH"]["USDT"] =  (1 / rates["EUR"]["BCH"]) / (1 / rates["EUR"]["USDT"])

        rates["BNB"]["BNB"] = 1
        rates["BNB"]["EUR"] = 1 / rates["EUR"]["BNB"]
        rates["BNB"]["BCH"] =  (1 / rates["EUR"]["BNB"]) / (1 / rates["EUR"]["BCH"])
        rates["BNB"]["ATOM"] =  (1 / rates["EUR"]["BNB"]) / (1 / rates["EUR"]["ATOM"])
        rates["BNB"]["BTC"] =  (1 / rates["EUR"]["BNB"]) / (1 / rates["EUR"]["BTC"])
        rates["BNB"]["ETH"] =  (1 / rates["EUR"]["BNB"]) / (1 / rates["EUR"]["ETH"])
        rates["BNB"]["LINK"] =  (1 / rates["EUR"]["BNB"]) / (1 / rates["EUR"]["LINK"])
        rates["BNB"]["LUNA"] =  (1 / rates["EUR"]["BNB"]) / (1 / rates["EUR"]["LUNA"])
        rates["BNB"]["SOL"] =  (1 / rates["EUR"]["BNB"]) / (1 / rates["EUR"]["SOL"])
        rates["BNB"]["USDT"] =  (1 / rates["EUR"]["BNB"]) / (1 / rates["EUR"]["USDT"])

        rates["BTC"]["BTC"] = 1
        rates["BTC"]["EUR"] = 1 / rates["EUR"]["BTC"]
        rates["BTC"]["BCH"] =  (1 / rates["EUR"]["BTC"]) / (1 / rates["EUR"]["BCH"])
        rates["BTC"]["BNB"] =  (1 / rates["EUR"]["BTC"]) / (1 / rates["EUR"]["BNB"])
        rates["BTC"]["ATOM"] =  (1 / rates["EUR"]["BTC"]) / (1 / rates["EUR"]["ATOM"])
        rates["BTC"]["ETH"] =  (1 / rates["EUR"]["BTC"]) / (1 / rates["EUR"]["ETH"])
        rates["BTC"]["LINK"] =  (1 / rates["EUR"]["BTC"]) / (1 / rates["EUR"]["LINK"])
        rates["BTC"]["LUNA"] =  (1 / rates["EUR"]["BTC"]) / (1 / rates["EUR"]["LUNA"])
        rates["BTC"]["SOL"] =  (1 / rates["EUR"]["BTC"]) / (1 / rates["EUR"]["SOL"])
        rates["BTC"]["USDT"] =  (1 / rates["EUR"]["BTC"]) / (1 / rates["EUR"]["USDT"])

        rates["ETH"]["ETH"] = 1
        rates["ETH"]["EUR"] = 1 / rates["EUR"]["ETH"]
        rates["ETH"]["BCH"] =  (1 / rates["EUR"]["ETH"]) / (1 / rates["EUR"]["BCH"])
        rates["ETH"]["BNB"] =  (1 / rates["EUR"]["ETH"]) / (1 / rates["EUR"]["BNB"])
        rates["ETH"]["BTC"] =  (1 / rates["EUR"]["ETH"]) / (1 / rates["EUR"]["BTC"])
        rates["ETH"]["ATOM"] =  (1 / rates["EUR"]["ETH"]) / (1 / rates["EUR"]["ATOM"])
        rates["ETH"]["LINK"] =  (1 / rates["EUR"]["ETH"]) / (1 / rates["EUR"]["LINK"])
        rates["ETH"]["LUNA"] =  (1 / rates["EUR"]["ETH"]) / (1 / rates["EUR"]["LUNA"])
        rates["ETH"]["SOL"] =  (1 / rates["EUR"]["ETH"]) / (1 / rates["EUR"]["SOL"])
        rates["ETH"]["USDT"] =  (1 / rates["EUR"]["ETH"]) / (1 / rates["EUR"]["USDT"])

        rates["LINK"]["LINK"] = 1
        rates["LINK"]["EUR"] = 1 / rates["EUR"]["LINK"]
        rates["LINK"]["BCH"] =  (1 / rates["EUR"]["LINK"]) / (1 / rates["EUR"]["BCH"])
        rates["LINK"]["BNB"] =  (1 / rates["EUR"]["LINK"]) / (1 / rates["EUR"]["BNB"])
        rates["LINK"]["BTC"] =  (1 / rates["EUR"]["LINK"]) / (1 / rates["EUR"]["BTC"])
        rates["LINK"]["ETH"] =  (1 / rates["EUR"]["LINK"]) / (1 / rates["EUR"]["ETH"])
        rates["LINK"]["ATOM"] =  (1 / rates["EUR"]["LINK"]) / (1 / rates["EUR"]["ATOM"])
        rates["LINK"]["LUNA"] =  (1 / rates["EUR"]["LINK"]) / (1 / rates["EUR"]["LUNA"])
        rates["LINK"]["SOL"] =  (1 / rates["EUR"]["LINK"]) / (1 / rates["EUR"]["SOL"])
        rates["LINK"]["USDT"] =  (1 / rates["EUR"]["LINK"]) / (1 / rates["EUR"]["USDT"])

        rates["LUNA"]["LUNA"] = 1
        rates["LUNA"]["EUR"] = 1 / rates["EUR"]["LUNA"]
        rates["LUNA"]["BCH"] =  (1 / rates["EUR"]["LUNA"]) / (1 / rates["EUR"]["BCH"])
        rates["LUNA"]["BNB"] =  (1 / rates["EUR"]["LUNA"]) / (1 / rates["EUR"]["BNB"])
        rates["LUNA"]["BTC"] =  (1 / rates["EUR"]["LUNA"]) / (1 / rates["EUR"]["BTC"])
        rates["LUNA"]["ETH"] =  (1 / rates["EUR"]["LUNA"]) / (1 / rates["EUR"]["ETH"])
        rates["LUNA"]["LINK"] =  (1 / rates["EUR"]["LUNA"]) / (1 / rates["EUR"]["LINK"])
        rates["LUNA"]["ATOM"] =  (1 / rates["EUR"]["LUNA"]) / (1 / rates["EUR"]["ATOM"])
        rates["LUNA"]["SOL"] =  (1 / rates["EUR"]["LUNA"]) / (1 / rates["EUR"]["SOL"])
        rates["LUNA"]["USDT"] =  (1 / rates["EUR"]["LUNA"]) / (1 / rates["EUR"]["USDT"])

        rates["SOL"]["SOL"] = 1
        rates["SOL"]["EUR"] = 1 / rates["EUR"]["SOL"]
        rates["SOL"]["BCH"] =  (1 / rates["EUR"]["SOL"]) / (1 / rates["EUR"]["BCH"])
        rates["SOL"]["BNB"] =  (1 / rates["EUR"]["SOL"]) / (1 / rates["EUR"]["BNB"])
        rates["SOL"]["BTC"] =  (1 / rates["EUR"]["SOL"]) / (1 / rates["EUR"]["BTC"])
        rates["SOL"]["ETH"] =  (1 / rates["EUR"]["SOL"]) / (1 / rates["EUR"]["ETH"])
        rates["SOL"]["LINK"] =  (1 / rates["EUR"]["SOL"]) / (1 / rates["EUR"]["LINK"])
        rates["SOL"]["LUNA"] =  (1 / rates["EUR"]["SOL"]) / (1 / rates["EUR"]["LUNA"])
        rates["SOL"]["ATOM"] =  (1 / rates["EUR"]["SOL"]) / (1 / rates["EUR"]["ATOM"])
        rates["SOL"]["USDT"] =  (1 / rates["EUR"]["SOL"]) / (1 / rates["EUR"]["USDT"])

        rates["USDT"]["USDT"] = 1
        rates["USDT"]["EUR"] = 1 / rates["EUR"]["USDT"]
        rates["USDT"]["BCH"] =  (1 / rates["EUR"]["USDT"]) / (1 / rates["EUR"]["BCH"])
        rates["USDT"]["BNB"] =  (1 / rates["EUR"]["USDT"]) / (1 / rates["EUR"]["BNB"])
        rates["USDT"]["BTC"] =  (1 / rates["EUR"]["USDT"]) / (1 / rates["EUR"]["BTC"])
        rates["USDT"]["ETH"] =  (1 / rates["EUR"]["USDT"]) / (1 / rates["EUR"]["ETH"])
        rates["USDT"]["LINK"] =  (1 / rates["EUR"]["USDT"]) / (1 / rates["EUR"]["LINK"])
        rates["USDT"]["LUNA"] =  (1 / rates["EUR"]["USDT"]) / (1 / rates["EUR"]["LUNA"])
        rates["USDT"]["SOL"] =  (1 / rates["EUR"]["USDT"]) / (1 / rates["EUR"]["SOL"])
        rates["USDT"]["ATOM"] =  (1 / rates["EUR"]["USDT"]) / (1 / rates["EUR"]["ATOM"])
        
        return rates

    elif respuesta.status_code == 400:
        return("Hay algo erróneo en tu petición")
    elif respuesta.status_code == 401:
        return("No autorizado - Tu APIkey es errónea")
    elif respuesta.status_code == 403:
        return("Prohibido - Tu API no tiene acceso a esta funcionalidad")
    elif respuesta.status_code == 429:
        return("Has excedido el limite de peticiones de tu API key")
    elif respuesta.status_code == 550:
        return("Sin datos - La moneda pedida no existe en nuestra base de datos")
    else:
        return("Se ha producido un error desconocido")