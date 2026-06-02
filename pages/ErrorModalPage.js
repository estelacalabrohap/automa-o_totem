// @ts-check
import { expect } from '@playwright/test';
import { BasePage } from './BasePage.js';

/**
 * ErrorModalPage — representa o modal que aparece quando a identificação falha.
 */
export class ErrorModalPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);

    // Locators baseados na imagem fornecida
    this.titulo = page.getByRole('heading', { name: /não foi possível identificar/i });
    // mensagem pode variar ligeiramente; buscamos a parte fixa "Beneficiário não encontrado"
    this.paragrafo1 = page.getByText(/beneficiário não encontrado/i);
    this.paragrafo2 = page.getByText(/se o problema continuar, procure um colaborador na recepção\./i);
    this.botaoTentar = page.getByRole('button', { name: /tentar novamente/i });
    this.contadorFechamento = page.getByText(/fechando automaticamente em \d+s/i);
    this.bloqueioMensagem = page.getByText(/inadimplente|bloqueio ativo|bloqueado/i);
  }

  async validarModalVisivel() {
    await expect(this.titulo).toBeVisible();
    await expect(this.paragrafo1).toBeVisible();
    await expect(this.botaoTentar).toBeVisible();
  }

  async validarMensagemExata() {
    await expect(this.paragrafo1).toBeVisible();
    await expect(this.paragrafo2).toBeVisible();
  }

  async validarBeneficiarioBloqueado() {
    await expect(this.bloqueioMensagem).toBeVisible();
  }

  async fecharTentandoNovamente() {
    await this.clicar(this.botaoTentar);
  }
}
