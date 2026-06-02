// @ts-check
import { expect } from '@playwright/test';
import { BasePage } from './BasePage.js';

/**
 * CarteirinhaPage — tela de digitação da carteirinha no totem.
 */
export class CarteirinhaPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);

    // ----- LOCATORS -----
    this.titulo = page.getByRole('heading', { name: /carteirinha/i });
    this.campoCarteirinha = page.locator('input[placeholder*="carteirinha" i], input[id*="carteirinha" i], input[name*="carteirinha" i]');
    this.botaoVoltar = page.getByRole('button', { name: /voltar/i });
    this.botaoLimpar = page.getByRole('button', { name: /limpar/i });
    this.botaoApagar = page.getByRole('button', { name: /apagar/i });
    this.botaoEntrar = page.getByRole('button', { name: /entrar/i });
  }

  /**
   * Retorna o botão do teclado numérico correspondente a um dígito.
   * @param {string} digito - um caractere de '0' a '9'
   */
  teclaNumerica(digito) {
    return this.page.getByRole('button', { name: `Tecla ${digito}`, exact: true });
  }

  /**
   * Valida que a tela de Carteirinha carregou.
   */
  async validarTelaCarregada() {
    await expect(this.titulo).toBeVisible();
    await expect(this.campoCarteirinha).toBeVisible();
    await expect(this.botaoEntrar).toBeVisible();
  }

  /**
   * Digita a carteirinha clicando nos botões do teclado da tela.
   * @param {string} carteirinha
   */
  async digitarCarteirinha(carteirinha) {
    const apenasNumeros = carteirinha.replace(/\D/g, '');
    for (const digito of apenasNumeros) {
      await this.clicar(this.teclaNumerica(digito));
    }
  }

  /**
   * Clica no botão Entrar.
   */
  async confirmar() {
    await this.clicar(this.botaoEntrar);
  }

  /**
   * Retorna o valor atual exibido no campo de carteirinha.
   * @returns {Promise<string>}
   */
  async valorDoCampo() {
    return this.campoCarteirinha.inputValue();
  }

  /**
   * Valida que a carteirinha foi digitada corretamente no campo.
   * @param {string} carteirinha - valor esperado (com ou sem máscara)
   */
  async validarCarteirinhaPreenchida(carteirinha) {
    const esperado = carteirinha.replace(/\D/g, '');
    await expect.poll(
      async () => (await this.valorDoCampo()).replace(/\D/g, ''),
      { timeout: 10000 }
    ).toBe(esperado);
  }
}
