// Fast Modular Exponentiation
function fastModularExponentiation(base, exponent, modulus) {
    let result = 1;
    base = base % modulus;
    while (exponent > 0) {
        if (exponent % 2 === 1) {
            result = (result * base) % modulus;
        }
        exponent = Math.floor(exponent / 2);
        base = (base * base) % modulus;
    }
    return result;
}

// Encrypt the message
function encryptMessage() {
    const p = parseInt(document.getElementById('p').value);
    const q = parseInt(document.getElementById('q').value);
    const e = parseInt(document.getElementById('e').value);
    const message = document.getElementById('message').value;

    if (!p || !q || !e || !message) {
        alert('Please fill in all fields');
        return;
    }

    const n = p * q;
    const messageNumbers = message.split('').map(char => char.charCodeAt(0));

    const encryptedMessage = messageNumbers.map(m => fastModularExponentiation(m, e, n)).join(' ');

    document.getElementById('encryptedMessage').innerText = encryptedMessage;
}

// Decrypt the message
function decryptMessage() {
    const p = parseInt(document.getElementById('p').value);
    const q = parseInt(document.getElementById('q').value);
    const e = parseInt(document.getElementById('e').value);
    const encryptedMessage = document.getElementById('encryptedMessage').innerText;

    if (!p || !q || !e || !encryptedMessage) {
        alert('Please fill in all fields and encrypt a message first');
        return;
    }

    const n = p * q;
    const phi_n = (p - 1) * (q - 1);

    // Find the private key exponent d
    let d = 0;
    for (let i = 1; i < phi_n; i++) {
        if ((i * e) % phi_n === 1) {
            d = i;
            break;
        }
    }

    const encryptedNumbers = encryptedMessage.split(' ').map(Number);
    const decryptedMessage = encryptedNumbers.map(c => String.fromCharCode(fastModularExponentiation(c, d, n))).join('');

    document.getElementById('decryptedMessage').innerText = decryptedMessage;
}

// Reset all fields
function resetFields() {
    document.getElementById('p').value = '';
    document.getElementById('q').value = '';
    document.getElementById('e').value = '';
    document.getElementById('message').value = '';
    document.getElementById('encryptedMessage').innerText = '';
    document.getElementById('decryptedMessage').innerText = '';
}
