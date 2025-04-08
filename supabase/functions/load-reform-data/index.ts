
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'

// Cabeçalhos CORS para permitir acesso de qualquer origem
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Tratar solicitações de preflight CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Criar cliente Supabase usando variáveis de ambiente
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Obter o corpo da solicitação
    const { action } = await req.json();

    if (action === 'load') {
      // Inserir exemplos de dados para teste
      
      // 1. Inserir livros
      const { data: livros, error: livrosError } = await supabase
        .from('livros')
        .insert([
          { numero: 1, nome: 'Contribuição sobre Bens e Serviços - CBS', descricao: 'Define a contribuição sobre bens e serviços.' },
          { numero: 2, nome: 'Imposto sobre Bens e Serviços - IBS', descricao: 'Define o imposto sobre bens e serviços.' },
          { numero: 3, nome: 'Imposto Seletivo - IS', descricao: 'Define o imposto seletivo.' },
          { numero: 4, nome: 'Disposições Finais', descricao: 'Disposições finais da reforma tributária.' }
        ])
        .select();
        
      if (livrosError) throw livrosError;
      
      // 2. Inserir títulos para o Livro 1
      const { data: titulos, error: titulosError } = await supabase
        .from('titulos')
        .insert([
          { livro_id: livros[0].id, numero: 1, nome: 'Disposições Gerais', descricao: 'Disposições gerais da CBS.' },
          { livro_id: livros[0].id, numero: 2, nome: 'Da Incidência', descricao: 'Define a incidência da CBS.' },
          { livro_id: livros[0].id, numero: 3, nome: 'Das Alíquotas', descricao: 'Define as alíquotas da CBS.' },
          { livro_id: livros[1].id, numero: 1, nome: 'Disposições Gerais', descricao: 'Disposições gerais do IBS.' },
          { livro_id: livros[1].id, numero: 2, nome: 'Da Incidência', descricao: 'Define a incidência do IBS.' }
        ])
        .select();
        
      if (titulosError) throw titulosError;
      
      // 3. Inserir capítulos
      const { data: capitulos, error: capitulosError } = await supabase
        .from('capitulos')
        .insert([
          { titulo_id: titulos[0].id, numero: 1, nome: 'Conceitos Básicos', descricao: 'Conceitos básicos da CBS' },
          { titulo_id: titulos[1].id, numero: 1, nome: 'Fatos Geradores', descricao: 'Fatos geradores da CBS' },
          { titulo_id: titulos[2].id, numero: 1, nome: 'Alíquotas Gerais', descricao: 'Alíquotas gerais da CBS' }
        ])
        .select();
        
      if (capitulosError) throw capitulosError;
      
      // 4. Inserir seções
      const { data: secoes, error: secoesError } = await supabase
        .from('secoes')
        .insert([
          { capitulo_id: capitulos[0].id, numero: 1, nome: 'Definições', descricao: 'Definições básicas' },
          { capitulo_id: capitulos[1].id, numero: 1, nome: 'Operações', descricao: 'Operações que geram a incidência' }
        ])
        .select();
        
      if (secoesError) throw secoesError;
      
      // 5. Inserir artigos
      const { data: artigos, error: artigosError } = await supabase
        .from('artigos')
        .insert([
          { 
            capitulo_id: capitulos[0].id, 
            secao_id: secoes[0].id, 
            numero: 1, 
            texto: 'Art. 1º Esta lei complementar institui a Contribuição sobre Bens e Serviços (CBS), em substituição às contribuições previstas nas alíneas "b" e "c" do inciso I do caput do art. 195 da Constituição Federal.',
            texto_simplificado: 'Este artigo estabelece a Contribuição sobre Bens e Serviços (CBS), substituindo PIS/PASEP e COFINS.'
          },
          { 
            capitulo_id: capitulos[0].id, 
            secao_id: secoes[0].id, 
            numero: 2, 
            texto: 'Art. 2º Para os efeitos desta Lei Complementar, considera-se: I - operação com bens e serviços: a operação de circulação de bens, o fornecimento de serviços e a cessão e o licenciamento de direitos;',
            texto_simplificado: 'Este artigo define o que é considerado uma operação com bens e serviços para fins de CBS.'
          },
          { 
            capitulo_id: capitulos[1].id, 
            secao_id: secoes[1].id, 
            numero: 3, 
            texto: 'Art. 3º A CBS incide sobre: I - a operação relativa a bem, incluindo bem digital; II - o fornecimento de serviço, incluindo serviço digital; e III - a cessão e o licenciamento de direitos, incluindo os de autor e de inventor.',
            texto_simplificado: 'A CBS incide sobre operações com bens (incluindo digitais), serviços e licenciamento de direitos.'
          }
        ])
        .select();
        
      if (artigosError) throw artigosError;
      
      // 6. Inserir impactos para diferentes segmentos
      const { error: impactosError } = await supabase
        .from('impactos')
        .insert([
          { 
            artigo_id: artigos[0].id, 
            segmento_id: 'comercio_varejo', 
            tipo: 'negative', 
            descricao: 'Substituição do PIS/COFINS pela CBS pode aumentar a carga tributária do varejo.',
            relevancia: 4
          },
          { 
            artigo_id: artigos[0].id, 
            segmento_id: 'industria', 
            tipo: 'positive', 
            descricao: 'Simplificação do sistema tributário com a CBS beneficia o setor industrial.',
            relevancia: 3
          },
          { 
            artigo_id: artigos[1].id, 
            segmento_id: 'comercio_varejo', 
            tipo: 'positive', 
            descricao: 'Definição clara de operações com bens e serviços traz segurança jurídica.',
            relevancia: 2
          },
          { 
            artigo_id: artigos[2].id, 
            segmento_id: 'tecnologia', 
            tipo: 'negative', 
            descricao: 'Inclusão explícita de bens e serviços digitais pode aumentar a tributação do setor.',
            relevancia: 5
          },
          { 
            artigo_id: artigos[2].id, 
            segmento_id: 'servicos', 
            tipo: 'negative', 
            descricao: 'Incidência sobre serviços pode elevar os custos do setor de prestação de serviços.',
            relevancia: 4
          }
        ]);
        
      if (impactosError) throw impactosError;
      
      return new Response(
        JSON.stringify({ success: true, message: 'Dados de exemplo carregados com sucesso' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Resposta para ação não reconhecida
    return new Response(
      JSON.stringify({ success: false, message: 'Ação não reconhecida' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error('Erro:', error);
    
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
