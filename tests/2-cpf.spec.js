// @ts-check
import { test, expect } from '../fixtures/pages.fixture.js';

// CPF de teste (vem do .env; troque por um CPF de teste real lá)
const CPF_TESTE = process.env.TOTEM_CPF ?? '44425481453';
const NOME_USUARIO_ESPERADO = 'ELIANE BATISTA CAMARA DE OLIVEIRA';

/**
 * Fluxo completo de identificação por CPF no totem.
 */
test.describe('Totem - CPF', () => {
  test('deve abrir a tela de CPF e digitar o CPF', async ({ identificacaoPage, cpfPage, atendimentoPage }) => {
    await identificacaoPage.abrir();
    await identificacaoPage.selecionarCpf();
    await cpfPage.validarTelaCarregada();
    await cpfPage.aguardar(1500);

    await cpfPage.clicar(cpfPage.campoCpf);
    await cpfPage.aguardar(1500);

    await cpfPage.digitarCpf(CPF_TESTE);
    await cpfPage.aguardar(1500);
    await cpfPage.validarCpfPreenchido(CPF_TESTE);
    await cpfPage.aguardar(1500);

    await cpfPage.confirmar();
    await atendimentoPage.validarNomeTitular(NOME_USUARIO_ESPERADO);
    await atendimentoPage.aguardar(1500);
  });
});
