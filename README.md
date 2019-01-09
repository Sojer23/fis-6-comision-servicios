# Comisión de Servicios - FIS - Grupo 6
Desarrollo de microservicio destinado a la gestión de la comisión de servicios asociado a un proyecto de investigación en la universidad de Sevilla.

# Hitos alcanzados del microservicio avanzado
- Pruebas unitarias con Mock y stubs (carpeta test)
- Validación del formulario de solicitud de comisión con Angular (campos requeridos, fecha de fin posterior a fecha inicio,...)
- Consumer contract con el grupo 1 (subido al broker de pactos)
- Integración con APIs externas (API del grupo 1 y API de capitales del mundo)
- Implementación del patrón circuit breaker en la conexión con la API del grupo 1
- Documentación de la API en Postman (https://documenter.getpostman.com/view/1788279/RznBPLvL)
- Control de autenticación usando Auth0
- Secure Apikey login: El usuario recibe la API key al iniciar sesión y la almacena en sessionStorage, evitando tener que poner la API en el código de forma pública
- Filtro de solicitudes en la vista del administrador usando Pipes de Angular













## Ejecución del servidor

La primera vez que se descargue el repositorio se tienen que ejecutar los siguientes comandos en orden:

### Descarga de Dependencias
El repositorio se descargará sin ninguna dependencia, para instalar todas las dependencias se ejecuta:
`npm install` 

### Contrucción de la Aplicación
Una vez instaladas las dependencias pasamos a contruir la aplicaicón con el siguiente comando. 

`npm run-script build`

A partir de aquí, se verá en la raíz del repositorio una carpeta llamada `/dist`.


### Base de datos
Un paso previo a la ejecución de la aplicación, es la puesta en marcha de la base de datos. En este proyecto se está trabajando con MongoDB. La configuración del proyecto está enfocada a conexión en local(localhost) o en remoto (MongoLab).

#### Ejecución en Local
- Con aplicación MongoDB: `mongod`
- Con contenedor de Docker: 1. `docker pull mongo` 2. `docker run --name nombre_contenedor -d mongo:tag`
#### Ejecución en Remoto
- Tener configurado e introducir URL, asignada por MongoLab, por variable de entorno.


### Lanzamiento
Para lanzar la aplicación se usa el siguiente comando:
`npm start`
Tras la ejecución del comando en la consola nos aparecerá el puerto en el que se está ejecutando. Por lo general se ejecutará en la siguiente URL: `http://localhost:3000/`

Si accedemos al navegador debería estar disponible.

### Lanzamiento Remoto


- URL Heroku: https://fis2018-06.herokuapp.com
- Acceso a recursos comisiones: https://fis2018-06.herokuapp.com/api/v1/comisiones
