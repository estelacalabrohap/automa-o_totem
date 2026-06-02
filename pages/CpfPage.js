// @ts-check
import { expect } from '@playwright/test';
import { BasePage } from './BasePage.js';

/**
 * CpfPage — tela de digitação do CPF no totem.
 *
 * Possui um teclado numérico NA TELA (botões 0-9, Limpar, Apagar, Entrar).
 * O campo tem inputmode="none", então a digitação é feita CLICANDO nos
 * botões, exatamente como o usuário faria no totem físico.
 */
export class CpfPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);

    // ----- LOCATORS -----
    this.titulo = page.getByRole('heading', { name: /^cpf$/i });
    this.campoCpf = page.locator('#totem-atendimento-input-carteira-cpf');
    this.botaoVoltar = page.getByRole('button', { name: /voltar/i });
    this.botaoLimpar = page.getByRole('button', { name: /limpar/i });
    this.botaoApagar = page.getByRole('button', { name: /apagar/i });
    this.botaoEntrar = page.getByRole('button', { name: /entrar/i });
  }

  /**
   * Retorna o botão do teclado numérico correspondente a um dígito.
   * O nome de acessibilidade dos botões é "Tecla 1", "Tecla 2", etc.
   * @param {string} digito - um caractere de '0' a '9'
   */
  teclaNumerica(digito) {
    return this.page.getByRole('button', { name: `Tecla ${digito}`, exact: true });
  }

  /**
   * Valida que a tela de CPF (com teclado numérico) carregou.
   */
  async validarTelaCarregada() {
    await expect(this.titulo).toBeVisible();
    await expect(this.campoCpf).toBeVisible();
    await expect(this.botaoEntrar).toBeVisible();
  }

  /**
   * Digita o CPF clicando nos botões do teclado da tela.
   * Aceita CPF com ou sem máscara (pontos/traço são ignorados).
   * @param {string} cpf
   */
  async digitarCpf(cpf) {
    const apenasNumeros = cpf.replace(/\D/g, '');
    for (const digito of apenasNumeros) {
      await this.clicar(this.teclaNumerica(digito));
    }
  }

  /**
   * Apaga o último dígito digitado.
   */
  async apagarUltimoDigito() {
    await this.clicar(this.botaoApagar);
  }

  /**
   * Limpa todo o campo de CPF.
   */
  async limparCampo() {
    await this.clicar(this.botaoLimpar);
  }

  /**
   * Confirma o CPF digitado (botão Entrar).
   */
  async confirmar() {
    await this.clicar(this.botaoEntrar);
  }

  /**
   * Volta para a tela de escolha de identificação.
   */
  async voltar() {
    await this.clicar(this.botaoVoltar);
  }

  /**
   * Retorna o valor atual exibido no campo de CPF.
   * @returns {Promise<string>}
   */
  async valorDoCampo() {
    return this.campoCpf.inputValue();
  }
}
