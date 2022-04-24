# CriptoWallet

### Descripción

CriptoWallet es una aplicación para simular la compraventa de criptomonedas y proporcionar el valor en tiempo real de la misma

## Instrucciones

### Crear del entorno virtual

````
python -m venv venv
````

### Activar el entorno virtual

macOS:
````
. venv/bin/activate
````
Windows:
````
venv\Scripts\activate
````
### Instalar los requisitos de la aplicación

````
pip install -r requirements.txt
````

### Crear la Base de Datos

Crear una base de datos desde el mandato sql que se encuentra en Basedatos/crea_tablas.sql

### Renombrar archivos _template

1. .env_template:
    Renombrar a .env y establecer los parámetros indicando la ruta a la aplicación flask y seleccionando development o production

2. config_template.py:
    Renombrar a config.py y añadir la ruta a la base de datos creada anteriormente y establecer una secret key

### Configurar Api

1. Acceder a https://www.coinapi.io/ y solicitar una Api Key.

2. En la carpeta Api del repo renombrar el archivo config_template a config.py e introducir la Api Key obtenida

### Lanzar la aplicacion Flask

Una vez completados los pasos anteriores y asegurandonos de tener el entorno virtual activado, ya podemos lanzar la aplicacion desde el terminal

````
flask run
````
