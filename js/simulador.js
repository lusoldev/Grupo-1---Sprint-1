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

document.getElementById('simulator-form').addEventListener('submit', function (event) {
	event.preventDefault();
	calculateLoanWithValidation();
});
