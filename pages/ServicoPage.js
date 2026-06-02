// @ts-check
import { expect } from '@playwright/test';
import { BasePage } from './BasePage.js';

/**
 * ServicoPage — tela de seleção de serviço após identificação por carteirinha.
 */
export class ServicoPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);

    // ----- LOCATORS -----
    this.titulo = page.getByRole('heading', { name: /selecione o serviço/i });
    this.botaoNovoAtendimento = page.getByRole('button', { name: /novo atendimento/i });
  }

  /**
   * Valida que a tela de seleção de serviço foi carregada.
   */
  async validarTelaCarregada() {
    await expect(this.titulo).toBeVisible();
  }

  /**
   * Valida que o nome do usuário está visível na página.
   * @param {string} nome
   */
  async validarNomeUsuario(nome) {
    await expect(this.page.getByText(new RegExp(nome, 'i')).first()).toBeVisible();
  }

  /**
   * Clica em Novo Atendimento.
   */
  async clicarNovoAtendimento() {
    await this.clicar(this.botaoNovoAtendimento);
  }
}
