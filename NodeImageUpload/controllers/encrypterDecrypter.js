import { config } from 'dotenv'
config()
import crypto from 'node:crypto'

const getEncryptedText = (imageObj) => {
    const objStr = JSON.stringify(imageObj);

    let encrypted = '';
    const algorithm = 'aes-256-cbc';
    const key = Buffer.from(process.env.KEY, 'hex');
    const iv = Buffer.from(process.env.IV, 'hex');
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    encrypted += cipher.update(objStr, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    console.log('encrypted', encrypted);

    return encrypted;
}

const getDecryptedText = (encrypted) => {
    let decrypted = '';
    const algorithm = 'aes-256-cbc';
    const key = Buffer.from(process.env.KEY, 'hex');
    const iv = Buffer.from(process.env.IV, 'hex');
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    decrypted += decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    console.log('decrypted', decrypted);

    return decrypted;
}


export { getEncryptedText, getDecryptedText }
