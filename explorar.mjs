// Script temporário — digita o CPF, clica em Entrar e inspeciona a próxima tela.
import { chromium } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

const url = (process.env.BASE_URL ?? '') + (process.env.TOTEM_PATH ?? '/');
const cpf = (process.env.TOTEM_CPF ?? '').replace(/\D/g, '');

const browser = await chromium.launch();
const page = await browser.newPage({ ignoreHTTPSErrors: true });

try {
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
  await page.getByRole('button', { name: /cpf/i }).click();
  await page.waitForTimeout(800);

  // Digita o CPF clicando no teclado
  for (const d of cpf) {
    await page.getByRole('button', { name: `Tecla ${d}`, exact: true }).click();
    await page.waitForTimeout(100);
  }

  console.log('CPF NO CAMPO:', await page.locator('#totem-atendimento-input-carteira-cpf').inputValue());

  // Clica em Entrar
  await page.getByRole('button', { name: /entrar/i }).click();

  // Aguarda transição (rede + tempo)
  await page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {});
  await page.waitForTimeout(3000);

  console.log('URL APOS ENTRAR:', page.url());
  console.log('TITULO:', await page.title());

  const texto = (await page.locator('body').innerText().catch(() => '')).slice(0, 1000);
  console.log('--- TEXTO VISIVEL ---');
  console.log(texto);

  const botoes = await page.getByRole('button').allInnerTexts().catch(() => []);
  console.log('--- BOTOES ---', JSON.stringify(botoes));
  const headings = await page.getByRole('heading').allInnerTexts().catch(() => []);
  console.log('--- HEADINGS ---', JSON.stringify(headings));

  await page.screenshot({ path: 'explorar-pos-entrar.png', fullPage: true });
  console.log('SCREENSHOT salvo em explorar-pos-entrar.png');
} catch (e) {
  console.log('ERRO:', e.message);
} finally {
  await browser.close();
}
