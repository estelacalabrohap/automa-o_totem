// @ts-check
import { test, expect } from '../fixtures/pages.fixture.js';

const CARTEIRINHA_TESTE = process.env.TOTEM_CARTEIRINHA ?? '00100018276003';
const NOME_USUARIO_ESPERADO = 'Maria';

/**
 * Fluxo completo de Carteirinha no totem.
 */
test.describe('Totem - Carteirinha', () => {
  test('deve abrir a tela de carteirinha, digitar a carteirinha, validar o nome e iniciar novo atendimento', async ({ identificacaoPage, carteirinhaPage, servicoPage }) => {
    await identificacaoPage.abrir();
    await identificacaoPage.selecionarCarteirinha();
    await carteirinhaPage.validarTelaCarregada();

    await carteirinhaPage.clicar(carteirinhaPage.campoCarteirinha);
    await carteirinhaPage.digitarCarteirinha(CARTEIRINHA_TESTE);
    await carteirinhaPage.validarCarteirinhaPreenchida(CARTEIRINHA_TESTE);

    await carteirinhaPage.confirmar();
    await servicoPage.validarTelaCarregada();
    await servicoPage.validarNomeUsuario(NOME_USUARIO_ESPERADO);

    await servicoPage.aguardar(2000);
    await servicoPage.clicarNovoAtendimento();
    await identificacaoPage.validarTelaCarregada();
  });
});
