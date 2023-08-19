//Definición de cuentas de ejemplo con nombre, saldo y contraseña
var cuentas = [
  { nombre: "Mali", saldo: 200, password: "1234" },
  { nombre: "Gera", saldo: 290, password: "5678" },
  { nombre: "Maui", saldo: 67, password: "9876" }
];

//Obtener referencia al div donde se mostrarán los mensajes
const messageDiv = document.getElementById('message');

//Esperar a que el contenido del DOM esté listo
document.addEventListener('DOMContentLoaded', function() {

  //Mostrar formulario para seleccionar una cuenta
  messageDiv.innerHTML = `
    <label for="accountSelect">Seleccione una cuenta:</label>
      <select id="accountSelect">
        <option value="0">Mali</option>
        <option value="1">Gera</option>
        <option value="2">Maui</option>
      </select>
    <button id="selectAccount">Seleccionar</button>
  `;

  //Obtener referencias a elementos del DOM
  const accountSelect = document.getElementById('accountSelect');
    const selectAccountButton = document.getElementById('selectAccount');

  //Agregar evento al botón de selección de cuenta
  selectAccountButton.addEventListener('click', function() {

  //Obtener el ID de cuenta seleccionada
  const selectedAccountId = parseInt(accountSelect.value);

  //Obtener la cuenta seleccionada a partir del arreglo de cuentas
  const selectedAccount = cuentas[selectedAccountId];

  //Mostrar el formulario para ingresar el PIN
  messageDiv.innerHTML = `
      <label for="pin">Ingrese su PIN:</label>
        <input type="password" id="pin" maxlength="4" required>
        <button id="pinSubmit">Continuar</button>
      <div id="pinError" class="error-box"></div>
    `;

    //Obtener referencias a elementos del formulario de PIN
    const pinInput = document.getElementById('pin');
      const pinSubmitButton = document.getElementById('pinSubmit');
        const pinErrorDiv = document.getElementById('pinError');

    //Agregar evento al botón de envío del PIN
      pinSubmitButton.addEventListener('click', function() {

    // Ocultar el cuadro de error si se muestra    
      pinErrorDiv.style.display = 'none'; 

    //Obtener el PIN ingresado y el PIN correcto de la cuenta seleccionada  
    const enteredPin = pinInput.value;
      const correctPin = selectedAccount.password;

      //Verificar si el PIN ingresado es correcto
      if (enteredPin === correctPin) {

        //Mostrar el menú de opciones de cuenta
        messageDiv.innerHTML = `
          <p>Bienvenido/a, ${selectedAccount.nombre}.</p>
          <button id="checkBalance">Consultar Saldo</button>
          <button id="deposit">Ingresar Monto</button>
          <button id="withdraw">Retirar Monto</button>
          <div class="result-box hidden" id="result"></div>
        `;

        //Aquí se describirían los comentarios para cada botón y su función
        const checkBalanceButton = document.getElementById('checkBalance');
        const depositButton = document.getElementById('deposit');
        const withdrawButton = document.getElementById('withdraw');
        const resultDiv = document.getElementById('result');

        checkBalanceButton.addEventListener('click', function() {
          resultDiv.innerHTML = ''; // Limpiar resultados anteriores
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
            depositErrorDiv.style.display = 'none'; // Ocultar el cuadro de error si se muestra
              const amount = parseFloat(depositAmountInput.value);
            if (!isNaN(amount) && amount > 0) {

              if (selectedAccount.saldo + amount > 990) {

                  depositErrorDiv.textContent = "El saldo no puede ser mayor a $990.";
                depositErrorDiv.style.display = 'block'; // Mostrar el cuadro de error
              } else {

                selectedAccount.saldo += amount;
                  resultDiv.innerHTML = `Monto depositado: $${amount}<br>Nuevo saldo: <span class="new-saldo">$${selectedAccount.saldo}</span>`;
                    resultDiv.classList.remove('hidden');
              }

            } else {
                depositErrorDiv.textContent = "Ingrese un monto válido.";
                  depositErrorDiv.style.display = 'block'; // Mostrar el cuadro de error
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
            withdrawErrorDiv.style.display = 'none'; // Ocultar el cuadro de error si se muestra
              const amount = parseFloat(withdrawAmountInput.value);

            if (!isNaN(amount) && amount > 0 && amount <= selectedAccount.saldo) {

              if (selectedAccount.saldo - amount < 10) {
                  withdrawErrorDiv.textContent = "El saldo no puede ser menor a $10.";
                    withdrawErrorDiv.style.display = 'block'; // Mostrar el cuadro de error

              } else {
                  selectedAccount.saldo -= amount;
                    resultDiv.innerHTML = `Monto retirado: $${amount}<br>Nuevo saldo: <span class="new-saldo">$${selectedAccount.saldo}</span>`;
                      resultDiv.classList.remove('hidden');
              }
            } else {
                withdrawErrorDiv.textContent = "Monto inválido o saldo insuficiente.";
                  withdrawErrorDiv.style.display = 'block'; // Mostrar el cuadro de error
            }
          });
        });

      } else {
        //Mostrar mensaje de error si el Pin es incorrecto
        pinErrorDiv.textContent = 'PIN incorrecto. Por favor, inténtelo nuevamente.';

        // Limpiar el campo de PIN
        pinInput.value = '';

        // Mostrar el mensaje de error
        pinErrorDiv.style.display = 'block'; // Mostrar el cuadro de error
      }
    });
  });
});