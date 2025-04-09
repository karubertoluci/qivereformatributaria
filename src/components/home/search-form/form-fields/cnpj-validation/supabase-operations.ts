
import { supabase } from '@/integrations/supabase/client';
import { mapCnaeToSegment } from '../../utils';

/**
 * Saves CNAE data to Supabase
 * @param cnpj The CNPJ (formatted or unformatted)
 * @param cnae The CNAE code
 * @param descricao The CNAE description
 * @param empresa The company name
 */
export const saveCnaeToSupabase = async (
  cnpj: string, 
  cnae: string, 
  descricao: string, 
  empresa: string
): Promise<void> => {
  try {
    console.log('Tentando salvar CNAE no Supabase:', { cnpj, cnae, descricao, empresa });
    
    // Map CNAE to segment
    const segmento = mapCnaeToSegment(cnae);
    console.log('Segmento mapeado:', segmento);
    
    // First, save basic data to the consultas table
    const { error: consultasError } = await supabase
      .from('consultas')
      .insert({
        cnae: cnae,
        cnpj: cnpj.replace(/\D/g, ''), // Store only digits
        consultado_em: new Date().toISOString()
      });
      
    if (consultasError) {
      console.error('Erro ao salvar dados na tabela consultas:', consultasError);
    } else {
      console.log('Dados salvos com sucesso na tabela consultas');
    }
    
    // Then save to cnae_consultas table
    const { error: cnaeConsultasError } = await supabase
      .from('cnae_consultas')
      .insert({
        cnae: cnae,
        descricao: descricao,
        cnpj: cnpj.replace(/\D/g, ''),
        empresa: empresa,
        segmento: segmento,
        consultado_em: new Date().toISOString()
      });
    
    if (cnaeConsultasError) {
      console.error('Erro ao salvar dados na tabela cnae_consultas:', cnaeConsultasError);
    } else {
      console.log('Dados salvos com sucesso na tabela cnae_consultas');
    }
    
  } catch (error) {
    console.error('Erro ao tentar salvar CNAE no Supabase:', error);
    // Continue with the flow even if saving to Supabase fails
  }
};
