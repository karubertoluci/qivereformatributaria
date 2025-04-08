
import React, { ReactNode } from 'react';

interface InfoCardProps {
  icon: ReactNode;
  label: string;
  value: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, label, value }) => {
  return (
    <div className="border border-gray-100 p-4 rounded-md shadow-sm bg-white">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-sm font-medium text-gray-500">{label}</span>
      </div>
      <span className="font-semibold text-gray-800">{value}</span>
    </div>
  );
};

export default InfoCard;
