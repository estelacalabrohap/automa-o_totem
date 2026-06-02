// @ts-check
import { test as base } from '@playwright/test';
import { IdentificacaoPage } from '../pages/IdentificacaoPage.js';
import { CpfPage } from '../pages/CpfPage.js';

/**
 * Fixtures customizadas — injetam os Page Objects já prontos nos testes.
 *
 * Em vez de instanciar `new IdentificacaoPage(page)` em cada teste, você recebe
 * `identificacaoPage` diretamente como parâmetro. Isso deixa os testes mais limpos.
 *
 * Uso no teste:
 *   test('exemplo', async ({ identificacaoPage }) => { ... });
 *
 * @typedef {Object} PageObjects
 * @property {IdentificacaoPage} identificacaoPage
 * @property {CpfPage} cpfPage
 */

/** @type {import('@playwright/test').TestType<import('@playwright/test').PlaywrightTestArgs & import('@playwright/test').PlaywrightTestOptions & PageObjects, import('@playwright/test').PlaywrightWorkerArgs & import('@playwright/test').PlaywrightWorkerOptions>} */
export const test = base.extend({
  identificacaoPage: async ({ page }, use) => {
    await use(new IdentificacaoPage(page));
  },

  cpfPage: async ({ page }, use) => {
    await use(new CpfPage(page));
  },
});

// Reexporta o expect para importar tudo de um só lugar
export { expect } from '@playwright/test';
