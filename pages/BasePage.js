// @ts-check

/**
 * BasePage — classe base para todos os Page Objects.
 *
 * Concentra ações comuns (navegação, clique, preenchimento, esperas)
 * para evitar repetição de código e padronizar o comportamento.
 * Toda página específica deve estender esta classe.
 */
export class BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * Navega para um caminho relativo à baseURL.
   * @param {string} path
   */
  async navegarPara(path = '/') {
    await this.page.goto(path, { waitUntil: 'domcontentloaded' });
  }

  /**
   * Clica em um elemento aguardando que esteja visível e habilitado.
   * @param {import('@playwright/test').Locator} locator
   */
  async clicar(locator) {
    await locator.waitFor({ state: 'visible' });
    await locator.click();
  }

  /**
   * Preenche um campo de texto, limpando antes.
   * @param {import('@playwright/test').Locator} locator
   * @param {string} texto
   */
  async preencher(locator, texto) {
    await locator.waitFor({ state: 'visible' });
    await locator.fill(texto);
  }

  /**
   * Retorna o texto visível de um elemento.
   * @param {import('@playwright/test').Locator} locator
   * @returns {Promise<string>}
   */
  async obterTexto(locator) {
    await locator.waitFor({ state: 'visible' });
    return (await locator.textContent())?.trim() ?? '';
  }

  /**
   * Verifica se um elemento está visível na tela.
   * @param {import('@playwright/test').Locator} locator
   * @returns {Promise<boolean>}
   */
  async estaVisivel(locator) {
    return locator.isVisible();
  }

  /**
   * Aguarda a página terminar de carregar (rede ociosa).
   */
  async aguardarCarregamento() {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Captura um screenshot nomeado (anexado ao relatório).
   * @param {string} nome
   */
  async capturarTela(nome) {
    await this.page.screenshot({
      path: `test-results/screenshots/${nome}.png`,
      fullPage: true,
    });
  }
}
