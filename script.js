<video autoplay></video>
<canvas style="display:none;"></canvas>
<button id="prendrePhoto">📸 Prendre une photo</button>
<p id="message"></p>

<script>
const video = document.querySelector('video');
const canvas = document.querySelector('canvas');
const button = document.getElementById('prendrePhoto');
const message = document.getElementById('message');

// Accéder à la caméra
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
  })
  .catch(err => {
    message.textContent = "Erreur : impossible d'accéder à la caméra";
    console.error(err);
  });

// Prendre une photo avec retardateur
button.addEventListener('click', () => {
  let countdown = 10;
  message.textContent = `Photo dans ${countdown} secondes...`;

  const interval = setInterval(() => {
    countdown--;
    if (countdown > 0) {
      message.textContent = `Photo dans ${countdown} secondes...`;
    } else {
      clearInterval(interval);
      message.textContent = "📸 Photo prise !";

      // Capture de la photo
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0);
      const dataURL = canvas.toDataURL('image/png');

      // Créer une nouvelle page avec la photo
      const newWindow = window.open('');
      if (newWindow) {
        newWindow.document.write('<h1>Photo Capturée</h1>');
        newWindow.document.write(`<img src="${dataURL}" style="max-width:100%;">`);
      } else {
        message.textContent = "Impossible d'ouvrir un nouvel onglet (bloqué par le navigateur)";
      }
    }
  }, 1000);
});
</script>
