const express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	bodyParser = require('body-parser'),
	cors = require('cors'),
	path = require('path'),
	routes = require('./routes'),
	io = require('socket.io').listen(server),
	nicknames = [];

const Menu = require('./models/menu');
const Dependiente = require('./models/dependiente');
const Mesa = require('./models/mesa');
const Pedido = require('./models/pedido');

const tipoMenu = require('./models/tipoMenu');


var socketMap = [];


app.use(bodyParser.json());
app.use(cors());

// Carpeta Publica
app.use(express.static('public'));

// Mongoose - MONGO DB
const mongoose = require('mongoose');
const credentials = require('./credentials.js');
const dbUrl = credentials.MONGOURL;

mongoose.set("useFindAndModify", false);
mongoose.connect(dbUrl, {
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true
})
	.then(data => console.log('DB connected'))
	.catch((err) => { console.log(err); process.exit(1) });

//  Arrancar Servidor
server.listen(3000);

// Static files
app.use(express.static(path.join(__dirname, 'public')));
app.get('*', (req, res) => {
return 	res.redirect("/api/pedidos")
});

// WEBSOCKETS - Socket.io
// (socket) ---> Viene de view.js cuando lo iniciamos
io.sockets.on('connection', async function (socket) {
	console.log('IO working, ID: ', socket.id);

	socketMap.push(socket);
	let menu = await Menu.find({})
	let dependiente = await Dependiente.find({})
	let mesa = await Mesa.find({})
	let pedidos = await Pedido.find({})
	
	for(let socketMapObj of socketMap){
	if(menu.length > 0){
		socketMapObj.emit('dataUpdate', {menu,dependiente,mesa,pedidos})
	}}
	
	socket.on('menu:agregar', (data) => {
		console.log(data);
		let orden = new Menu({ tipo: data.tipo, nombre: data.nombre, precio: data.precio, descripcion: data.descripcion, url: data.url });
		orden.save( async (err, data) => {
			if (!err) {
				console.log(data);
				//let menu = await Menu.find({})
				for(let socketMapObj of socketMap){
					//if(menu.length > 0)
						socketMapObj.emit('menu:agregado', data)
				}
			}
			else console.log(err);
		})		
	})

	socket.on('dependiente:agregar', (data) => {
		console.log(data);
		let orden = new Dependiente({ nombre: data.nombre, codigo: data.codigo, admin: data.admin });
		orden.save( async (err, data) => {
			if (!err) {
				console.log(data);
				for(let socketMapObj of socketMap){
					socketMapObj.emit('dependiente:agregado', data)
				}
			}
			else console.log(err);
		})		
	})

	socket.on('mesa:agregar', (data) => {
		console.log(data);
		let orden = new Mesa({ numero: data.numero, descripcion: data.descripcion });
		orden.save( async (err, data) => {
			if (!err) {
				console.log(data);
				for(let socketMapObj of socketMap){
					socketMapObj.emit('mesa:agregado', data)
				}
			}
			else console.log(err);
		})		
	})

	socket.on('pedido:agregar', (data) => {
		console.log(data);
		let orden = new Pedido({ mesa: data.mesa, dependiente: data.dependiente, pedido: data.pedido });
		orden.save( async (err, data) => {
			if (!err) {
				console.log(data);
				for(let socketMapObj of socketMap){
					socketMapObj.emit('pedido:agregado', data)
				}
			}
			else console.log(err);
		})		
	})

//Arreglar a partir de aki
	socket.on('enviar:pedido', (data) => {
		console.log(data);
		let orden = new Menu({ mesa: data.mesa, pedido: data.pedido });
		orden.save((err, data) => {
			if (!err) {
				io.sockets.emit('actualizar:pedido', data);
				console.log(data);
			}
			else console.log(err);
		})

	})



	socket.on('new user', function (data, callback) {
		if (nicknames.indexOf(data) != -1) {
			callback(false);
		} else {
			callback(true);
			socket.nickname = data;
			nicknames.push(socket.nickname);
			updateNicknames();
			io.sockets.emit('is_online', '🔵 <i>' + socket.nickname + ' se unió a la conversación...</i><br/>');
		}
	});
	// recarga la lista de nicks
	function updateNicknames() {
		io.sockets.emit('usernames', nicknames);
	}
	// envía el nombre de usuario junto con el mensaje
	socket.on('send message', function (data) {
		var message = new Menu({ pedido: data, mesa: socket.nickname });
		message.save((err) => {
			if (!err)
				io.sockets.emit('new message', message);
		})
	});
	// controla la desconexión de los usuarios
	socket.on('disconnect', function (data) {
		if (!socket.nickname) return;
		nicknames.splice(nicknames.indexOf(socket.nickname), 1);
		updateNicknames();
		io.sockets.emit('is_offline', '🔴 <i>' + socket.nickname + ' dejó la conversación...</i><br/>');
	});
})


