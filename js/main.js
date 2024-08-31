// Carga y muestra la información del usuario al cargar la página
const usuarios = recuperarUsuariosDeLocalStorage(); // Recupera todos los usuarios de localStorage
const usuarioActual = localStorage.getItem('usuarioActual'); // Obtiene el usuario actual
const datosUsuario = usuarios[usuarioActual] || usuarios; // Accede a los datos del usuario actual
if (datosUsuario) {
	saludarUsuario(datosUsuario.nombre);
	const saldoNumerico = parseFloat(datosUsuario.saldo); // Convierte el saldo a número para asegurar la precisión
	document.getElementById('user-balance').textContent = `$${saldoNumerico.toFixed(2)}`; // Formatea y muestra el saldo
	cargarHistorial(datosUsuario.historialTransferencias, 'transfer-history', 'transfer'); // Carga el historial de transferencias
	cargarHistorial(datosUsuario.historialPagos, 'payment-history', 'payment'); // Carga el historial de pagos
	cargarHistorial(datosUsuario.historialPrestamos, 'loan-history', 'loan'); // Carga el historial de préstamos
}

// Función para cargar y mostrar el historial en la interfaz del usuario
function cargarHistorial(historial, elementoId, tipo) {
	const ul = document.getElementById(elementoId); // Accede al elemento donde se mostrará el historial
	historial.forEach((item) => {
		switch (tipo) {
			case 'transfer':
				ul.innerHTML += `<li class="transfer ${item.esIngreso ? 'ingreso' : 'egreso'}">
				<span>${item.esIngreso ? 'Emisor' : 'Receptor'}: ${item.esIngreso ? item.emisor : item.receptor}</span>
				<span class="amount">$${item.monto}</span>
				</li>`;
				break;
			case 'payment':
				ul.innerHTML += `<li class="payment">
				<span>N°: ${item.numero}</span>
				<span class="amount">$${item.monto}</span>
				</li>`;
				break;
			case 'loan':
				ul.innerHTML += `<li class="loan">
				<span>N°: ${item.numero}</span> 
				<span class="amount">$${item.monto}${item.tasaInteres ? ' al ' + item.tasaInteres : ''}</span></li>`;
				break;
		}
	});
}

function saludarUsuario(nombreUsuario) {
	const textoBienvenidaElement = document.querySelector('.user-dashboard__hello');
	if (!textoBienvenidaElement) return;

	textoBienvenidaElement.textContent += ` ${nombreUsuario.toLowerCase()} 👋`;
}
