// Base64エンコード
export function encodeBase64(value: string): string {
  return Buffer.from(value, 'utf-8').toString('base64');
}

// Base64デコード
export function decodeBase64(value: string): string {
  return Buffer.from(value, 'base64').toString('utf-8');
}