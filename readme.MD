## README

Es un chat escrito en javascript node.js que puede verse en pantallas grandes y móviles. 
Guarda el contenido de las conversaciones en una base de datos mongodb remota para en el futuro recuperar los datos (en una mejora) recuperar las conversaciones en caso de desconexión/reconexión. 

Gran parte de lo hecho viene de un par de tutoriales que leí antes, así que los uní como pude. 

https://itnext.io/build-a-group-chat-app-in-30-lines-using-node-js-15bfe7a2417b

https://www.freecodecamp.org/news/simple-chat-application-in-node-js-using-express-mongoose-and-socket-io-ee62d94f5804/

Para hacerlo funcionar es necesario:

- Tener Node instalado
- Instalar localmente express con `npm install express --save` 
- Instalar localmente mongoose con `npm install mongoose --save` 
- Hacerse una cuenta en mlab.com (con un plan sandbox que es gratis) para tener acceso a una base de datos mongodb remota o algo que sea similar. 
- Crear un archivo local llamado credentials.js que contenga la url de conexión. 

	module.exports = {
		MONGOURL: 'mongodb+srv://[base]:[contrasena]@chat-qypoo.gcp.mongodb.net/test?retryWrites=true&w=majority'
	};

donde reemplazan los dos campos con la base de datos y la contraseña (sin los corchetes). 

[Una demo](https://chat-socketio-example.herokuapp.com/)
