
import React, { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ViewModeCardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  className?: string;
}

const ViewModeCard: React.FC<ViewModeCardProps> = ({
  title,
  icon,
  children,
  className = ''
}) => {
  return (
    <Card className={`border shadow-sm ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

export default ViewModeCard;
