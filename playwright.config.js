// @ts-check
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

// Carrega variáveis de ambiente do arquivo .env
dotenv.config();

/**
 * Configuração do Playwright.
 * Docs: https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  // Diretório onde ficam os testes
  testDir: './tests',

  // Tempo máximo por teste (ms)
  timeout: 60 * 1000,

  // Tempo máximo de cada expect/assertion (ms)
  expect: {
    timeout: 10 * 1000,
  },

  // Roda os testes em paralelo dentro de cada arquivo
  fullyParallel: true,

  // Impede o uso acidental de test.only em CI
  forbidOnly: !!process.env.CI,

  // Número de tentativas em caso de falha (2 no CI, 0 local)
  retries: process.env.CI ? 2 : 0,

  // Número de workers paralelos
  workers: process.env.CI ? 1 : undefined,

  // Relatórios: HTML (visual) + lista no terminal
  reporter: [
    ['html', { open: 'never' }],
    ['list'],
  ],

  // Configurações compartilhadas por todos os projetos
  use: {
    // URL base — usada por page.goto('/')
    baseURL: process.env.BASE_URL || 'https://exemplo-totem.com.br',

    // Coleta trace na primeira tentativa após falha (ótimo para debug)
    trace: 'on-first-retry',

    // Screenshot apenas quando o teste falha
    screenshot: 'only-on-failure',

    // Vídeo apenas quando o teste falha
    video: 'retain-on-failure',

    // Tempo máximo para cada ação (click, fill, etc.)
    actionTimeout: 15 * 1000,

    // Tempo máximo de navegação (goto, reload)
    navigationTimeout: 30 * 1000,

    // Ignora erros de certificado HTTPS (útil em homologação)
    ignoreHTTPSErrors: true,

    // Localidade brasileira
    locale: 'pt-BR',
    timezoneId: 'America/Sao_Paulo',

    // "Câmera lenta" para acompanhar o navegador a olho nu.
    // Ative definindo SLOWMO (ms) no terminal. Ex.: $env:SLOWMO=800
    launchOptions: {
      slowMo: process.env.SLOWMO ? Number(process.env.SLOWMO) : 0,
    },
  },

  // Projetos = diferentes navegadores / viewports
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // Perfil que simula a tela de um TOTEM (resolução vertical típica)
    {
      name: 'totem-kiosk',
      use: {
        ...devices['Desktop Chrome'],
        // Viewport vertical típico de totem (touch screen 1080x1920)
        viewport: { width: 1080, height: 1920 },
        // Simula tela de toque
        hasTouch: true,
        isMobile: false,
      },
    },

    // Descomente para rodar em outros navegadores
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],

  // Pasta de saída para artefatos (screenshots, vídeos, traces)
  outputDir: 'test-results/',
});
