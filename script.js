// Function to generate the QR code
function generateQRCode() {
    const input = document.getElementById("qr-input").value;
    
    if (!input) {
      alert("Please enter some text or URL to generate a QR code.");
      return;
    }
  
    // Clear any existing QR code
    const qrCodeContainer = document.getElementById("qrcode");
    qrCodeContainer.innerHTML = "";
  
    // Create a new QR code
    new QRCode(qrCodeContainer, {
      text: input,
      width: 128,
      height: 128,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H,
    });
  }
  
  // Add event listener to the button
  document.getElementById("generate-btn").addEventListener("click", generateQRCode);
  