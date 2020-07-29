
var socket = io.connect();

// DOM Elements
let mesa = document.getElementById('mesa');
let pedido1 = document.getElementById('pedido1');
let pedido2 = document.getElementById('pedido2');
let button = document.getElementById('send');



button.addEventListener('click', () => {

	let pedido = []
	pedido.push(pedido1.value, pedido2.value)

	socket.emit('enviar:pedido', {mesa: mesa.value, pedido: pedido})

	console.log('Clic pressed', {mesa: mesa.value ,pedido: pedido.value});
})
