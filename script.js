  function generateQRCode() {
    const input = document.getElementById("qr-input").value.trim();

    if (!input) {
      alert("Please enter some text or URL to generate a QR code.");
      return;
    }

    const qrCodeContainer = document.getElementById("qrcode");
    qrCodeContainer.innerHTML = "";

    new QRCode(qrCodeContainer, {
      text: input,
      width: 180,
      height: 180,
      colorDark: "#00fff7",
      colorLight: "#001f20",
      correctLevel: QRCode.CorrectLevel.H,
    });
  }

  document.getElementById("generate-btn").addEventListener("click", generateQRCode);

  // Optional: allow Enter key to generate QR code
  document.getElementById("qr-input").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      generateQRCode();
    }
  });