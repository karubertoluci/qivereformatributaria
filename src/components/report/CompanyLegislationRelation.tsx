
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BusinessSegment } from '@/data/segments';
import { Link, CircleCheck, CircleX, Info } from 'lucide-react';

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
  const mainFocusAreas = [
    { 
      name: 'Alíquotas Diferenciadas', 
      applicable: true,
      description: 'Seu segmento pode se beneficiar de alíquotas reduzidas previstas na reforma.'
    },
    { 
      name: 'Regime de Crédito Especial', 
      applicable: segment.id === 'agronegocio' || segment.id === 'industria',
      description: 'Mecanismos específicos para recuperação de créditos tributários.'
    },
    { 
      name: 'Regras de Transição Estendidas', 
      applicable: segment.id === 'servicos' || segment.id === 'financeiro',
      description: 'Períodos mais longos para adaptação ao novo sistema.'
    },
    { 
      name: 'Imunidades e Isenções', 
      applicable: segment.id === 'educacao' || segment.id === 'saude',
      description: 'Possíveis reduções ou isenções em determinadas operações.'
    },
    { 
      name: 'Cashback para Consumidores', 
      applicable: segment.id === 'comercio_varejo',
      description: 'Impacto das regras de devolução de imposto para consumidores finais.'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Link className="h-5 w-5 text-primary" />
          Relação com seu Segmento
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <p className="text-sm text-muted-foreground">
            Analisamos como a Reforma Tributária afeta especificamente o segmento {segment.name}
            {companyData?.cnaePrincipal && ` e empresas com CNAE ${companyData.cnaePrincipal.codigo}`}.
            Abaixo estão os principais pontos de atenção para seu negócio:
          </p>
          
          <div className="space-y-4">
            {mainFocusAreas.map((area, index) => (
              <div key={index} className="flex items-start gap-3">
                {area.applicable ? (
                  <CircleCheck className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                ) : (
                  <CircleX className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <h4 className={`font-medium ${area.applicable ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {area.name}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {area.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex gap-3">
              <Info className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-amber-800">Recomendação para seu negócio</h4>
                <p className="text-sm text-amber-700 mt-1">
                  Com base na sua atividade {companyData?.cnaePrincipal?.descricao ? `de ${companyData.cnaePrincipal.descricao}` : `no segmento ${segment.name}`}, 
                  recomendamos atenção especial aos artigos sobre {getRecommendationForSegment(segment.id)}. 
                  Esses pontos terão impacto direto na operação do seu negócio durante e após a transição para o novo sistema.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
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
