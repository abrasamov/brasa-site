# Ligar o "Faça parte" ao Supabase

Passo a passo no painel do Supabase (supabase.com/dashboard). Leva uns 15 minutos.

## 1. Criar o projeto
1. **New project**.
2. Nome: `brasa`. Região: **South America (São Paulo)**.
3. Crie uma senha forte para o banco e guarde num lugar seguro (não precisa me mandar).

## 2. Criar as tabelas e as regras de segurança
1. Menu lateral: **SQL Editor → New query**.
2. Copie todo o conteúdo do arquivo `supabase/schema.sql` deste projeto, cole e clique **Run**.
3. Deve aparecer "Success. No rows returned".

Isso cria:
- a tabela `cadastros` (uma linha por pessoa, com as respostas de cada formulário);
- regras para que cada pessoa só veja e altere o próprio cadastro;
- a pasta privada `curriculos` (PDF/DOC/DOCX, até 5 MB).

## 3. Fazer o e-mail mandar o código de 6 dígitos
Por padrão o Supabase manda um **link**. Para mandar o **código**:

1. **Authentication → Emails** (ou *Email Templates*).
2. Abra o modelo **Magic Link** e troque o conteúdo por:

   - Assunto: `Seu código de acesso à BRASA`
   - Corpo:
     ```html
     <h2>Seu código de acesso</h2>
     <p>Use este código para entrar na BRASA:</p>
     <p style="font-size:28px;font-weight:bold;letter-spacing:6px">{{ .Token }}</p>
     <p>O código expira em 1 hora. Se não foi você, ignore este e-mail.</p>
     ```
3. Faça o mesmo no modelo **Confirm signup** (é o que chega para quem se cadastra pela primeira vez).
4. **Authentication → Providers → Email** (ou *Sign In / Providers*):
   - **Email** ligado.
   - **Email OTP Length**: `6`.
   - **Email OTP Expiration**: `3600` (1 hora).

## 4. Endereço do site
**Authentication → URL Configuration → Site URL**: o endereço onde o site vai ficar no ar
(enquanto testa, pode ser `http://localhost:5173`).

## 5. Ligar o site ao projeto
1. **Project Settings → API** (ou *Data API*).
2. Copie:
   - **Project URL** (algo como `https://abcdefghijk.supabase.co`);
   - a chave **anon / public** (ou *publishable*).
3. Cole os dois em `assets/supabase-config.js`, ou me mande que eu coloco.

> A chave **anon/publishable** pode ficar no site; quem protege os dados são as regras do passo 2.
> **Nunca** use nem compartilhe a chave **service_role / secret**.

Pronto: a página Faça parte sai do modo protótipo sozinha, manda o código de verdade e salva tudo no banco.

## 6. Antes do lançamento
- **E-mail próprio**: o envio embutido do Supabase é limitado a poucos e-mails por hora, então serve para testes.
  Para o lançamento, crie uma conta num serviço de e-mail (ex.: Resend, que tem plano gratuito) e configure em
  **Project Settings → Authentication → SMTP Settings**. Assim os códigos chegam rápido e com o remetente da BRASA.
- **Termos e privacidade**: completar `termos.html` (responsável pelos dados e contato) antes de abrir ao público.

## Onde a equipe vê os cadastros
- **Table Editor → cadastros**: uma linha por pessoa; dá para filtrar e **exportar em CSV**.
- **Storage → curriculos**: os currículos, numa pasta por pessoa (o nome da pasta é o `user_id` da linha).
- Para dar acesso a mais gente da equipe: **Organization → Team → Invite**.
