const formulario = document.querySelector('#simulator-form');

function openSimulator(loanType, interestRate) {
	document.getElementById('loan-type').value = loanType;
	document.getElementById('interest-rate').value = interestRate;
	document.getElementById('amount').value = '';
	document.getElementById('term').value = '';
	document.getElementById('monthly-payment').innerText = '';
	document.getElementById('total-payment').innerText = '';
}

function calculateLoan() {
	const amount = parseFloat(document.getElementById('amount').value);
	const interestRate = parseFloat(document.getElementById('interest-rate').value);
	const term = parseInt(document.getElementById('term').value);

	if (amount && interestRate && term) {
		const monthlyInterest = interestRate / 100 / 12;
		const numberOfPayments = term;

		const monthlyPayment = (amount * monthlyInterest) / (1 - Math.pow(1 + monthlyInterest, -numberOfPayments));
		const totalPayment = monthlyPayment * numberOfPayments;

		document.getElementById('monthly-payment').innerText = `Cuota Mensual: $${monthlyPayment.toFixed(2)}`;
		document.getElementById('total-payment').innerText = `Pago Total: $${totalPayment.toFixed(2)}`;
	} else {
		alert('Por favor, completa todos los campos del formulario.');
	}
}

function submitLoan() {
	const usuarios = recuperarUsuariosDeLocalStorage();
	const usuarioActual = localStorage.getItem('usuarioActual');
	const type = document.getElementById('loan-type').value;
	const amount = parseFloat(document.getElementById('amount').value);
	const interestRate = parseFloat(document.getElementById('interest-rate').value);
	const term = parseInt(document.getElementById('term').value);
	if (confirm('¿Estás seguro de que quieres solicitar el prestamo?')) {
		usuarios[usuarioActual.toLowerCase()].saldo = parseFloat(usuarios[usuarioActual.toLowerCase()].saldo) + amount;
		usuarios[usuarioActual.toLowerCase()].historialPrestamos.push({
			fecha: new Date().toISOString().slice(0, 10),
			monto: amount,
			tipo: type,
			tasaInteres: interestRate,
			plazo: term
		});
		actualizarUsuariosEnLocalStorage(usuarios);
		mostrarExito('Prestamo realizado con éxito.');
		formulario.reset();
	} else {
		mostrarError('El prestamo no ha podido procesarse correctamente.');
	}
}

function validateForm() {
	const amount = document.getElementById('amount').value;
	const term = document.getElementById('term').value;

	if (amount <= 0 || term <= 0) {
		alert('El monto y el plazo deben ser mayores que cero.');
		return false;
	}
	return true;
}

function calculateLoanWithValidation() {
	if (validateForm()) {
		calculateLoan();
	}
}

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

document.getElementById('simulator-form').addEventListener('submit', function (event) {
	event.preventDefault();
	calculateLoanWithValidation();
});
