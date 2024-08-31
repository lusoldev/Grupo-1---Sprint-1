const formulario = document.querySelector('.pagos form');
formulario.addEventListener('submit', function (event) {
	event.preventDefault();
	const usuarioActual = localStorage.getItem('usuarioActual');
	const usuarios = JSON.parse(localStorage.getItem('usuarios'));

	const numeroFactura = document.getElementById('numero-factura').value;
	const monto = parseFloat(document.getElementById('monto').value);
	const metodoPago = document.getElementById('metodo-pago').value;

	// validamos campos
	if (numeroFactura === '' || monto === '' || metodoPago === '') {
		mostrarError('Todos los campos son obligatorios');
		return;
	}

	if (monto <= 0) {
		mostrarError('El monto mínimo debe ser mayor a 0');
		return;
	}

	// validamos si el usuario tiene suficiente saldo para realizar el pago
	if (usuarios[usuarioActual].saldo >= monto) {
		// actualizamos el saldo del usuario
		usuarios[usuarioActual].saldo -= monto;

		// registramos el pago en el historial de pagos
		usuarios[usuarioActual].historialPagos.push({
			numero: numeroFactura,
			monto: monto,
			metodo: metodoPago,
			fecha: new Date().toISOString().slice(0, 10) // Formato YYYY-MM-DD
		});

		actualizarUsuariosEnLocalStorage(usuarios);
		mostrarExito('Pago realizado con éxito');
	} else {
		mostrarError('Saldo insuficiente para realizar el pago.');
	}
});

function mostrarError(mensaje) {
	const alerta = document.createElement('p');
	alerta.textContent = mensaje;
	alerta.classList.add('error');
	formulario.appendChild(alerta);
	setTimeout(() => alerta.remove(), 3000);
}

function mostrarExito(mensaje) {
	const alerta = document.createElement('p');
	alerta.textContent = mensaje;
	alerta.classList.add('exito');
	formulario.appendChild(alerta);
	setTimeout(() => alerta.remove(), 3000);
}
