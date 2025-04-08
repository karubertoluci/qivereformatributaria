
import React, { ReactNode } from 'react';

interface InfoCardProps {
  icon: ReactNode;
  label: string;
  value: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, label, value }) => {
  // Helper function to normalize text if it's in all caps
  const normalizeText = (text: string) => {
    // Only apply normalization if the text appears to be all uppercase
    if (text === text.toUpperCase() && text.length > 5) {
      // Convert to lowercase and capitalize first letters of words
      return text
        .toLowerCase()
        .replace(/(^|\s)\S/g, (letter) => letter.toUpperCase());
    }
    return text;
  };

  return (
    <div className="border border-gray-100 p-4 rounded-md shadow-sm bg-white">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-sm font-medium text-gray-500">{label}</span>
      </div>
      <span className="font-semibold text-gray-800">
        {label.toLowerCase() === "endereço" ? normalizeText(value) : value}
      </span>
    </div>
  );
};

export default InfoCard;
