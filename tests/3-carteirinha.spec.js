// @ts-check
import { test, expect } from '../fixtures/pages.fixture.js';

const CARTEIRINHA_TESTE = process.env.TOTEM_CARTEIRINHA ?? '00100018276003';
const NOME_USUARIO_ESPERADO = 'Maria';

/**
 * Fluxo completo de Carteirinha no totem.
 */
test.describe('Totem - Carteirinha', () => {
  test('deve abrir a tela de carteirinha, digitar a carteirinha e validar o nome', async ({ identificacaoPage, carteirinhaPage, atendimentoPage }) => {
    await identificacaoPage.abrir();
    await identificacaoPage.selecionarCarteirinha();
    await carteirinhaPage.validarTelaCarregada();
    await carteirinhaPage.aguardar(1500);

    await carteirinhaPage.clicar(carteirinhaPage.campoCarteirinha);
    await carteirinhaPage.aguardar(1500);

    await carteirinhaPage.digitarCarteirinha(CARTEIRINHA_TESTE);
    await carteirinhaPage.aguardar(1500);

    const valor = (await carteirinhaPage.valorDoCampo()).replace(/\D/g, '');
    expect(valor).toBe(CARTEIRINHA_TESTE.replace(/\D/g, ''));
    await carteirinhaPage.aguardar(1500);

    await carteirinhaPage.confirmar();
    await atendimentoPage.validarNomeTitular(NOME_USUARIO_ESPERADO);
    await atendimentoPage.aguardar(1500);
  });
});
