
import React from 'react';
import { BusinessSegment } from '@/data/segments';
import { useSearchParams } from 'react-router-dom';
import { TabsContent } from '@/components/ui/tabs';

interface ArticlesLayoutProps {
  segment: BusinessSegment;
  children: React.ReactNode;
}

const ArticlesLayout: React.FC<ArticlesLayoutProps> = ({ 
  segment,
  children
}) => {
  return (
    <TabsContent value="articles" className="pb-12">
      <div className="grid md:grid-cols-12 gap-6">
        {children}
      </div>
    </TabsContent>
  );
};

export default ArticlesLayout;
