import CryptoJS from 'crypto-js';

export function generateSignature(
  method: string,
  endpoint: string,
  payload: any,
  secret: string,
): string {
  const requestString = method + endpoint + JSON.stringify(payload);
  const hash = CryptoJS.HmacSHA256(requestString, secret);
  return CryptoJS.enc.Base64.stringify(hash);
}
