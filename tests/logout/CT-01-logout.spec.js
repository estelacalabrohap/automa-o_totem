// @ts-check
import { test, expect } from '../../fixtures/pages.fixture.js';

const CARTEIRINHA_TESTE = process.env.TOTEM_CARTEIRINHA ?? '00100018276003';
const NOME_USUARIO_ESPERADO = 'Maria';

/**
 * CT-01: Logout explícito pelo botão Sair encerra sessão com sucesso
 */
test.describe('Totem - CT-01: Login e Logout explícito', () => {
  test('deve fazer login por carteirinha e sair com sucesso', async ({ identificacaoPage, carteirinhaPage, servicoPage }) => {
    // Login
    await identificacaoPage.abrir();
    await identificacaoPage.selecionarCarteirinha();
    await carteirinhaPage.validarTelaCarregada();

    await carteirinhaPage.clicar(carteirinhaPage.campoCarteirinha);
    await carteirinhaPage.digitarCarteirinha(CARTEIRINHA_TESTE);
    await carteirinhaPage.validarCarteirinhaPreenchida(CARTEIRINHA_TESTE);

    await carteirinhaPage.confirmar();
    await servicoPage.validarTelaCarregada();
    await servicoPage.validarNomeUsuario(NOME_USUARIO_ESPERADO);

    // Logout
    await servicoPage.aguardar(1500);
    await servicoPage.clicarSair();

    // Valida volta à tela de identificação
    await identificacaoPage.validarTelaCarregada();
  });
});
