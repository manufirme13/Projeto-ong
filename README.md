# Instituto Esperança

Site de uma ONG fictícia, desenvolvido como Experiência Prática de Desenvolvimento Front-end. A aplicação apresenta os projetos sociais da organização, permite o cadastro de voluntários e reúne informações para doações.

**Site publicado:** https://manufirme13.github.io/Projeto-ong/
**Repositório:** https://manufirme13.github.io/Projeto-ong/

## Funcionalidades

- Navegação sem recarregar a página (Single Page Application)
- Menu responsivo com submenu (dropdown) no desktop e hambúrguer no mobile
- Cards de projetos gerados a partir de dados em JavaScript
- Formulário de cadastro de voluntários com máscaras e validação em tempo real
- Lista de voluntários salva no navegador (`localStorage`) e gráfico por estado
- Modal de doação, alertas, badges e notificações (toast)

## Tecnologias

| Tecnologia | Uso no projeto |
|---|---|
| HTML5 | Estrutura semântica (`header`, `nav`, `main`, `section`, `article`, `footer`) |
| CSS3 | Variáveis (design system), Grid de 12 colunas, Flexbox, 5 breakpoints com `@media` |
| JavaScript (ES6) | Módulos `import`/`export`, roteador por hash, templates, eventos e validação |
| Web Storage | `localStorage` com `JSON.stringify` e `JSON.parse` |
| Chart.js 4 | Gráfico de voluntários por estado (via CDN, import dinâmico) |
| Git e GitHub | Versionamento, GitFlow, issues, milestones e pull requests |
| GitHub Pages | Hospedagem do site |

## Estrutura de pastas

```
instituto-esperanca/
├── index.html        # Casco da SPA (header, <main id="app">, footer)
├── html/             # Fragmentos de cada página (inicio, projetos, cadastro)
├── css/
│   └── style.css     # Estilos do site
├── imagens/          # Mídias (ONG.jpg)
└── js/
    ├── main.js       # Ponto de entrada
    ├── router.js     # Roteamento por hash e injeção das páginas
    ├── templates.js  # Geração de HTML a partir de dados
    ├── dados.js      # Dados dos projetos
    ├── eventos.js    # Listeners e event delegation
    ├── validacao.js  # Regras de validação e feedback visual
    ├── storage.js    # Leitura e gravação no localStorage
    ├── ui.js         # Modal e toast
    └── grafico.js    # Integração com o Chart.js
```

## Pré-requisitos

- Navegador moderno (Chrome, Edge, Firefox)
- [Git](https://git-scm.com/downloads)
- [VS Code](https://code.visualstudio.com/) com a extensão **Live Server** (ou Python 3 instalado)
- Conexão com a internet (o Chart.js é carregado por CDN)

## Instalação e execução local

O projeto não tem dependências para instalar. Basta clonar e servir os arquivos.

1. Clone o repositório:
   ```
   git clone https://manufirme13.github.io/Projeto-ong.git
   ```
2. Abra a pasta `instituto-esperanca` no VS Code (**Arquivo > Abrir Pasta**).
3. Clique com o botão direito em `index.html` e escolha **Open with Live Server**.
   - Alternativa sem VS Code, com Python 3, na pasta do projeto:
     ```
     python -m http.server 8000
     ```
4. Acesse `http://127.0.0.1:5500` (Live Server) ou `http://localhost:8000` (Python).

> **Importante:** não abra o `index.html` com duplo clique (endereço `file:///`). Os módulos ES e o `fetch` das páginas exigem um servidor HTTP, e o conteúdo não aparece sem ele.

## Build e testes

- **Build:** o projeto é um site estático e não possui etapa de build. Os arquivos são publicados como estão.
- **Testes:** não há testes automatizados. A verificação é manual, com este roteiro:
  1. Navegar por Início, Projetos, Cadastro e pelo submenu, usando também voltar e avançar do navegador.
  2. Abrir e fechar o modal (botão, fundo e tecla Esc).
  3. Testar o formulário com campos vazios, e-mail inválido, CPF inválido (`111.111.111-11`), menor de 18 anos e CPF repetido.
  4. Recarregar a página e conferir se os voluntários continuam na lista.
  5. Verificar se o Console (F12) não mostra erros e redimensionar a janela de 1600px até 480px.

## Acessibilidade

O projeto busca atender à WCAG 2.1 nível AA:

- HTML semântico e `lang="pt-BR"`
- `label` associado a cada campo e `fieldset` com `legend`
- Texto alternativo descritivo na imagem
- Foco visível (`:focus-visible`) e menu com submenu acessível por teclado (`:focus-within`)
- Erros de formulário com `aria-invalid`, `aria-describedby` e `role="alert"`, sem depender apenas da cor

## Versionamento

- **Fluxo de branches (GitFlow simplificado):**
  - `main`: versões estáveis, marcadas com tag
  - `develop`: integração do desenvolvimento
  - `feature/*`: novas funcionalidades, criadas a partir da `develop`
  - `hotfix/*`: correções urgentes, criadas a partir da `main`
- **Commits:** padrão [Conventional Commits](https://www.conventionalcommits.org/pt-br/) (`feat`, `fix`, `docs`...), adotado a partir da etapa de acessibilidade.
- **Versões:** [Versionamento Semântico](https://semver.org/lang/pt-BR/) (`MAJOR.MINOR.PATCH`), com tags `v0.1.0`, `v0.2.0` e `v1.0.0`.
- **Gestão:** tarefas em issues, metas em milestones e integração por pull requests.

## Deploy

O site é publicado no GitHub Pages a partir da branch `main`, pasta raiz (**Settings > Pages**). Como o roteamento usa hash (`#/projetos`) e os caminhos são relativos, não é preciso configurar redirecionamentos.

## Autoria

Projeto acadêmico desenvolvido por **Emmanuel Firme**, na disciplina de Desenvolvimento Front-end.
