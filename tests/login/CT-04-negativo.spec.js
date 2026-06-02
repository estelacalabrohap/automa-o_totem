// @ts-check
import { test, expect } from '../../fixtures/pages.fixture.js';

const CPF_NEGATIVO = process.env.TOTEM_CPF_NEGATIVO ?? '39687034807';

/**
 * Cenário negativo: CPF ou carteirinha não cadastrado deve mostrar modal de erro
 */
test.describe('Totem - Identificação negativa', () => {
  test('CPF não cadastrado exibe mensagem de não identificado', async ({ identificacaoPage, cpfPage, errorModalPage }) => {
    await identificacaoPage.abrir();
    await identificacaoPage.selecionarCpf();
    await cpfPage.validarTelaCarregada();

    await cpfPage.digitarCpf(CPF_NEGATIVO);
    await cpfPage.validarCpfPreenchido(CPF_NEGATIVO);

    await cpfPage.confirmar();

    // valida o modal de erro conforme imagem fornecida
    await errorModalPage.validarModalVisivel();
    await errorModalPage.validarMensagemExata();

    // opcional: clicar em tentar novamente para voltar
    await errorModalPage.fecharTentandoNovamente();
  });
});
