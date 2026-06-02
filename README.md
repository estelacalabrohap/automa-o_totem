# Totem Automation 🤖

Automação de testes E2E do **Totem (validação web)** usando **Playwright + JavaScript**, estruturada com **Page Object Model (POM)** para facilitar manutenção e escalabilidade.

## 📁 Estrutura do projeto

```
totem-automation/
├── pages/                       # Page Objects (abstração das telas)
│   ├── BasePage.js              # Classe base com ações comuns
│   ├── IdentificacaoPage.js     # Tela "Como prefere se identificar?"
│   ├── CpfPage.js               # Tela de digitação do CPF (com teclado virtual)
│   └── AtendimentoPage.js       # Tela "Para quem é o atendimento?"
├── fixtures/
│   └── pages.fixture.js         # Injeção de dependência dos Page Objects
├── tests/                       # Casos de teste (.spec.js)
│   ├── identificacao.spec.js    # Testes da tela inicial
│   └── cpf.spec.js              # Testes do fluxo CPF
├── playwright.config.js         # Configuração do Playwright
├── .env.example                 # Modelo de variáveis de ambiente
├── .env                         # Variáveis reais (não commitar)
├── package.json
└── REVIEW.md                    # Análise de código e boas práticas
```

## 🚀 Setup

### Pré-requisitos
- [Node.js](https://nodejs.org/) 18+
- npm ou yarn

### Instalação

```bash
# Clonar repositório
git clone <repo>
cd totem-automation

# Instalar dependências
npm install

# Instalar navegadores do Playwright
npm run install:browsers

# Copiar e configurar variáveis de ambiente
cp .env.example .env
# Edite .env com:
#   BASE_URL=https://seu-totem.com.br
#   TOTEM_CPF=444.254.814-53 (seu CPF de teste)
```

## ▶️ Como rodar os testes

| Comando | Descrição |
|---------|-----------|
| `npm test` | Todos os testes (headless, rápido) |
| `npm run test:headed` | Com navegador **visível** (melhor para debug) |
| `npm run test:ui` | Interface visual interativa + relatório |
| `npm run test:debug` | Modo debug passo-a-passo com inspetor |
| `npm run test:chromium` | Apenas projeto Chromium |
| `npm run test:totem` | Apenas projeto Totem Kiosk (viewport vertical) |
| `npm run report` | Abre último relatório HTML |
| `npm run codegen` | Gera código a partir de ações gravadas |

### Exemplos com modificadores

```bash
# Com "câmera lenta" para acompanhar visualmente
$env:SLOWMO=2000
npm run test:headed

# Rodar um teste específico
npx playwright test tests/cpf.spec.js

# Em modo CI/CD (retries automáticos)
$env:CI=true
npm test
```

## 🧱 Padrões de Código

### Page Objects

**Regra de ouro**: Seletores e ações ficam nos Page Objects; testes só descrevem cenários.

```javascript
export class MinhaPage extends BasePage {
  constructor(page) {
    super(page);
    // Sempre usar getByRole, getByLabel, getByText (acessibilidade)
    this.titulo = page.getByRole('heading', { name: /titulo/i });
    this.botao = page.getByRole('button', { name: /ação/i });
  }

  async validarTelaCarregada() {
    await expect(this.titulo).toBeVisible();
  }

  async fazerAlgo() {
    await this.clicar(this.botao);
    // Validações implícitas (não precisa de aguardar manual)
  }
}
```

### Fixtures

Injeta Page Objects nos testes automaticamente:

```javascript
// test.js
test('exemplo', async ({ identificacaoPage, cpfPage }) => {
  await identificacaoPage.abrir();
  await identificacaoPage.selecionarCpf();
  // cpfPage já está pronto, não precisa instanciar
});
```

### Convenções

- ✅ Métodos: `validarX()`, `selecionarX()`, `preencherX()`
- ✅ Seletores: use `getByRole()` > `getByLabel()` > `getByText()` > `getByTestId()`
- ✅ Regex com `i` flag: `/texto/i` (case-insensitive)
- ✅ Comentários: expliquem **por quê**, não o quê
- ✅ Encapsule assertions em métodos da página
- ✅ Use `.first()` ao trabalhar com múltiplos elementos

## ⚙️ Configuração

### Playwright (`playwright.config.js`)

```javascript
timeout: 60 * 1000,                // 60s por teste
workers: 4,                        // 4 testes em paralelo (local)
retries: process.env.CI ? 2 : 0,  // Retry automático em CI
trace: 'on-first-retry',           // Grava trace na primeira tentativa após falha
screenshot: 'only-on-failure',     // Screenshot apenas em falhas
video: 'retain-on-failure',        // Vídeo retido após falha
locale: 'pt-BR',
timezoneId: 'America/Sao_Paulo',
```

### Variáveis de Ambiente (`.env`)

```env
# URL base da aplicação
BASE_URL=https://public-portals-mod-dev.hapvidalabs.net

# Caminho da tela inicial
TOTEM_PATH=/totem/atendimento/identificar

# CPF para testes (com ou sem máscara)
TOTEM_CPF=444.254.814-53

# Credenciais (se necessário)
TOTEM_USER=
TOTEM_PASSWORD=

# Debug (opcional)
SLOWMO=0          # "Câmera lenta" em ms (ex: 2000)
CI=false          # Modo CI/CD (retries automáticos)
```

## 📊 Relatórios & Artefatos

Todos salvos em `test-results/`:

- 📸 **Screenshots** — apenas de testes que falharam
- 🎬 **Vídeos** — gravação da execução (falhas apenas)
- 📡 **Traces** — dump completo do navegador (primeira tentativa pós-falha)
- 📋 **HTML Report** — relatório visual completo

Visualizar último relatório:
```bash
npm run report
```

## 🐛 Troubleshooting

| Problema | Solução |
|----------|---------|
| **"Elemento não encontrado"** | Executar `npm run test:headed` para ver visualmente |
| **"Timeout"** | Aumentar timeout em `playwright.config.js` ou usar `$env:SLOWMO=2000` |
| **"Strict mode violation"** | Múltiplos elementos encontrados, use `.first()` ou `.nth()` |
| **"Certificate error"** (rede corporativa) | `$env:NODE_OPTIONS="--use-system-ca"; npm install` |

## 🔍 Descobrindo Seletores

Use o code generator do Playwright:

```bash
npm run codegen https://seu-totem.com.br
```

Isso abre o navegador, grava suas ações e mostra o código + seletores. Copie para os Page Objects.

## 💡 Dicas para Totem

- Perfil **`totem-kiosk`** simula tela vertical (1080x1920). Ajuste para resolução real.
- Use `npm run test:totem` para testar com viewport do kiosk.
- Prefira seletores por **paper/texto** — mais resistentes a mudanças.
- Teclado virtual: use `digitarCpf()` que clica nos botões, não `fill()`.

## 📝 Boas Práticas

Veja [REVIEW.md](./REVIEW.md) para análise detalhada de código e sugestões de melhoria.

## 🏢 Rede Corporativa (Certificado SSL)

Se `npm install` falhar com erro de certificado:

```powershell
$env:NODE_OPTIONS="--use-system-ca"
npm install
npx playwright install chromium
```

Para persistir (recomendado):
```powershell
setx NODE_OPTIONS "--use-system-ca"
# Feche e reabra o terminal
```

## 📚 Recursos

- [Playwright Docs](https://playwright.dev)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Locators API](https://playwright.dev/docs/locators)
- [Assertions](https://playwright.dev/docs/test-assertions)

## 📄 Licença

MIT

