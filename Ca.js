// Definición de cuentas de ejemplo con nombre, saldo y contraseña
var cuentas = [
  { nombre: "Mali", saldo: 200, password: "1234" },
  { nombre: "Gera", saldo: 290, password: "5678" },
  { nombre: "Maui", saldo: 67, password: "9876" }
];

// Obtener referencia al div donde se mostrarán los mensajes
const messageDiv = document.getElementById('message');

// Esperar a que el contenido del DOM esté listo
document.addEventListener('DOMContentLoaded', function() {

  // Mostrar el formulario para seleccionar una cuenta
  messageDiv.innerHTML = `
    <label for="accountSelect">Seleccione una cuenta:</label>
    <select id="accountSelect">
      <option value="0">Mali</option>
      <option value="1">Gera</option>
      <option value="2">Maui</option>
    </select>
    <button id="selectAccount">Seleccionar</button>
  `;

  // Obtener referencias a elementos del DOM
  const accountSelect = document.getElementById('accountSelect');
  const selectAccountButton = document.getElementById('selectAccount');

  // Agregar evento al botón de selección de cuenta
  selectAccountButton.addEventListener('click', function() {
    // Obtener el ID de cuenta seleccionada
    const selectedAccountId = parseInt(accountSelect.value);
    // Obtener la cuenta seleccionada a partir del arreglo de cuentas
    const selectedAccount = cuentas[selectedAccountId];

    // Mostrar el formulario para ingresar el PIN
    messageDiv.innerHTML = `
      <label for="pin">Ingrese su PIN:</label>
      <input type="password" id="pin" maxlength="4" required>
      <button id="pinSubmit">Continuar</button>
      <div id="pinError" class="error-box"></div>
    `;

    // Obtener referencias a elementos del formulario de PIN
    const pinInput = document.getElementById('pin');
    const pinSubmitButton = document.getElementById('pinSubmit');
    const pinErrorDiv = document.getElementById('pinError');

    // Agregar evento al botón de envío del PIN
    pinSubmitButton.addEventListener('click', function() {
      // Ocultar el mensaje de error si se muestra
      pinErrorDiv.style.display = 'none';
      // Obtener el PIN ingresado y el PIN correcto de la cuenta seleccionada
      const enteredPin = pinInput.value;
      const correctPin = selectedAccount.password;

      // Verificar si el PIN ingresado es correcto
      if (enteredPin === correctPin) {
        // Mostrar el menú de opciones de cuenta
        messageDiv.innerHTML = `
          <p>Bienvenido/a, ${selectedAccount.nombre}.</p>
          <button id="checkBalance">Consultar Saldo</button>
          <button id="deposit">Ingresar Monto</button>
          <button id="withdraw">Retirar Monto</button>
          <div class="result-box hidden" id="result"></div>
        `;

        // ... (continuación de los comentarios en el mismo formato)
        // Aquí se describirían los comentarios para cada botón y su funcionalidad

      } else {
        // Mostrar mensaje de error si el PIN es incorrecto
        pinErrorDiv.textContent = 'PIN incorrecto. Por favor, inténtelo nuevamente.';
        // Limpiar el campo de PIN
        pinInput.value = '';
        // Mostrar el mensaje de error
        pinErrorDiv.style.display = 'block';
      }
    });
  });
});

  