import { setTimeout } from 'node:timers/promises';
import puppeteer from 'puppeteer';

/**
 * This function is used to send a WhatsApp message.
 * @param phone The phone number to send the message to.
 * @param message The message to send.
 */
export async function sendWhatsAppMessage(phone: string, message: string) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  const colombia = '57';

  // 1️⃣ Ir a WhatsApp Web
  await page.goto(`https://web.whatsapp.com/send?phone=${colombia + phone}&text=${encodeURIComponent(message)}`, {
    waitUntil: 'networkidle2'
  });

  // 2️⃣ Esperar a que cargue el campo de texto del chat
  await page.waitForSelector('div[contenteditable="true"]', { timeout: 10000 });

  // 3️⃣ Simular interacción humana (movimiento del mouse)
  await page.mouse.move(100, 100);
  await setTimeout(Math.random() * 3000 + 2000); // Espera entre 2 y 5 segundos

  // 4️⃣ Simular escritura del mensaje (con pausas)
  await page.keyboard.type(message, { delay: Math.random() * 100 + 50 });

  // 5️⃣ Espera un poco antes de enviar (simula dudas del usuario)
  await setTimeout(Math.random() * 2000 + 1000);

  // 6️⃣ Presionar "Enter" para enviar
  await page.keyboard.press('Enter');

  console.log(`Mensaje enviado a ${phone}: "${message}"`);

  // 7️⃣ Esperar antes de cerrar (simula comportamiento humano)
  await setTimeout(Math.random() * 5000 + 3000);

  // 8️⃣ Cerrar el navegador
  await browser.close();

  return { success: true, message: 'Mensaje enviado correctamente' };
}