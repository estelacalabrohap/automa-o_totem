// @ts-check
import { test, expect } from '../fixtures/pages.fixture.js';

// CPF de teste (vem do .env; troque por um CPF de teste real lá)
const CPF_TESTE = process.env.TOTEM_CPF ?? '61059918358';

/**
 * Fluxo de identificação por CPF no totem — executado de ponta a ponta, uma única vez.
 */
test('Totem - identificar por CPF', async ({ identificacaoPage, cpfPage }) => {
  // 1. Abre a tela inicial e escolhe a opção CPF
  await identificacaoPage.abrir();
  await identificacaoPage.selecionarCpf();
  await cpfPage.validarTelaCarregada();

  // 2. Digita o CPF clicando no teclado da tela
  await cpfPage.digitarCpf(CPF_TESTE);

  // 3. Valida que o campo recebeu o CPF completo (ignora máscara)
  const valor = (await cpfPage.valorDoCampo()).replace(/\D/g, '');
  expect(valor).toBe(CPF_TESTE.replace(/\D/g, ''));
});
