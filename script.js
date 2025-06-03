// script.js
const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxYpzmxZJkTVRGF53K5WxNgMca0MwcPAONCGVz74uqYc1yLyyy2X8cd0yFU79roKbPH8g/exec';

const dataForm = document.getElementById('dataForm');
const submitButton = dataForm.querySelector('button[type="submit"]');

dataForm.addEventListener('submit', function(e) {
  e.preventDefault();

  submitButton.disabled = true;
  submitButton.textContent = 'Enviando...';

  const formData = new FormData(dataForm);

  fetch(WEB_APP_URL, {
    method: 'POST',
    body: formData,
  })
  .then(response => response.json())
  .then(data => {
    console.log('Respuesta del servidor:', data);
    showToast(data.message);
    if (data.status === 'success') dataForm.reset();
  })
  .catch(error => {
    console.error('Error al enviar el formulario:', error);
    showToast('Hubo un error al guardar los datos.');
  })
  .finally(() => {
    submitButton.disabled = false;
    submitButton.textContent = 'Guardar';
  });
});

function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}
