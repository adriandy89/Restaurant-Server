
var socket = io.connect();

// DOM Elements
let output = document.getElementById('output');

socket.emit('cargar:pedidos')
socket.on('cargar:pedidos', (data) => {
	data.forEach(element => {
		output.innerHTML +=  `<p>Mesa: ${element.mesa} <br>
						Pedido: ${element.pedido} <br></p>`
	});
	console.log('Datos Actualizados: ', data);
})

socket.on('actualizar:pedido', (data) => {
	console.log('Datos Actualizados: ', data);
	output.innerHTML +=  `<p>Mesa: ${data.mesa} <br>
						Pedido: ${data.pedido} <br></p>`
})