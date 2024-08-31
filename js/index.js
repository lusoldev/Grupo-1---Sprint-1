// Recupera los datos de los usuarios almacenados en localStorage
function recuperarUsuariosDeLocalStorage() {
	const usuarios = localStorage.getItem('usuarios');
	if (!usuarios) {
		// Si no hay usuarios, crea un usuario demo con datos de ejemplo
		const usuarioDemo = {
			nombre: 'Demo',
			password: '1234',
			saldo: 1000,
			historialTransferencias: [
				{
					fecha: '2024-08-15',
					monto: 200,
					esIngreso: true,
					emisor: 'Proveedor A',
					receptor: 'Demo',
					descripcion: 'Pago de servicios'
				},
				{
					fecha: '2024-08-20',
					monto: 150,
					esIngreso: true,
					emisor: 'Proveedor B',
					receptor: 'Demo',
					descripcion: 'Compra de material'
				}
			],
			historialPagos: [
				{ fecha: '2024-08-21', numero: '14231', monto: 100, metodo: 'Tarjeta de crédito' },
				{ fecha: '2024-08-22', numero: '13521', monto: 50, metodo: 'Transferencia bancaria' }
			],
			historialPrestamos: [
				{
					fecha: '2024-08-21',
					numero: '1',
					monto: 5000,
					tasaInteres: '5%'
				}
			]
		};
		localStorage.setItem('usuarios', JSON.stringify(usuarioDemo));
		localStorage.setItem('usuarioActual', 'Demo');
		return usuarioDemo;
	}
	return JSON.parse(usuarios);
}

// Actualiza la información de usuarios en localStorage
function actualizarUsuariosEnLocalStorage(usuarios) {
	localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

// Actualiza el nombre del usuario en el encabezado
function actualizarNombreUsuarioEnHeader() {
	const usuarios = recuperarUsuariosDeLocalStorage();
	const usuarioActual = localStorage.getItem('usuarioActual');
	const usuario = usuarios[usuarioActual];
	const elementoNombreUsuario = document.querySelector('.user-options span');
	elementoNombreUsuario.textContent = usuario ? usuario.nombre : 'Usuario nuevo';
}

// Gestiona el texto del botón de cuenta según el estado del usuario
function actualizarBotonCuenta() {
	const usuarioActual = localStorage.getItem('usuarioActual');
	const botonCuenta = document.getElementById('account-action');
	const esPaginaDeCuentas = window.location.pathname.includes('cuentas');

	if (usuarioActual === 'Demo' && esPaginaDeCuentas) {
		botonCuenta.innerHTML = '⬅ Volver';
		botonCuenta.href = 'index.html';
	} else if (usuarioActual !== 'Demo' && esPaginaDeCuentas) {
		botonCuenta.innerHTML = 'Cerrar sesión';
		botonCuenta.href = '#';
		botonCuenta.onclick = function () {
			cerrarSesionYVolverADemo();
			return false;
		};
	} else if (!esPaginaDeCuentas && usuarioActual !== 'Demo') {
		botonCuenta.innerHTML = 'Cambiar cuenta';
	} else {
		botonCuenta.innerHTML = 'Ingreso <span class="plus-sign material-symbols-outlined">add</span>';
		botonCuenta.href = './cuentas.html';
		botonCuenta.onclick = null;
	}
}

// Cierra la sesión del usuario actual y vuelve a la cuenta de demostración
function cerrarSesionYVolverADemo() {
	const usuarios = JSON.parse(localStorage.getItem('usuarios')) || {};
	if (!usuarios['Demo']) {
		usuarios['Demo'] = {
			nombre: 'Demo',
			password: '1234',
			saldo: 1000,
			historialTransferencias: [
				{
					fecha: '2024-08-15',
					esIngreso: true,
					monto: 200,
					emisor: 'Proveedor A',
					receptor: 'Demo',
					descripcion: 'Pago de servicios'
				},
				{
					fecha: '2024-08-20',
					esIngreso: false,
					monto: 150,
					emisor: 'Proveedor B',
					receptor: 'Demo',
					descripcion: 'Compra de material'
				}
			],
			historialPagos: [
				{ fecha: '2024-08-21', numero: '14231', monto: 100, metodo: 'Tarjeta de crédito' },
				{ fecha: '2024-08-22', numero: '13521', monto: 50, metodo: 'Transferencia bancaria' }
			],
			historialPrestamos: [
				{
					fecha: '2024-08-21',
					numero: '1',
					monto: 5000,
					tasaInteres: '5%'
				}
			]
		};
		localStorage.setItem('usuarios', JSON.stringify(usuarios));
	}
	localStorage.setItem('usuarioActual', 'Demo');
	window.location.href = 'index.html'; // Redirige a la página de inicio
}

actualizarNombreUsuarioEnHeader();
actualizarBotonCuenta();
