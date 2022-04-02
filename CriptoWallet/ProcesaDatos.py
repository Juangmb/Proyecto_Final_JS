import sqlite3

class ProcesaDatos:
    def __init__(self, file="memory"):
        self.origen_datos = file

    #Programar todas las acciones de relacion con la base de datos