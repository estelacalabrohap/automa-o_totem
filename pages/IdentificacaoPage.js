// @ts-check
import { expect } from '@playwright/test';
import { BasePage } from './BasePage.js';

/**
 * IdentificacaoPage — tela inicial do totem de auto-atendimento Hapvida.
 *
 * "Como prefere se identificar?" — oferece as opções Carteirinha e CPF.
 * URL: /totem/atendimento/identificar
 */
export class IdentificacaoPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);

    // ----- LOCATORS -----
    this.titulo = page.getByRole('heading', { name: /como prefere se identificar/i });
    this.subtitulo = page.getByText(/escolha uma das opções abaixo/i);
    this.opcaoCarteirinha = page.getByRole('button', { name: /carteirinha/i });
    this.opcaoCpf = page.getByRole('button', { name: /cpf/i });
  }

  /**
   * Abre a tela de identificação do totem.
   */
  async abrir() {
    const caminho = process.env.TOTEM_PATH ?? '/totem/atendimento/identificar';
    await this.navegarPara(caminho);
    await this.aguardarCarregamento();
  }

  /**
   * Valida que a tela de identificação carregou com as duas opções.
   */
  async validarTelaCarregada() {
    await expect(this.titulo).toBeVisible();
    await expect(this.opcaoCarteirinha).toBeVisible();
    await expect(this.opcaoCpf).toBeVisible();
  }

  /**
   * Seleciona a opção de identificação por Carteirinha.
   */
  async selecionarCarteirinha() {
    await this.clicar(this.opcaoCarteirinha);
  }

  /**
   * Seleciona a opção de identificação por CPF.
   */
  async selecionarCpf() {
    await this.clicar(this.opcaoCpf);
  }
}
