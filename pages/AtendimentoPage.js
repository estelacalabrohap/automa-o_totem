// @ts-check
import { expect } from '@playwright/test';
import { BasePage } from './BasePage.js';

/**
 * AtendimentoPage — tela de seleção de titular/dependente.
 *
 * "Para quem é o atendimento?" — exibe lista de usuários e permite seleção.
 * URL: /totem/atendimento/selecionarTitular
 */
export class AtendimentoPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);

    // ----- LOCATORS -----
    this.titulo = page.getByRole('heading', { name: /para quem é o atendimento\?/i });
    this.subtitulo = page.getByText(/selecione o titular ou um dependente/i);
    this.botaoVoltar = page.getByRole('button', { name: /voltar/i });
    this.botaoContinuar = page.getByRole('button', { name: /continuar/i });
  }

  /**
   * Retorna o locator para o nome de um titular específico.
   * @param {string} nome - nome do titular (parcial ou completo)
   */
  nomeDoTitular(nome) {
    return this.page.getByText(new RegExp(nome, 'i'));
  }

  /**
   * Valida que a tela de atendimento carregou.
   */
  async validarTelaCarregada() {
    await expect(this.titulo).toBeVisible();
    await expect(this.subtitulo).toBeVisible();
  }

  /**
   * Valida que o nome do titular está visível na tela.
   * @param {string} nome - nome esperado do titular
   */
  async validarNomeTitular(nome) {
    const nomeElement = this.nomeDoTitular(nome).first();
    await expect(nomeElement).toBeVisible();
  }

  /**
   * Seleciona um titular pela primeira ocorrência do nome.
   * @param {string} nome - nome do titular a selecionar
   */
  async selecionarTitular(nome) {
    const nomeElement = this.nomeDoTitular(nome).first();
    await this.clicar(nomeElement);
  }

  /**
   * Clica no botão Continuar.
   */
  async continuar() {
    await this.clicar(this.botaoContinuar);
  }

  /**
   * Volta para a tela anterior.
   */
  async voltar() {
    await this.clicar(this.botaoVoltar);
  }
}
