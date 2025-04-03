import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { RelevanceTotalData } from './useFavorabilityRelevanceData';
interface RelevanceCardsProps {
  relevanceLevels: string[];
  relevanceTotals: RelevanceTotalData[];
  relevanceFilter: string | null;
  onRelevanceSelect: (level: string) => void;
}
const RelevanceCards: React.FC<RelevanceCardsProps> = ({
  relevanceLevels,
  relevanceTotals,
  relevanceFilter,
  onRelevanceSelect
}) => {
  // Color mapping para níveis de relevância - consistente com o gráfico 1
  const colorScheme = {
    'Muito relevante': '#10b981',
    // green
    'Moderadamente relevante': '#f59e0b',
    // yellow
    'Pouco relevante': '#6b7280',
    // gray
    'Irrelevante': '#d1d5db' // light gray
  };
  return <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-16 mb-20">
      {relevanceLevels.map(level => {
      // Encontra os dados para este nível ou usa valores zerados
      const relevanceData = relevanceTotals.find(item => item.relevanceLevel === level) || {
        relevanceLevel: level,
        favorable: 0,
        neutral: 0,
        unfavorable: 0,
        total: 0,
        favorablePercent: 0,
        neutralPercent: 0,
        unfavorablePercent: 0
      };
      return <Card key={level} className={cn("border", relevanceFilter === level ? "border-primary bg-secondary/20" : "border-muted")}>
            <CardContent className="p-4 pt-3 py-[17px] my-0">
              <h4 className="text-lg font-semibold mb-3">{level}</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-sm bg-positive"></div>
                    Favoráveis:
                  </span>
                  <span className="text-sm font-semibold">
                    {relevanceData.favorablePercent}% ({relevanceData.favorable})
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5 text-sm">
                    <div className="w-3 h-3 rounded-sm bg-muted"></div>
                    Neutros:
                  </span>
                  <span className="text-sm font-semibold">
                    {relevanceData.neutralPercent}% ({relevanceData.neutral})
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5 text-sm">
                    <div className="w-3 h-3 rounded-sm bg-negative"></div>
                    Desfavoráveis:
                  </span>
                  <span className="text-sm font-semibold">
                    {relevanceData.unfavorablePercent}% ({relevanceData.unfavorable})
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0 px-4 pb-4">
              <Button variant={relevanceFilter === level ? "default" : "outline"} onClick={() => onRelevanceSelect(level)} className="w-full text-sm">
                {relevanceFilter === level ? 'Remover filtro' : 'Filtrar'}
              </Button>
            </CardFooter>
          </Card>;
    })}
    </div>;
};
export default RelevanceCards;