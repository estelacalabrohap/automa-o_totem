# Totem Automation 🤖

Automação de testes E2E do **Totem (validação web)** usando **Playwright + JavaScript**, estruturada com **Page Object Model (POM)** para facilitar a manutenção.

## 📁 Estrutura do projeto

```
totem-automation/
├── pages/                  # Page Objects (um arquivo por tela)
│   ├── BasePage.js         # Ações comuns (clique, preenchimento, esperas)
│   ├── HomePage.js         # Tela inicial do totem
│   └── LoginPage.js        # Tela de login (opcional)
├── fixtures/
│   └── pages.fixture.js    # Injeta os Page Objects nos testes
├── tests/                  # Casos de teste (.spec.js)
│   ├── home.spec.js
│   └── login.spec.js
├── test-data/              # Massa de dados de teste
│   └── usuarios.js
├── playwright.config.js    # Configuração do Playwright
├── .env.example            # Modelo de variáveis de ambiente
└── package.json
```

## 🚀 Primeiros passos

### 1. Pré-requisitos
- [Node.js](https://nodejs.org/) 18 ou superior

### 2. Instalar dependências
```bash
npm install
```

### 3. Instalar os navegadores do Playwright
```bash
npm run install:browsers
```

### 4. Configurar variáveis de ambiente
Copie o arquivo de exemplo e preencha com os valores reais:
```bash
copy .env.example .env      # Windows
# cp .env.example .env      # Linux/Mac
```
Edite o `.env` com a `BASE_URL` do seu totem e as credenciais de teste.

## ▶️ Como rodar os testes

| Comando | O que faz |
|---|---|
| `npm test` | Roda todos os testes (headless) |
| `npm run test:headed` | Roda com o navegador visível |
| `npm run test:ui` | Abre o modo interativo (UI Mode) — ótimo para desenvolver |
| `npm run test:debug` | Roda em modo debug, passo a passo |
| `npm run test:totem` | Roda no perfil que simula a tela vertical do totem |
| `npm run report` | Abre o último relatório HTML |
| `npm run codegen` | Grava ações no navegador e gera código automaticamente |

## 🧱 Padrão Page Object (como dar manutenção)

A regra de ouro: **os seletores e as ações ficam nos Page Objects; os testes só descrevem o cenário.**

- **Mudou um botão na tela?** Ajuste só o seletor no Page Object correspondente. Os testes continuam iguais.
- **Nova tela?** Crie `pages/NomeDaTela.js` estendendo `BasePage`, e registre na fixture.
- **Novo cenário?** Crie/edite um `.spec.js` em `tests/` usando os Page Objects.

### Exemplo de teste
```js
import { test } from '../fixtures/pages.fixture.js';

test('iniciar atendimento', async ({ homePage }) => {
  await homePage.abrir();
  await homePage.iniciarAtendimento();
});
```

## 💡 Dicas para o totem

- O perfil **`totem-kiosk`** no `playwright.config.js` simula uma tela vertical de toque (1080x1920). Ajuste a resolução para a do seu totem real.
- Prefira seletores por **papel/texto** (`getByRole`, `getByText`) ou `data-testid` — são mais resistentes a mudanças de layout.
- Use `npm run codegen` apontando para a URL do totem para descobrir os seletores rapidamente.

## 🏢 Rede corporativa (certificado SSL)

Se o `npm install` falhar com `UNABLE_TO_VERIFY_LEAF_SIGNATURE`, é o proxy/firewall
da empresa interceptando o HTTPS. Solução **segura** (usa os certificados do Windows):

```powershell
$env:NODE_OPTIONS="--use-system-ca"
npm install
npx playwright install chromium
```

> Dica: para não repetir o comando toda vez, defina a variável de ambiente do usuário:
> `setx NODE_OPTIONS "--use-system-ca"` (feche e reabra o terminal depois).

## 🔍 Descobrindo os seletores reais

```bash
npx playwright codegen https://url-do-seu-totem.com.br
```
Isso abre o navegador, grava suas ações e mostra o código + os seletores. Copie os seletores para os Page Objects.
