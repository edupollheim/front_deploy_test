import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

interface PixQRCodeProps {
  pixKey: string;
  destinatario: string;
  cidade: string;
  valor: number;
}

export default function PixQRCode({ pixKey, destinatario, cidade, valor }: PixQRCodeProps) {
  const qrcodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!qrcodeRef.current) return;
    const payload = buildPixPayload(pixKey, destinatario, cidade, valor);
    const crc = getCRC16(payload + '6304');
    const finalPayload = payload + '6304' + crc.toString(16).toUpperCase();

    // Limpa o container antes de criar um novo QRCode
    qrcodeRef.current.innerHTML = '';

    // Cria o QRCode usando a biblioteca qrcode
    QRCode.toCanvas(qrcodeRef.current, finalPayload, { width: 228, height: 228 }, (error) => {
      if (error) console.error(error);
    });
  }, [pixKey, destinatario, cidade, valor]);

  // Função para montagem do payload (similar ao qrcode.js)
  function buildPixPayload(key: string, name: string, city: string, amount: number) {
    const formattedValue = Number(amount).toFixed(2);
    const valueLen = formattedValue.length.toString().padStart(2, '0');
    const cityLen = city.length.toString().padStart(2, '0');
    return (
      // ID do Payload Format
      '000201' +
      // Merchant Account Info
      '26360014BR.GOV.BCB.PIX01' +
      key.length +
      key +
      // Merchant Category Code, Transaction Currency, etc.
      '52040000530398654' +
      valueLen +
      formattedValue +
      '5802BR59' +
      name.length +
      name +
      '60' +
      cityLen +
      city +
      '62130509pixcartao'
    );
  }

  // Função CRC16 (similar ao qrcode.js)
  function getCRC16(str: string) {
    let remainder = 0xffff;
    const polynom = 0x1021;
    for (let i = 0; i < str.length; i++) {
      remainder ^= str.charCodeAt(i) << 8;
      for (let j = 0; j < 8; j++) {
        if ((remainder <<= 1) & 0x10000) remainder ^= polynom;
        remainder &= 0xffff;
      }
    }
    return remainder;
  }

  return <div ref={qrcodeRef} className="flex justify-center mt-4" />;
}