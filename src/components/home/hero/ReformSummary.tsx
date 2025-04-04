
import React from 'react';

interface ReformSummaryProps {
  title?: string;
  description?: string;
}

const ReformSummary: React.FC<ReformSummaryProps> = ({
  title = "Entenda os impactos da Reforma Tributária para o seu negócio",
  description = "A Reforma Tributária traz mudanças significativas para empresas de todos os setores. Com nossa análise personalizada, você estará preparado para adaptar seu negócio às novas regras fiscais de 2025."
}) => {
  return (
    <div className="py-8 text-center">
      <h3 className="text-xl font-medium text-gray-800 mb-4">
        {title}
      </h3>
      <p className="text-gray-600 max-w-3xl mx-auto">
        {description}
      </p>
    </div>
  );
};

export default ReformSummary;
