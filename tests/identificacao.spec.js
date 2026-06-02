// @ts-check
import { test, expect } from '../fixtures/pages.fixture.js';

/**
 * Testes da tela de identificação do totem de auto-atendimento Hapvida.
 * URL: /totem/atendimento/identificar
 */
test.describe('Totem - Identificação', () => {
  test('deve abrir a tela de identificação com as opções de acesso', async ({ identificacaoPage }) => {
    // Abre a URL do totem
    await identificacaoPage.abrir();

    // Valida que a tela carregou com título e as duas opções
    await identificacaoPage.validarTelaCarregada();
  });

  test('deve exibir o título e o subtítulo corretos', async ({ identificacaoPage }) => {
    await identificacaoPage.abrir();

    await expect(identificacaoPage.titulo).toHaveText(/como prefere se identificar/i);
    await expect(identificacaoPage.subtitulo).toBeVisible();
  });
});
