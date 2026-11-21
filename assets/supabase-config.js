/* BRASA · ligação com o Supabase
   Cole aqui o endereço do projeto e a chave pública (anon / publishable).
   Onde achar: Supabase > Project Settings > API (ou "Data API").
   A chave pública pode ficar no site: quem protege os dados são as regras do banco (supabase/schema.sql).
   NUNCA coloque aqui a chave "service_role" / secreta.
   Enquanto estiver vazio, a página Faça parte funciona no modo protótipo (dados só no navegador). */
window.BRASA_SUPABASE = {
  url: 'https://yfmhzitrowczpewhmvdw.supabase.co',
  anonKey: 'sb_publishable_JjUQramG4QDnkiPiRUMU7w_8CpKCUZ1',  // chave pública (publishable)
};
