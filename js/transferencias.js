const formulario = document.querySelector('.transferencias form');
formulario.addEventListener('submit', function (event) {
	event.preventDefault();
	console.log('hola');
	const usuarioActual = localStorage.getItem('usuarioActual');
	const usuarios = JSON.parse(localStorage.getItem('usuarios'));

	const nombreUsuario = document.getElementById('nombre-usuario').value;
	const monto = parseFloat(document.getElementById('monto').value);
	const motivo = document.getElementById('motivo').value;

	// validamos campos
	if (nombreUsuario === '' || monto === '' || motivo === '') {
		mostrarError('Todos los campos son obligatorios');
		return;
	}

	if (monto <= 0) {
		mostrarError('El monto mínimo debe ser mayor a 0');
		return;
	}

	// validamos si el usuario tiene suficiente saldo para realizar el pago
	if (usuarios[usuarioActual.toLowerCase()].saldo >= monto) {
		// actualizamos el saldo del usuario
		if (usuarios[nombreUsuario]) {
			usuarios[nombreUsuario.toLowerCase()].saldo += monto;
			usuarios[nombreUsuario.toLowerCase()].historialTransferencias.push({
				monto: monto,
				motivo: motivo,
				emisor: usuarioActual,
				receptor: usuarios[nombreUsuario.toLocaleLowerCase()].nombre,
				esIngreso: true,
				fecha: new Date().toISOString().slice(0, 10)
			});
		}
		usuarios[usuarioActual.toLocaleLowerCase()].saldo -= monto;
		// registramos el pago en el historial de pagos
		usuarios[usuarioActual.toLocaleLowerCase()].historialTransferencias.push({
			monto: monto,
			motivo: motivo,
			emisor: usuarioActual,
			receptor: nombreUsuario,
			esIngreso: false,
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
