var cuentas = [
  { nombre: "Mali", saldo: 200, password: "1234" },
  { nombre: "Gera", saldo: 290, password: "5678" },
  { nombre: "Maui", saldo: 67, password: "9876" }
];

const messageDiv = document.getElementById('message');

document.addEventListener('DOMContentLoaded', function() {

  var intentos = 0;

  messageDiv.innerHTML = `
    <label for="accountSelect">Seleccione una cuenta:</label>
    <select id="accountSelect">
      <option value="0">Mali</option>
      <option value="1">Gera</option>
      <option value="2">Maui</option>
    </select>
    <button id="selectAccount">Seleccionar</button>
  `;

  const accountSelect = document.getElementById('accountSelect');
  const selectAccountButton = document.getElementById('selectAccount');

  selectAccountButton.addEventListener('click', function() {

    const selectedAccountId = parseInt(accountSelect.value);
    const selectedAccount = cuentas[selectedAccountId];

    messageDiv.innerHTML = `
      <label for="pin">Ingrese su PIN:</label>
      <input type="password" id="pin" maxlength="4" required>
      <button id="pinSubmit">Continuar</button>
      <div id="pinError" class="error-box"></div>
    `;

    const pinInput = document.getElementById('pin');
    const pinSubmitButton = document.getElementById('pinSubmit');
    const pinErrorDiv = document.getElementById('pinError');

    const maxAttemptsError = document.createElement('div');
    maxAttemptsError.id = 'maxAttemptsError';
    maxAttemptsError.classList.add('error-box');
    maxAttemptsError.style.display = 'none';
    maxAttemptsError.textContent = '¡Has llegado al máximo de intentos!';

    messageDiv.appendChild(maxAttemptsError);

    pinSubmitButton.addEventListener('click', function() {

      pinErrorDiv.style.display = 'none';

      const enteredPin = pinInput.value;
      const correctPin = selectedAccount.password;

      intentos++;

      if (enteredPin === correctPin) {
        messageDiv.innerHTML = `
          <p>Bienvenido/a, ${selectedAccount.nombre}.</p>
          <button id="checkBalance">Consultar Saldo</button>
          <button id="deposit">Ingresar Monto</button>
          <button id="withdraw">Retirar Monto</button>
          <div class="result-box hidden" id="result"></div>
        `;

        const checkBalanceButton = document.getElementById('checkBalance');
        const depositButton = document.getElementById('deposit');
        const withdrawButton = document.getElementById('withdraw');
        const resultDiv = document.getElementById('result');

        checkBalanceButton.addEventListener('click', function() {
          resultDiv.innerHTML = '';
          const saldoSpan = document.createElement('span');
          saldoSpan.textContent = `Saldo actual: $${selectedAccount.saldo}`;
          resultDiv.appendChild(saldoSpan);
          resultDiv.classList.remove('hidden');
        });

        depositButton.addEventListener('click', function() {
          resultDiv.innerHTML = `
            <label for="depositAmount">Ingrese el monto a depositar:</label>
            <input type="number" id="depositAmount" step="0.01" min="0">
            <button id="depositSubmit">Depositar</button>
            <div id="depositError" class="error-box"></div>
          `;

          const depositAmountInput = document.getElementById('depositAmount');
          const depositSubmitButton = document.getElementById('depositSubmit');
          const depositErrorDiv = document.getElementById('depositError');

          depositSubmitButton.addEventListener('click', function() {
            depositErrorDiv.style.display = 'none';
            const amount = parseFloat(depositAmountInput.value);
            if (!isNaN(amount) && amount > 0) {
              if (selectedAccount.saldo + amount > 990) {
                depositErrorDiv.textContent = "El saldo no puede ser mayor a $990.";
                depositErrorDiv.style.display = 'block';
              } else {
                selectedAccount.saldo += amount;
                resultDiv.innerHTML = `Monto depositado: $${amount}<br>Nuevo saldo: <span class="new-saldo">$${selectedAccount.saldo}</span>`;
                resultDiv.classList.remove('hidden');
              }
            } else {
              depositErrorDiv.textContent = "Ingrese un monto válido.";
              depositErrorDiv.style.display = 'block';
            }
          });
        });

        withdrawButton.addEventListener('click', function() {
          resultDiv.innerHTML = `
            <label for="withdrawAmount">Ingrese el monto a retirar:</label>
            <input type="number" id="withdrawAmount" step="0.01" min="0" max="${selectedAccount.saldo}">
            <button id="withdrawSubmit">Retirar</button>
            <div id="withdrawError" class="error-box"></div>
          `;
          const withdrawAmountInput = document.getElementById('withdrawAmount');
          const withdrawSubmitButton = document.getElementById('withdrawSubmit');
          const withdrawErrorDiv = document.getElementById('withdrawError');

          withdrawSubmitButton.addEventListener('click', function() {
            withdrawErrorDiv.style.display = 'none';
            const amount = parseFloat(withdrawAmountInput.value);
            if (!isNaN(amount) && amount > 0 && amount <= selectedAccount.saldo) {
              if (selectedAccount.saldo - amount < 10) {
                withdrawErrorDiv.textContent = "El saldo no puede ser menor a $10.";
                withdrawErrorDiv.style.display = 'block';
              } else {
                selectedAccount.saldo -= amount;
                resultDiv.innerHTML = `Monto retirado: $${amount}<br>Nuevo saldo: <span class="new-saldo">$${selectedAccount.saldo}</span>`;
                resultDiv.classList.remove('hidden');
              }
            } else {
              withdrawErrorDiv.textContent = "Monto inválido o saldo insuficiente.";
              withdrawErrorDiv.style.display = 'block';
            }
          });
        });

      } else {
        pinErrorDiv.textContent = 'PIN incorrecto. Por favor, inténtelo nuevamente.';
        pinInput.value = '';
        pinErrorDiv.style.display = 'block';

        if (intentos === 3) {
          pinErrorDiv.style.display = 'none';
          maxAttemptsError.style.display = 'block';
          pinInput.style.display = 'none';
          pinSubmitButton.style.display = 'none';
        }
      }
    });
  });
});
