
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BusinessSegment } from '@/data/segments';
import { 
  FileText, 
  Replace, 
  MapPin, 
  ReceiptText, 
  Percent, 
  HandCoins,
  ScrollText,
  Clock,
  Calendar,
  Check,
  ArrowDown
} from 'lucide-react';

interface ReformOverviewProps {
  segment: BusinessSegment;
}

const ReformOverview: React.FC<ReformOverviewProps> = ({
  segment
}) => {
  return (
    <Card>
      <CardHeader className="bg-gradient-to-r from-rose-50 to-white border-b">
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-rose-500" />
          A Reforma Tributária e o Segmento {segment.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2 text-left">Visão Geral da Reforma Tributária</h3>
              <p className="text-muted-foreground text-left">
                A Reforma Tributária (PEC 45/2023) representa uma das maiores mudanças no sistema tributário 
                brasileiro nas últimas décadas. Seu objetivo principal é simplificar a tributação sobre 
                o consumo, substituindo cinco tributos (PIS, Cofins, IPI, ICMS e ISS) por um Imposto sobre 
                Valor Agregado (IVA) dual: a CBS (Contribuição sobre Bens e Serviços) federal e o IBS 
                (Imposto sobre Bens e Serviços) estadual/municipal.
              </p>
            </div>
            
            <div className="p-4 bg-rose-50 rounded-lg h-full">
              <h4 className="font-medium text-left flex items-center gap-2 mb-3">
                Principais mudanças:
              </h4>
              <ul className="space-y-2 mt-2 text-sm">
                <li className="flex items-start gap-2 text-left">
                  <Replace className="h-4 w-4 text-rose-500 flex-shrink-0 mt-1" />
                  <span>Substituição de cinco tributos por um sistema IVA dual</span>
                </li>
                <li className="flex items-start gap-2 text-left">
                  <MapPin className="h-4 w-4 text-rose-500 flex-shrink-0 mt-1" />
                  <span>Cobrança do imposto no destino (onde ocorre o consumo), não na origem</span>
                </li>
                <li className="flex items-start gap-2 text-left">
                  <ReceiptText className="h-4 w-4 text-rose-500 flex-shrink-0 mt-1" />
                  <span>Não-cumulatividade plena (créditos amplos de insumos)</span>
                </li>
                <li className="flex items-start gap-2 text-left">
                  <Percent className="h-4 w-4 text-rose-500 flex-shrink-0 mt-1" />
                  <span>Alíquota padrão nacional estimada entre 25% e 27%</span>
                </li>
                <li className="flex items-start gap-2 text-left">
                  <HandCoins className="h-4 w-4 text-rose-500 flex-shrink-0 mt-1" />
                  <span>Cashback para famílias de baixa renda</span>
                </li>
                <li className="flex items-start gap-2 text-left">
                  <ScrollText className="h-4 w-4 text-rose-500 flex-shrink-0 mt-1" />
                  <span>Criação de regimes diferenciados para setores específicos</span>
                </li>
                <li className="flex items-start gap-2 text-left">
                  <Clock className="h-4 w-4 text-rose-500 flex-shrink-0 mt-1" />
                  <span>Período de transição de 8 anos (2026-2033)</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2 text-left">Impacto no Segmento {segment.name}</h3>
              <p className="text-muted-foreground text-left">
                {getSegmentImpacts(segment.id)}
              </p>
            </div>
            
            <div className="p-4 border rounded-lg bg-secondary/10 h-full">
              <h4 className="font-medium mb-3 text-left">Cronograma de Implementação</h4>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="bg-rose-500/20 text-rose-700 font-medium px-3 py-1 rounded-md w-24 text-center flex-shrink-0">
                    2023-2024
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-left">Aprovação legislativa e regulamentação inicial</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="bg-rose-500/20 text-rose-700 font-medium px-3 py-1 rounded-md w-24 text-center flex-shrink-0">
                    2025
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-left">Teste do sistema (opcional)</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="bg-rose-500/20 text-rose-700 font-medium px-3 py-1 rounded-md w-24 text-center flex-shrink-0">
                    2026-2032
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-left">Início do período de transição, com alíquotas sendo gradualmente ajustadas</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="bg-rose-500/20 text-rose-700 font-medium px-3 py-1 rounded-md w-24 text-center flex-shrink-0">
                    2033
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-left">Implementação completa do novo sistema</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

function getSegmentImpacts(segmentId: string): string {
  const impactsBySegment: Record<string, string> = {
    comercio_varejo: "Para empresas do comércio varejista, a reforma trará várias mudanças significativas, incluindo a possibilidade de créditos amplos na cadeia produtiva e a eliminação da cumulatividade tributária. No entanto, a elevação das alíquotas pode pressionar margens, exigindo ajustes de preços. O setor poderá se beneficiar da simplificação fiscal e redução de custos de conformidade.",
    industria: "O setor industrial será impactado principalmente pela não-cumulatividade plena, que permitirá aproveitamento integral de créditos. Isso tende a reduzir a carga tributária efetiva em cadeias longas de produção. A reforma também deve aumentar a competitividade de produtos brasileiros, eliminando exportação de tributos. Indústrias com altas taxas de investimento poderão se beneficiar da recuperação mais ágil de créditos.",
    servicos: "O setor de serviços enfrenta desafios significativos com a reforma, pois a alíquota única tende a elevar a tributação sobre serviços, que hoje têm carga menor (ISS). Empresas com poucos insumos terão limitada recuperação de créditos. No entanto, a reforma prevê alíquotas reduzidas para alguns segmentos de serviços essenciais.",
    agronegocio: "O agronegócio recebeu tratamento diferenciado na reforma, com regime específico e possível desoneração para produtos da cesta básica. Produtores rurais contarão com simplificação fiscal e podem se beneficiar da maior transparência na cadeia produtiva, embora possam enfrentar ajustes nos sistemas de controle e faturamento.",
    construcao: "Para a construção civil, a reforma pode trazer maior equilíbrio tributário entre obras públicas e privadas. O setor deverá se adaptar a novos controles de créditos, especialmente em relação a materiais de construção. A simplificação do sistema pode reduzir custos administrativos, mas exigirá investimento em adequação tecnológica.",
    tecnologia: "Empresas de tecnologia poderão se beneficiar da possibilidade de créditos amplos e da eliminação de distorções competitivas regionais. O setor enfrenta o desafio de adaptação a novas regras para serviços digitais e possíveis ajustes na tributação de software e operações internacionais, mas a simplificação geral tende a ser benéfica.",
    saude: "O setor de saúde deverá contar com alíquotas reduzidas ou regime especial, conforme previsto na reforma. Ainda assim, provedores de serviços médicos precisarão adaptar sistemas de gestão fiscal e controle de créditos. Hospitais e clínicas podem enfrentar complexidades no período de transição até que as regulamentações específicas sejam totalmente implementadas.",
    educacao: "Instituições educacionais estão incluídas entre os setores com possível tratamento diferenciado, o que pode manter sua carga tributária em níveis atuais. No entanto, será necessário investimento em adaptação dos sistemas de gestão fiscal e controle de créditos. O período de transição exigirá atenção especial às regulamentações específicas.",
    financeiro: "O setor financeiro enfrentará desafios particulares na reforma, com possível regime específico devido às peculiaridades de suas operações. Bancos e instituições financeiras precisarão fazer adaptações significativas em seus sistemas tributários, com possíveis impactos em produtos e serviços oferecidos aos clientes.",
    transporte: "Para empresas de transporte e logística, a reforma pode trazer benefícios com a uniformização de regras entre estados e municípios, eliminando complexidades no transporte interestadual. O setor poderá se beneficiar da não-cumulatividade plena, mas precisará adaptar-se a novas regras de creditamento e controle fiscal."
  };
  return impactsBySegment[segmentId] || "Este segmento terá impactos diversos com a reforma tributária, incluindo a substituição do sistema atual por um IVA dual, mudanças na forma de apuração de créditos e adaptação a novas regras de compliance fiscal. É importante analisar detalhadamente cada artigo para entender os efeitos específicos para seu negócio.";
}

export default ReformOverview;
