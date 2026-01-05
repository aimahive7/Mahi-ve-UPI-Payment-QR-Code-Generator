function generateUPI() {
  const pa = document.getElementById('pa').value.trim();
  const pn = document.getElementById('pn').value.trim();
  const am = document.getElementById('am').value.trim();
  const tn = document.getElementById('tn').value.trim();
  const cu = document.getElementById('cu').value.trim() || 'INR';

  if (!pa) {
    alert('Please enter Payee UPI ID (pa)');
    return;
  }

  const params = new URLSearchParams();

  // Mandatory / commonly used
  params.set('pa', pa);
  if (pn) params.set('pn', pn);
  if (am) params.set('am', am);
  if (tn) params.set('tn', tn);
  params.set('cu', cu); // currency

  // If you want to add more fields like tr, mc, url etc, do here:
  // params.set('tr', 'YOUR_TXN_ID');
  // params.set('mc', '1234');

  const upiLink = `upi://pay?${params.toString()}`;

  // Show link
  const linkBox = document.getElementById('upiLinkBox');
  linkBox.innerHTML = `
    <strong>UPI Link:</strong><br>
    <a href="${upiLink}">${upiLink}</a>
  `;

  // Generate QR
  const qrContainer = document.getElementById('qrcode');
  qrContainer.innerHTML = ''; // clear old QR
  new QRCode(qrContainer, {
    text: upiLink,
    width: 180,
    height: 180
  });
}
