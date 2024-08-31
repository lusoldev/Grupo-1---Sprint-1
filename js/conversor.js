// mostrar valores
function actualizarValor(valor) {
    document.getElementById('valor').textContent = valor;
}

// hacer conver
function convertir() {
    var valor = parseFloat(document.getElementById("cantidad").value);
    var de = document.getElementById("de").value;
    var a = document.getElementById("a").value;

    // Tasas de cambio
    var tasas = {
        'USD': 1330.00,  
        'EUR': 1005.00 
    }

    var resultado = 0;

    // convertir segun lo que el usuario pida
    if (de === 'ARS' && a === 'USD') {
        resultado = valor / tasas['USD'];
    } else if (de === 'USD' && a === 'ARS') {
        resultado = valor * tasas['USD'];
    } else if (de === 'ARS' && a === 'EUR') {
        resultado = valor / tasas['EUR'];
    } else if (de === 'EUR' && a === 'ARS') {
        resultado = valor * tasas['EUR'];
    } else if (de === 'USD' && a === 'EUR') {
        resultado = (valor * tasas['USD']) / tasas['EUR'];
    } else if (de === 'EUR' && a === 'USD') {
        resultado = (valor * tasas['EUR']) / tasas['USD'];
    } else {
        resultado = valor; // Si se selecciona la misma moneda
    }

    // mostrar resultado final
    document.getElementById('resultado').innerHTML = "Resultado: $" + resultado.toFixed(2);
}
