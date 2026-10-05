# ONG Patas do Bem 🐾

> Toda pata merece um lar.

Site da ONG fictícia de proteção animal **Patas do Bem**, desenvolvido como projeto acadêmico de Front-end. O projeto começou com páginas em HTML, CSS e JavaScript puro e foi migrado para uma **Single Page Application (SPA)** com React e Vite.

🔗 **Site no ar:** https://projeto-react-delta-ten.vercel.app

---

## Funcionalidades

- **Navegação SPA:** troca de páginas sem recarregar, com React Router e suporte aos botões voltar e avançar.
- **Páginas:** Início, Projetos (com rolagem até as seções), Cadastro de voluntários, Lista de voluntários e página 404.
- **Formulário com validação em tempo real:** campos obrigatórios, nome e sobrenome, CPF com dígitos verificadores, idade mínima de 18 anos, e-mail, telefone e CEP.
- **Máscaras automáticas** para CPF, telefone e CEP.
- **Bloqueio de CPF duplicado.**
- **Persistência com localStorage:** os cadastros continuam salvos após recarregar ou fechar o navegador.
- **Lista de voluntários** com data de cadastro e remoção com confirmação.
- **Feedback visual:** bordas e mensagens de erro nos campos, toasts de sucesso e erro e modal de confirmação.
- **Menu responsivo:** hambúrguer no celular e menu horizontal com submenu a partir de 768px.

## Tecnologias

| Tecnologia | Uso |
|---|---|
| React | Componentes e atualização da interface |
| React Router | Rotas da SPA |
| Vite | Servidor de desenvolvimento e build de produção |
| CSS3 | Design System com variáveis, Grid, Flexbox e 5 breakpoints |
| localStorage | Armazenamento dos cadastros no navegador |
| Git e GitHub | Versionamento com GitFlow e Pull Requests |
| Vercel | Hospedagem com deploy contínuo |

## Estrutura de pastas

```
projeto-react/
├── public/
│   ├── imagens/              # Imagens estáticas
│   └── robots.txt            # Regras para buscadores
├── src/
│   ├── components/
│   │   └── Layout.jsx        # Cabeçalho, menu, rodapé e área principal
│   ├── context/
│   │   └── FeedbackContext.jsx  # Toasts e modal de confirmação
│   ├── data/
│   │   └── opcoes.js         # Estados, áreas e disponibilidades
│   ├── pages/                # Uma página por rota
│   ├── services/
│   │   └── storage.js        # Único acesso ao localStorage
│   ├── utils/
│   │   └── validation.js     # Máscaras e regras de validação
│   ├── App.jsx               # Definição das rotas
│   ├── main.jsx              # Ponto de entrada da aplicação
│   └── index.css             # Estilos globais e Design System
├── index.html
├── vercel.json               # Redirecionamento das rotas da SPA
└── package.json
```

O código segue a **separação de responsabilidades**: as páginas cuidam da interface, `utils` concentra as validações, `services` concentra o armazenamento e `data` guarda os dados fixos. As dependências seguem uma única direção, sem importações circulares.

## Como rodar o projeto

Pré-requisitos: [Node.js](https://nodejs.org) instalado.

```bash
# 1. Clonar o repositório
git clone https://github.com/emilycsilva/projeto-react.git
cd projeto-react

# 2. Instalar as dependências
npm install

# 3. Rodar em modo de desenvolvimento
npm run dev
```

Depois, abra http://localhost:5173 no navegador.

| Comando | O que faz |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera a versão de produção na pasta `dist` |
| `npm run preview` | Testa a versão de produção localmente |

## Acessibilidade (WCAG 2.1 AA)

- HTML semântico, idioma `pt-br` e texto alternativo na imagem.
- Todos os campos com `label`; erros indicados com `aria-invalid` e ligados ao campo por `aria-describedby`.
- Link **"Pular para o conteúdo"** como primeiro elemento da página.
- Foco movido para o conteúdo principal a cada troca de rota.
- Contorno de foco visível, com contraste mínimo de 3:1.
- Navegação completa pelo teclado, incluindo menu, submenu e menu hambúrguer.
- Toasts anunciados por leitores de tela (`aria-live`) e modal com a tag `<dialog>`, que fecha com a tecla Esc.
- Respeito à preferência de redução de movimento (`prefers-reduced-motion`).

## Qualidade e performance

Notas do Lighthouse (modo mobile, versão de produção):

| Página | Performance | Acessibilidade | Boas práticas | SEO |
|---|---|---|---|---|
| Início | 99 | 100 | 100 | 100 |
| Projetos | 100 | 100 | 100 | 100 |
| Cadastro | 100 | 100 | 100 | 100 |
| Voluntários | 100 | 100 | 100 | 100 |

Otimizações aplicadas: build minificado do Vite com nomes de arquivo com hash (cache seguro), imagem em WebP com largura e altura definidas, meta description e `robots.txt`.

## Fluxo de trabalho com Git (GitFlow)

| Branch | Função |
|---|---|
| `main` | Versões de lançamento, marcadas com tags (`v1.0.0`). Cada merge publica o site em produção na Vercel. |
| `develop` | Integração do desenvolvimento contínuo. Recebe as features prontas. |
| `feature/...` | Uma funcionalidade nova. Nasce da `develop` e volta para ela por Pull Request. |
| `release/...` | Preparação de uma versão (número da versão e documentação). Vai para a `main` e volta para a `develop`. |
| `hotfix/...` | Correção urgente em produção. Nasce da `main` e volta para a `main` e para a `develop`. |

As mensagens de commit seguem o padrão **Conventional Commits** (`feat`, `fix`, `docs`, `chore`). Antes da adoção do GitFlow, as primeiras melhorias (acessibilidade, preparação para deploy e documentação) foram feitas em branches curtas integradas direto à `main`.

## Limitações conhecidas

Este é um projeto acadêmico. Os dados da ONG são fictícios, e os cadastros, incluindo CPFs, ficam salvos apenas no navegador de quem acessa. Em um ambiente real, seria necessário um back-end com banco de dados e proteção de dados pessoais, de acordo com a LGPD.

## Autoria

Desenvolvido por **Emily Silva** ([@emilycsilva](https://github.com/emilycsilva)) como projeto acadêmico.