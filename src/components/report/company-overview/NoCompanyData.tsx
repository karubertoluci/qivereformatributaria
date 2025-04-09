
import React from 'react';
import { CardContent } from '@/components/ui/card';

const NoCompanyData: React.FC = () => {
  return (
    <CardContent className="p-6">
      <div className="text-center py-8">
        <p className="text-muted-foreground">Nenhuma informação da empresa disponível</p>
      </div>
    </CardContent>
  );
};

export default NoCompanyData;
