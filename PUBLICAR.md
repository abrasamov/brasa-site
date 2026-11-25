# Como arrumar o cadastro e pôr o site no ar

Troque `seudominio.org.br` pelo domínio da BRASA em todos os passos.

---

## Parte 1 · Fazer o código de acesso chegar

**O problema:** o e-mail com o código sai em nome de `abrasamov@gmail.com` pelo Brevo. O Gmail recusa ou manda para o spam e-mails "do Gmail" que não saem dos servidores do Google. O banco de dados está certo.

### 1.1 Autenticar o domínio no Brevo
1. Entre em https://app.brevo.com.
2. Clique no nome da conta (canto superior direito) e depois em **Senders, Domains & Dedicated IPs**.
3. Abra a aba **Domains** e clique em **Add a domain**.
4. Digite `seudominio.org.br` e escolha **Authenticate the domain yourself**.
5. O Brevo mostra uma tabela de registros. Cada um tem **Tipo**, **Nome/Host** e **Valor**:

   | Tipo | Nome (host) | Para que serve |
   |---|---|---|
   | TXT | `@` (ou em branco) | Código Brevo: prova que o domínio é seu |
   | TXT ou CNAME | algo como `brevo1._domainkey` | DKIM: assina os e-mails |
   | TXT | `_dmarc` | DMARC: política anti-fraude |

   Deixe essa aba aberta.

### 1.2 Colocar os registros no DNS do domínio
1. Em outra aba, abra o painel onde o domínio foi comprado. Por exemplo:
   - **registro.br:** entre com seu login, clique no domínio e depois em **DNS → Editar zona**;
   - **Cloudflare:** abra o domínio e vá em **DNS → Records**;
   - **Hostinger, GoDaddy etc.:** procure **Gerenciar DNS** ou **Zona DNS**.
2. Para cada linha da tabela do Brevo, clique em **Adicionar registro**:
   - **Tipo:** o mesmo da tabela;
   - **Nome:** o mesmo da tabela. Se o painel já completa `.seudominio.org.br` sozinho, digite só a primeira parte, por exemplo `_dmarc`;
   - **Valor:** copie e cole exatamente como está, sem espaços a mais.
3. **Se já existir um TXT de DMARC (`_dmarc`)**, não crie outro: mantenha o que existe.
4. Salve a zona.

### 1.3 Confirmar no Brevo
1. Volte à aba do Brevo e clique em **Authenticate this email domain**.
2. Se algum item ficar vermelho, espere de 15 a 60 minutos e tente de novo. No registro.br pode levar algumas horas.
3. Fica pronto quando todos os itens aparecem com ✓ verde.

### 1.4 Criar o remetente
1. Ainda em **Senders, Domains & Dedicated IPs**, abra a aba **Senders** e clique em **Add a sender**.
2. Preencha:
   - **From name:** `BRASA`
   - **From email:** `nao-responda@seudominio.org.br`
3. Salve. Como o domínio já está autenticado, não precisa confirmar por e-mail.

### 1.5 Trocar o remetente no Supabase
1. Entre em https://supabase.com/dashboard e abra o projeto da BRASA.
2. Vá em **Authentication → Emails → SMTP Settings**.
3. Mude **Sender email address** para `nao-responda@seudominio.org.br`.
4. Deixe o resto como está:
   - Host: `smtp-relay.brevo.com`
   - Porta: `587`
   - Usuário e senha: os mesmos.
5. Clique em **Save changes**.

### 1.6 Testar
1. Abra `https://abrasamov.github.io/brasa-site/faca-parte.html` numa janela anônima.
2. Entre com um Gmail que nunca foi usado no site.
3. O código de 6 dígitos deve chegar **na caixa de entrada** em menos de 1 minuto.
4. Peça para a pessoa que teve o erro tentar de novo.

---

## Parte 2 · Pôr o site no ar no domínio

### 2.1 Publicar as mudanças recentes
Estas mudanças ainda não estão no site publicado:
- o guia dos formulários;
- o mapa de personalidade;
- o logo que volta para o início;
- o fundo das animações no celular.

1. No Terminal:
   ```bash
   cd /Users/juniorstaff/brasa && git push -u origin faca-parte-ajustes
   ```
2. Abra https://github.com/abrasamov/brasa-site/compare/main...faca-parte-ajustes.
3. Clique em **Create pull request** e depois em **Merge pull request**.
4. Espere 1 ou 2 minutos para o GitHub Pages atualizar.

### 2.2 Apontar o domínio para o GitHub Pages
**No DNS do domínio** (o mesmo painel da Parte 1):

| Tipo | Nome | Valor |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `abrasamov.github.io` |

- Apague registros A ou CNAME antigos em `@` e `www` que apontem para outro lugar. Os TXT do Brevo ficam.
- No registro.br, isso só funciona com o DNS do próprio registro.br (modo **Editar zona**). Se ele pedir, ative essa opção.

**No GitHub:**
1. Abra https://github.com/abrasamov/brasa-site/settings/pages.
2. Em **Custom domain**, digite `seudominio.org.br` e clique em **Save**. O GitHub cria o arquivo `CNAME` no repositório sozinho.
3. Espere o check do DNS ficar verde. Pode levar de minutos a algumas horas.
4. Marque **Enforce HTTPS**. A opção pode demorar até uma hora para aparecer.
5. **Antes do próximo push**, rode `git pull` para trazer o `CNAME` que o GitHub criou.

### 2.3 Atualizar o Supabase para o domínio novo
1. Abra **Authentication → URL Configuration**.
2. Mude **Site URL** para `https://seudominio.org.br`.
3. Em **Redirect URLs**, adicione:
   - `https://seudominio.org.br/**`
   - `https://www.seudominio.org.br/**`
4. Salve.

### 2.4 Completar os termos (LGPD)
Antes de divulgar, `termos.html` precisa dizer:
- quem é o responsável pelos dados (nome ou entidade e CNPJ, se houver);
- um e-mail de contato para pedidos de acesso ou exclusão de dados.

Mande essas informações para o Claude preencher.

### 2.5 Teste final
1. **No computador:** abra `https://seudominio.org.br` e confira o cadeado de HTTPS.
2. **No celular:**
   - confira se as animações da tela inicial aparecem sem fundo branco;
   - faça um cadastro completo: código, informações básicas, os formulários e o mapa.
3. **No Supabase:** em **Table Editor → cadastros**, confira se o cadastro apareceu.
