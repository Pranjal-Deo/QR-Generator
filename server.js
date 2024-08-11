// server.js
const express = require('express');
const QRCode = require('qrcode');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Endpoint to generate QR code
app.post('/generate', async (req, res) => {
  const { text } = req.body;
  try {
    // Adjust the width to set the QR code size
    const qrCodeDataURL = await QRCode.toDataURL(text, {
      width: 500  // Increase this value to make the QR code larger
    });
    res.json({ qrCodeDataURL });
  } catch (err) {
    res.status(500).send('Error generating QR code');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
