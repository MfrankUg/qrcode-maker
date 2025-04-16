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
