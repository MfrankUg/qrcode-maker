const qrCodeContainer = document.getElementById("qrcode");
const downloadBtn = document.getElementById("download-btn");
let qrCodeInstance = null;

function generateQRCode() {
  const input = document.getElementById("qr-input").value.trim();

  if (!input) {
    alert("Please enter some text or URL to generate a QR code.");
    return;
  }

  // Clear previous QR code and hide download button
  qrCodeContainer.innerHTML = "";
  downloadBtn.style.display = "none";

  // Create new QR code
  qrCodeInstance = new QRCode(qrCodeContainer, {
    text: input,
    width: 180,
    height: 180,
    colorDark: "#00fff7",
    colorLight: "#001f20",
    correctLevel: QRCode.CorrectLevel.H,
  });

  // Show download button after a short delay to ensure QR code is rendered
  setTimeout(() => {
    downloadBtn.style.display = "inline-block";
  }, 300);
}

function downloadQRCode() {
  if (!qrCodeContainer) return;

  // QRCode.js generates a <div> with a <canvas> or <img> inside
  // We need to get the canvas to export as PNG
  const img = qrCodeContainer.querySelector("img");
  const canvas = qrCodeContainer.querySelector("canvas");

  if (canvas) {
    // Canvas exists, convert to data URL and trigger download
    const dataUrl = canvas.toDataURL("image/png");
    triggerDownload(dataUrl);
  } else if (img) {
    // Fallback for img element (some browsers)
    // Create an offscreen canvas and draw the image, then export
    const image = new Image();
    image.src = img.src;
    image.onload = function () {
      const offCanvas = document.createElement("canvas");
      offCanvas.width = image.width;
      offCanvas.height = image.height;
      const ctx = offCanvas.getContext("2d");
      ctx.drawImage(image, 0, 0);
      const dataUrl = offCanvas.toDataURL("image/png");
      triggerDownload(dataUrl);
    };
  } else {
    alert("Sorry, unable to find QR code image to download.");
  }
}

function triggerDownload(dataUrl) {
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = "qr-code.png";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

document.getElementById("generate-btn").addEventListener("click", generateQRCode);
document.getElementById("qr-input").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    generateQRCode();
  }
});
downloadBtn.addEventListener("click", downloadQRCode);

// Add to JavaScript
let currentQRData = null;

// Modified generateQRCode function
function generateQRCode() {
  const input = document.getElementById("qr-input").value.trim();
  const fgColor = document.getElementById("foreground-color").value;
  const bgColor = document.getElementById("background-color").value;

  // ... existing generation code ...
  
  // Store current QR data
  currentQRData = {
    text: input,
    fgColor,
    bgColor
  };

  // Show download buttons
  document.getElementById('download-buttons').style.display = 'flex';
}

// Download handlers
document.getElementById('download-png').addEventListener('click', () => {
  const canvas = document.querySelector('#qrcode canvas');
  const link = document.createElement('a');
  link.download = 'qr-code.png';
  link.href = canvas.toDataURL();
  link.click();
});

document.getElementById('download-jpg').addEventListener('click', () => {
  const canvas = document.querySelector('#qrcode canvas');
  const link = document.createElement('a');
  link.download = 'qr-code.jpg';
  link.href = canvas.toDataURL('image/jpeg', 0.92);
  link.click();
});

document.getElementById('download-svg').addEventListener('click', () => {
  const svg = new QRCode({
    content: currentQRData.text,
    width: 256,
    height: 256,
    color: currentQRData.fgColor,
    background: currentQRData.bgColor,
    ecl: 'H',
    padding: 4
  }).svg();
  
  const blob = new Blob([svg], {type: 'image/svg+xml'});
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'qr-code.svg';
  link.click();
  URL.revokeObjectURL(url);
});
