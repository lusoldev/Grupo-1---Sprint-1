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
        const monthlyInterest = (interestRate / 100) / 12;
        const numberOfPayments = term;

        const monthlyPayment = (amount * monthlyInterest) / (1 - Math.pow((1 + monthlyInterest), -numberOfPayments));
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

function resetForm() {
    document.getElementById('simulator-form').reset();
    document.getElementById('monthly-payment').innerText = '';
    document.getElementById('total-payment').innerText = '';
}

document.getElementById('simulator-form').addEventListener('submit', function(event) {
    event.preventDefault();
    calculateLoanWithValidation();
});

document.getElementById('reset-button').addEventListener('click', resetForm);

function saveSimulation() {
    const loanType = document.getElementById('loan-type').value;
    const amount = document.getElementById('amount').value;
    const interestRate = document.getElementById('interest-rate').value;
    const term = document.getElementById('term').value;
    const monthlyPayment = document.getElementById('monthly-payment').innerText;
    const totalPayment = document.getElementById('total-payment').innerText;

    if (loanType && amount && interestRate && term && monthlyPayment && totalPayment) {
        const savedSimulations = JSON.parse(localStorage.getItem('savedSimulations')) || [];
        savedSimulations.push({
            loanType,
            amount,
            interestRate,
            term,
            monthlyPayment,
            totalPayment
        });
        localStorage.setItem('savedSimulations', JSON.stringify(savedSimulations));
        alert('Simulación guardada con éxito.');
    } else {
        alert('Por favor, completa la simulación antes de guardar.');
    }
}

function loadSavedSimulations() {
    const savedSimulations = JSON.parse(localStorage.getItem('savedSimulations')) || [];
    const simulationsList = document.getElementById('saved-simulations');

    simulationsList.innerHTML = '';

    savedSimulations.forEach(simulation => {
        const li = document.createElement('li');
        li.innerText = `${simulation.loanType}: $${simulation.amount} a ${simulation.term} meses - Cuota: ${simulation.monthlyPayment}, Pago Total: ${simulation.totalPayment}`;
        simulationsList.appendChild(li);
    });
}

document.getElementById('save-button').addEventListener('click', saveSimulation);
document.addEventListener('DOMContentLoaded', loadSavedSimulations);
