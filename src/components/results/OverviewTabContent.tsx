
import React from 'react';
import { BusinessSegment } from '@/data/segments';
import { Article } from '@/data/articles';
import { CompanyData } from '@/hooks/useResultsData';
import { FileText, Book } from 'lucide-react';
import ArticlesPriorityChart from '../ArticlesPriorityChart';
import CompanyOverview from '../report/CompanyOverview';
import ReformOverview from '../report/ReformOverview';
import LegislationBooks from '../report/LegislationBooks';
import CompanyLegislationRelation from '../report/CompanyLegislationRelation';

interface OverviewTabContentProps {
  segment: BusinessSegment;
  companyData: CompanyData;
  hasCompanyData: boolean;
  relevantArticles: Article[];
  onSelectArticle: (articleId: string) => void;
}

const OverviewTabContent: React.FC<OverviewTabContentProps> = ({
  segment,
  companyData,
  hasCompanyData,
  relevantArticles,
  onSelectArticle
}) => {
  return (
    <div className="space-y-6 mt-6">
      {hasCompanyData && (
        <CompanyOverview companyData={companyData} segment={segment} />
      )}
      
      <ReformOverview segment={segment} />
      
      <div className="grid md:grid-cols-2 gap-6">
        <LegislationBooks articles={relevantArticles} onSelectArticle={onSelectArticle} />
        <CompanyLegislationRelation segment={segment} companyData={companyData} />
      </div>
      
      <div className="p-4 bg-card rounded-lg border shadow-sm">
        <h3 className="text-xl font-medium mb-4 flex items-center gap-2">
          <Book className="h-5 w-5 text-primary" />
          Artigos Prioritários para seu Segmento
        </h3>
        
        <ArticlesPriorityChart 
          articles={relevantArticles}
          segmentId={segment.id}
          onSelectArticle={onSelectArticle}
        />
        
        <div className="mt-4 text-center">
          <button 
            onClick={() => document.querySelector('[data-value="articles"]')?.dispatchEvent(new Event('click'))}
            className="text-primary hover:text-primary-dark underline text-sm"
          >
            Ver todos os {relevantArticles.length} artigos
          </button>
        </div>
      </div>
    </div>
  );
};

export default OverviewTabContent;
