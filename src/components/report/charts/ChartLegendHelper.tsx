import React from 'react';
interface ChartLegendHelperProps {
  title?: string;
  items: {
    color: string;
    label: string;
    description: string;
  }[];
}
const ChartLegendHelper: React.FC<ChartLegendHelperProps> = ({
  title,
  items
}) => {
  return;
};
export { ChartLegendHelper };