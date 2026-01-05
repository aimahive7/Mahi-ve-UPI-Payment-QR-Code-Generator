function generateUPI() {
  let pa = document.getElementById('pa').value;
  if (pa === 'other') {
    pa = document.getElementById('pa_custom').value.trim();
  }

  let pn = document.getElementById('pn').value;
  if (pn === 'other') {
    pn = document.getElementById('pn_custom').value.trim();
  }
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

// Sync Payee Name with Payee UPI ID selection & Toggle Custom Inputs
document.addEventListener('DOMContentLoaded', () => {
  const paSelect = document.getElementById('pa');
  const pnSelect = document.getElementById('pn');
  const paCustom = document.getElementById('pa_custom');
  const pnCustom = document.getElementById('pn_custom');

  function toggleCustomInput(selectElem, customInput) {
    if (selectElem.value === 'other') {
      customInput.style.display = 'block';
    } else {
      customInput.style.display = 'none';
      customInput.value = ''; // clear when hidden
    }
  }

  // Mapping for Payee UPI ID -> Payee Name
  const upiToNameMap = {
    '9970670610@upi': 'MAHENDRA DIGAMBARRAO SHIRSE',
    'shobhamedicalstores.39262244@hdfcbank': 'SHOBHA MEDICAL STORES',
    'other': 'other'
  };

  if (paSelect && pnSelect) {
    paSelect.addEventListener('change', function () {
      // Sync logic using map
      const selectedValue = this.value;
      if (upiToNameMap[selectedValue]) {
        pnSelect.value = upiToNameMap[selectedValue];
      }

      // Toggle visibility for both
      toggleCustomInput(paSelect, paCustom);
      toggleCustomInput(pnSelect, pnCustom);
    });

    // Also listen on pnSelect change just in case user changes it manually (though usually synced)
    pnSelect.addEventListener('change', function () {
      toggleCustomInput(pnSelect, pnCustom);
    });
  }
});
