# BRASA — site

Site da BRASA, plataforma de mobilização cívica. HTML, CSS e JavaScript puros, sem etapa de build.

## Rodar no computador

```bash
python3 serve.py
```

O `serve.py` funciona como o `python3 -m http.server`, mas desliga o cache do navegador: ao recarregar, você sempre vê a versão mais nova.

Depois abra http://localhost:5173 (é a *Site URL* configurada no Supabase).

## Páginas

| Arquivo | O que é |
|---|---|
| `index.html` | Tela inicial: 10 personagens sem fundo, mulheres e homens intercalados, terminando no José com a chave (em loop) |
| `descubra.html` | A ideia, as 6 bandeiras e perguntas frequentes |
| `como-funciona.html` | Aba "Como vamos fazer": sistema com o sol na abertura, as 4 frentes e o detalhe de cada uma |
| `manifesto.html` | Manifesto do Brasismo |
| `artigos.html` | Artigos (em breve) e link do Substack |
| `faca-parte.html` | Braseiro: login por código, formulários, painel com o mapa BRASA e comunidade no WhatsApp |
| `termos.html` | Termos de uso e privacidade (versão provisória) |

Partes compartilhadas ficam em `assets/`: barra de abas (`dock.css`, `dock.js`), botão de compartilhar com as redes (`share.css`, `share.js`) e a ligação com o Supabase (`supabase-config.js`).

## Supabase (cadastro)

- Configuração do banco: `supabase/schema.sql`
- Passo a passo do painel: `supabase/COMO-CONFIGURAR.md`
- O site lê o endereço e a chave **pública** de `assets/supabase-config.js` (o `.env` serve só de registro).
- Nunca coloque no site nem no repositório a chave *secret* / *service_role*.
