import sqlite3

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
                        ORDER BY fecha
                    """
        )

    def recupera_wallet(self):
        return self.haz_consulta("""
                        SELECT moneda, cantidad_en_posesion, valor_compra
                        FROM cartera_virtual
                        ORDER BY moneda
                        """)
    
    