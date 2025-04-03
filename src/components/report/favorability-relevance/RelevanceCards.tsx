
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
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
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
      {relevanceLevels.map((level) => {
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
        
        return (
          <Card key={level} className={cn(
            "border border-muted",
            relevanceFilter === level ? "border-primary bg-secondary/20" : ""
          )}>
            <CardContent className="p-4">
              <h4 className="font-medium text-sm mb-2">{level}</h4>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="flex items-center">
                    <span className="h-2 w-2 bg-[#4ade80] rounded-full mr-1.5"></span>
                    Favoráveis:
                  </span>
                  <span className="font-medium">
                    {relevanceData.favorablePercent}% ({relevanceData.favorable})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="flex items-center">
                    <span className="h-2 w-2 bg-[#d1d5db] rounded-full mr-1.5"></span>
                    Neutros:
                  </span>
                  <span className="font-medium">
                    {relevanceData.neutralPercent}% ({relevanceData.neutral})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="flex items-center">
                    <span className="h-2 w-2 bg-[#ef4444] rounded-full mr-1.5"></span>
                    Desfavoráveis:
                  </span>
                  <span className="font-medium">
                    {relevanceData.unfavorablePercent}% ({relevanceData.unfavorable})
                  </span>
                </div>
              </div>
              <button 
                className="w-full mt-3 py-1 px-2 text-xs bg-muted hover:bg-muted/80 rounded"
                onClick={() => onRelevanceSelect(level)}
              >
                Filtrar
              </button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default RelevanceCards;
