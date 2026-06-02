// @ts-check
import { test, expect } from '../fixtures/pages.fixture.js';

/**
 * Testes da tela de identificação do totem de auto-atendimento Hapvida.
 * URL: /totem/atendimento/identificar
 */
test.describe('Totem - Identificação', () => {
  test('deve abrir a tela de identificação e validar título, subtítulo e opções', async ({ identificacaoPage }) => {
    await identificacaoPage.abrir();

    await identificacaoPage.validarTelaCarregada();
    await expect(identificacaoPage.titulo).toHaveText(/como prefere se identificar/i);
    await expect(identificacaoPage.subtitulo).toBeVisible();
  });
});

