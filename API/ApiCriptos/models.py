import requests
from ApiCriptos import URL_TASA_ESPECIFICA
from ApiCriptos.config import API_KEY
from ApiCriptos.errors import APIError

class CriptoValorModel:
    def __init__(self, origen = "", destino = ""):
        self.origen = origen
        self.destino = destino

        self.tasa = 0.0

    def obtener_tasa(self):
        respuesta = requests.get(URL_TASA_ESPECIFICA.format(
            self.origen,
            self.destino,
            API_KEY
        ))

        if respuesta.status_code != 200:
            raise APIError(respuesta.status_code, respuesta.json()["error"])

        self.tasa = round(respuesta.json()["rate"], 2)