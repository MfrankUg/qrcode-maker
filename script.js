const qrCodeContainer = document.getElementById("qrcode");
const downloadOptions = document.getElementById("download-options");
const colorPickerContainer = document.getElementById("color-picker-container");
const fgColorInput = document.getElementById("foreground-color");
const bgColorInput = document.getElementById("background-color");
const generateBtn = document.getElementById("generate-btn");
const inputField = document.getElementById("qr-input");
const downloadPngBtn = document.getElementById("download-png-btn");
const downloadJpgBtn = document.getElementById("download-jpg-btn");

let qrCodeInstance = null;
let currentText = "";
let currentFgColor = fgColorInput.value;
let currentBgColor = bgColorInput.value;

function generateQRCode() {
  const input = inputField.value.trim();

  if (!input) {
    alert("Please enter some text or URL to generate a QR code.");
    return;
  }

  currentText = input;
  currentFgColor = fgColorInput.value;
  currentBgColor = bgColorInput.value;

 
  qrCodeContainer.innerHTML = "";

  // Create new QR code
  qrCodeInstance = new QRCode(qrCodeContainer, {
    text: currentText,
    width: 180,
    height: 180,
    colorDark: currentFgColor,
    colorLight: currentBgColor,
    correctLevel: QRCode.CorrectLevel.H,
  });

  // Show color pickers and download options immediately
  colorPickerContainer.style.display = "flex";
  downloadOptions.style.display = "flex";
}

function updateQRCodeColors() {
  if (!currentText) return;

  currentFgColor = fgColorInput.value;
  currentBgColor = bgColorInput.value;

  // Regenerate QR code with new colors
  qrCodeContainer.innerHTML = "";
  qrCodeInstance = new QRCode(qrCodeContainer, {
    text: currentText,
    width: 180,
    height: 180,
    colorDark: currentFgColor,
    colorLight: currentBgColor,
    correctLevel: QRCode.CorrectLevel.H,
  });

  // Keep download options visible
  downloadOptions.style.display = "flex";
}

function downloadQRCode(format) {
  if (!qrCodeContainer) return;

  const img = qrCodeContainer.querySelector("img");
  const canvas = qrCodeContainer.querySelector("canvas");

  if (canvas) {
    if (format === "png") {
      const dataUrl = canvas.toDataURL("image/png");
      triggerDownload(dataUrl, "qr-code.png");
    } else if (format === "jpg") {
      const dataUrl = canvas.toDataURL("image/jpeg", 1.0);
      triggerDownload(dataUrl, "qr-code.jpg");
    }
  } else if (img) {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = img.src;
    image.onload = function () {
      const offCanvas = document.createElement("canvas");
      offCanvas.width = image.width;
      offCanvas.height = image.height;
      const ctx = offCanvas.getContext("2d");
      ctx.drawImage(image, 0, 0);
      let dataUrl;
      if (format === "png") {
        dataUrl = offCanvas.toDataURL("image/png");
        triggerDownload(dataUrl, "qr-code.png");
      } else if (format === "jpg") {
        dataUrl = offCanvas.toDataURL("image/jpeg", 1.0);
        triggerDownload(dataUrl, "qr-code.jpg");
      }
    };
  } else {
    alert("Sorry, unable to find QR code image to download.");
  }
}

function triggerDownload(dataUrl, filename) {
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// Event listeners
generateBtn.addEventListener("click", () => {
  generateQRCode();
});

inputField.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    generateQRCode();
  }
});

fgColorInput.addEventListener("input", updateQRCodeColors);
bgColorInput.addEventListener("input", updateQRCodeColors);

downloadPngBtn.addEventListener("click", () => {
  downloadQRCode("png");
});

downloadJpgBtn.addEventListener("click", () => {
  downloadQRCode("jpg");
});
