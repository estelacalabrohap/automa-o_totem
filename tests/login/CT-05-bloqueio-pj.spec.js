// @ts-check
import { test, expect } from '../../fixtures/pages.fixture.js';

const CARTEIRINHA_INADIMPLENTE = process.env.TOTEM_CARTEIRINHA_INADIMPLENTE ?? '00225022678000';
const NOME_BENEFICIARIO = 'MARIA DE FATIMA CARVALHO PONTES';

/**
 * Cenário negativo: beneficiário PJ inadimplente é bloqueado no login por carteirinha.
 *
 * Observação: este cenário está sendo mantido como teste falho para evidenciar
 * o comportamento incorreto atual do sistema no fluxo de beneficiário PJ inadimplente.
 */
test.describe('Totem - Carteirinha bloqueada PJ', () => {
  test('Carteirinha de beneficiário inadimplente exibe bloqueio no login', async ({ identificacaoPage, carteirinhaPage, errorModalPage }) => {
    await identificacaoPage.abrir();
    await identificacaoPage.selecionarCarteirinha();
    await carteirinhaPage.validarTelaCarregada();

    await carteirinhaPage.clicar(carteirinhaPage.campoCarteirinha);
    await carteirinhaPage.digitarCarteirinha(CARTEIRINHA_INADIMPLENTE);
    await carteirinhaPage.validarCarteirinhaPreenchida(CARTEIRINHA_INADIMPLENTE);

    await carteirinhaPage.confirmar();

    await errorModalPage.validarBeneficiarioBloqueado();
  });
});
