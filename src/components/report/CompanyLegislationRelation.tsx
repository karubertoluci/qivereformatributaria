import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BusinessSegment } from '@/data/segments';
import { Link, CircleCheck, CircleX, Info, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
interface CompanyData {
  nome?: string;
  cargo?: string;
  cnpj?: string;
  razaoSocial?: string;
  nomeFantasia?: string;
  endereco?: string;
  cnaePrincipal?: {
    codigo: string;
    descricao: string;
  };
}
interface CompanyLegislationRelationProps {
  segment: BusinessSegment;
  companyData?: CompanyData;
}
const CompanyLegislationRelation: React.FC<CompanyLegislationRelationProps> = ({
  segment,
  companyData
}) => {
  // This is placeholder data - in a real implementation, this would come from an analysis
  // of how the specific CNAE or segment relates to different parts of the tax reform
  const mainFocusAreas = [{
    name: 'Alíquotas Diferenciadas',
    applicable: true,
    description: 'Seu segmento pode se beneficiar de alíquotas reduzidas previstas na reforma.'
  }, {
    name: 'Regime de Crédito Especial',
    applicable: segment.id === 'agronegocio' || segment.id === 'industria',
    description: 'Mecanismos específicos para recuperação de créditos tributários.'
  }, {
    name: 'Regras de Transição Estendidas',
    applicable: segment.id === 'servicos' || segment.id === 'financeiro',
    description: 'Períodos mais longos para adaptação ao novo sistema.'
  }, {
    name: 'Imunidades e Isenções',
    applicable: segment.id === 'educacao' || segment.id === 'saude',
    description: 'Possíveis reduções ou isenções em determinadas operações.'
  }, {
    name: 'Cashback para Consumidores',
    applicable: segment.id === 'comercio_varejo',
    description: 'Impacto das regras de devolução de imposto para consumidores finais.'
  }];
  const recommendations = ['Analise os impactos no fluxo de caixa durante o período de transição', 'Atualize seus sistemas fiscais para o novo modelo de tributação', 'Revise sua política de precificação considerando os efeitos da reforma', 'Avalie oportunidades de crédito fiscal no novo sistema', 'Prepare-se para potenciais mudanças nos requisitos de compliance'];
  return <Card className="bg-gradient-to-br from-slate-50 to-slate-100 border shadow-lg">
      <CardHeader className="border-b bg-white bg-opacity-70">
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Link className="h-6 w-6 text-primary" />
          Relação com seu Negócio
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Lado Esquerdo - Análise Específica */}
          <div className="space-y-5">
            <h3 className="font-semibold text-lg text-slate-950">Análise Específica para seu Negócio</h3>
            <p className="text-muted-foreground mb-4">
              Analisamos como a Reforma Tributária afeta especificamente o segmento {segment.name}
              {companyData?.cnaePrincipal && ` e empresas com CNAE ${companyData.cnaePrincipal.codigo}`}.
              Abaixo estão os principais pontos de atenção:
            </p>
            
            <div className="space-y-4">
              {mainFocusAreas.map((area, index) => <div key={index} className="flex items-start gap-3">
                  {area.applicable ? <CircleCheck className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" /> : <CircleX className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />}
                  <div>
                    <h4 className={`font-medium ${area.applicable ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {area.name}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {area.description}
                    </p>
                  </div>
                </div>)}
            </div>
          </div>
          
          {/* Lado Direito - Recomendações */}
          <div className="rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 p-5 border border-primary/20">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2 text-gray-950">
              <Info className="h-5 w-5" />
              Recomendações para seu Negócio
            </h3>
            
            
            
            <div className="space-y-3 mt-4">
              {recommendations.map((rec, index) => <div key={index} className="flex items-start gap-3">
                  <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-sm">
                    {rec}
                  </p>
                </div>)}
            </div>
            
            <div className="mt-5 text-sm text-muted-foreground">
              <p>
                Com base na sua atividade {companyData?.cnaePrincipal?.descricao ? `de ${companyData.cnaePrincipal.descricao}` : `no segmento ${segment.name}`}, 
                recomendamos atenção especial aos artigos sobre {getRecommendationForSegment(segment.id)}.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>;
};
function getRecommendationForSegment(segmentId: string): string {
  const recommendations: Record<string, string> = {
    comercio_varejo: "apuração de créditos na cadeia produtiva e regras de cashback para consumidores de baixa renda",
    industria: "aproveitamento de créditos em bens de capital e insumos, além das regras de transição para o IVA dual",
    servicos: "alíquotas diferenciadas para serviços essenciais e mecanismos de compensação para setores mais impactados",
    agronegocio: "regimes específicos para a agropecuária e tratamento da cesta básica",
    construcao: "tratamento fiscal de obras em andamento e regras específicas para o setor imobiliário",
    tecnologia: "tributação de serviços digitais e operações internacionais de tecnologia",
    saude: "imunidades e alíquotas reduzidas para serviços e produtos de saúde",
    educacao: "tratamento diferenciado para serviços educacionais e possíveis isenções",
    financeiro: "regime específico para o sistema financeiro e seguro",
    transporte: "regras de creditamento para investimentos em infraestrutura e tributação interestadual"
  };
  return recommendations[segmentId] || "não-cumulatividade e regras de transição";
}
export default CompanyLegislationRelation;