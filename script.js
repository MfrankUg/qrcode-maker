const qrCodeContainer = document.getElementById("qrcode");
let currentQRData = null;

function generateQRCode() {
  const input = document.getElementById("qr-input").value.trim();
  const fgColor = document.getElementById("foreground-color").value;
  const bgColor = document.getElementById("background-color").value;

  if (!input) {
    alert("Please enter some text or URL to generate a QR code.");
    return;
  }

  // Clear previous QR code
  qrCodeContainer.innerHTML = "";
  document.getElementById('download-buttons').style.display = 'none';

  // Generate new QR code
  new QRCode(qrCodeContainer, {
    text: input,
    width: 180,
    height: 180,
    colorDark: fgColor,
    colorLight: bgColor,
    correctLevel: QRCode.CorrectLevel.H,
  });

  // Store current QR data for SVG
  currentQRData = {
    text: input,
    fgColor,
    bgColor
  };

  // Show download buttons
  document.getElementById('download-buttons').style.display = 'flex';
}

document.getElementById("generate-btn").addEventListener("click", generateQRCode);
document.getElementById("qr-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") generateQRCode();
});

document.getElementById('download-png').addEventListener('click', () => {
  const canvas = qrCodeContainer.querySelector('canvas');
  if (!canvas) return;
  const link = document.createElement('a');
  link.download = 'qr-code.png';
  link.href = canvas.toDataURL();
  link.click();
});

document.getElementById('download-jpg').addEventListener('click', () => {
  const canvas = qrCodeContainer.querySelector('canvas');
  if (!canvas) return;
  const link = document.createElement('a');
  link.download = 'qr-code.jpg';
  link.href = canvas.toDataURL('image/jpeg', 0.92);
  link.click();
});

document.getElementById('download-svg').addEventListener('click', () => {
  if (!currentQRData) return;
  const qr = new window.QRCodeSVG({
    content: currentQRData.text,
    width: 256,
    height: 256,
    color: currentQRData.fgColor,
    background: currentQRData.bgColor,
    ecl: 'H',
    padding: 4
  });
  const svg = qr.svg();
  const blob = new Blob([svg], {type: 'image/svg+xml'});
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'qr-code.svg';
  link.click();
  URL.revokeObjectURL(url);
});
