-- =========================================================
-- BRASA · Faça parte — banco de dados no Supabase
-- Cole tudo isto em: Supabase > SQL Editor > New query > Run
-- Pode rodar mais de uma vez sem problema.
-- =========================================================

-- 1) Uma linha por pessoa cadastrada, com as respostas de cada formulário
create table if not exists public.cadastros (
  user_id       uuid primary key references auth.users (id) on delete cascade,
  email         text,
  infos         jsonb,   -- Informações básicas (obrigatório)
  experiencias  jsonb,   -- Experiências profissionais (opcional)
  competencias  jsonb,   -- Competências e habilidades (opcional)
  personalidade jsonb,   -- Teste de personalidade (opcional)
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- 2) Segurança: cada pessoa só vê e altera a própria linha.
--    A equipe vê tudo pelo painel do Supabase (Table Editor), que ignora essas regras.
alter table public.cadastros enable row level security;

drop policy if exists "ver o próprio cadastro" on public.cadastros;
create policy "ver o próprio cadastro" on public.cadastros
  for select to authenticated using (auth.uid() = user_id);

drop policy if exists "criar o próprio cadastro" on public.cadastros;
create policy "criar o próprio cadastro" on public.cadastros
  for insert to authenticated with check (auth.uid() = user_id);

drop policy if exists "atualizar o próprio cadastro" on public.cadastros;
create policy "atualizar o próprio cadastro" on public.cadastros
  for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- 3) Currículos: pasta privada; cada pessoa só mexe na própria pasta (nome da pasta = id da pessoa)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('curriculos', 'curriculos', false, 5242880,
        array['application/pdf', 'application/msword',
              'application/vnd.openxmlformats-officedocument.wordprocessingml.document'])
on conflict (id) do nothing;

drop policy if exists "enviar o próprio currículo" on storage.objects;
create policy "enviar o próprio currículo" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'curriculos' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "ver o próprio currículo" on storage.objects;
create policy "ver o próprio currículo" on storage.objects
  for select to authenticated
  using (bucket_id = 'curriculos' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "trocar o próprio currículo" on storage.objects;
create policy "trocar o próprio currículo" on storage.objects
  for update to authenticated
  using (bucket_id = 'curriculos' and (storage.foldername(name))[1] = auth.uid()::text);

-- 4) Permissões de acesso pela API (o projeto foi criado sem
--    "Grant API access to new tables automatically")
grant select, insert, update on public.cadastros to authenticated;
grant all on public.cadastros to service_role;
