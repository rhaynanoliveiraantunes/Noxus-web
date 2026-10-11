# Regras do Projeto NOXUS

Este documento define a arquitetura, convenções e o fluxo de trabalho obrigatório para o desenvolvimento do portal comunitário **Noxus**.

---

## 1. Stack Tecnológica
- **Backend**: Node.js + Express (CommonJS: `require` / `module.exports`, `async/await`)
- **Banco de Dados**: MongoDB com Mongoose
- **Views**: EJS com partials reutilizáveis
- **Estilização**: CSS puro (organizado com CSS variables)
- **Segurança & Utilitários**: `dotenv`, `helmet`, `morgan`, `compression`, `express-rate-limit`

---

## 2. Arquitetura Modular MVC
A aplicação é dividida em módulos desacoplados:
- `src/config/`: Configurações de serviços e conexões (banco de dados, etc.)
- `src/models/`: Schemas e modelos do Mongoose
- `src/controllers/`: Controladores de regras de negócio
- `src/routes/`: Roteamento da aplicação
- `src/views/`: Templates EJS (`partials/` para componentes compartilhados e `pages/` para páginas)
- `src/middlewares/`: Middlewares customizados (erros 404/500, autenticação, validação, rate limit)
- `public/`: Arquivos estáticos (`css/`, `js/`, `img/`)

---

## 3. Boas Práticas e Segurança
- **Zero Segredos no Código**: Configurações sensíveis e dados de ambiente devem residir estritamente no `.env`. Mantenha o `.env.example` sempre atualizado.
- **Variáveis de Identidade**: O nome do servidor e textos institucionais devem vir de variáveis de ambiente (`SERVER_NAME`), nunca fixos no código.
- **Tratamento de Erros**: Sempre use blocos `try/catch` em operações assíncronas e respostas de erro amigáveis ao usuário.
- **Código Limpo**: Comentários explicativos em português onde necessário.

---

## 4. FLUXO OBRIGATÓRIO AO FINALIZAR CADA TAREFA

Toda e qualquer tarefa desenvolvida no projeto deve rigorosamente seguir as 4 etapas abaixo antes da conclusão:

### 1. TESTES
- Inicie o servidor e teste as rotas afetadas (validando status HTTP e conteúdo renderizado).
- Verifique se não há erros no console e se `npm start` ou `npm run dev` sobem sem falhas.
- Se algum teste falhar, corrija e teste novamente. **NUNCA faça commit com algo quebrado**.

### 2. VERIFICAÇÃO DE SEGURANÇA ANTES DO COMMIT
- Execute `git status` e confirme que `.env`, `node_modules` e `references/` **NÃO** estão na lista de arquivos a commitar.
- Verifique se nenhum segredo (tokens, senhas, chaves de API, credenciais) está exposto no código. Se houver, interrompa imediatamente.

### 3. COMMIT E PUSH
- Realize o `git add` apenas dos arquivos pertinentes.
- Faça o `git commit` com mensagem clara em português no formato: `tipo: descrição curta` (ex: `feat: cria página inicial`, `fix: corrige rota 404`, `style: aplica tema Noxus`, `docs: atualiza README`).
- Identifique o branch atual com `git branch --show-current`.
- Realize o `git push` para o branch identificado.
- **Nunca use `git push --force` nem reescreva o histórico**.

### 4. RELATÓRIO FINAL
- Apresente um resumo claro: o que foi feito, os testes executados e seus resultados, a mensagem do commit e o status do push.
- Se o push encontrar qualquer impedimento (como autenticação ou conflito), detalhe a causa claramente.
