
import React from 'react';
import { Loader2, CheckCircle } from 'lucide-react';

interface CompanyLoadingAnimationProps {
  companyName: string;
  companyData?: any;
}

const CompanyLoadingAnimation: React.FC<CompanyLoadingAnimationProps> = ({ 
  companyName, 
  companyData 
}) => {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [isComplete, setIsComplete] = React.useState(false);
  
  React.useEffect(() => {
    // Animation sequence for loading steps
    const timer1 = setTimeout(() => setCurrentStep(2), 800);
    const timer2 = setTimeout(() => setCurrentStep(3), 1600);
    const timer3 = setTimeout(() => setCurrentStep(4), 2400);
    const timer4 = setTimeout(() => {
      setIsComplete(true);
    }, 2900);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);
  
  return (
    <div className="flex flex-col items-center py-8 px-4 text-center">
      <div className="text-xl font-medium mb-6">
        Preparando seu relatório personalizado
      </div>
      
      <div className="w-full space-y-4 mb-6">
        <Step 
          number={1} 
          text="Analisando dados do CNPJ"
          active={currentStep >= 1}
          complete={currentStep > 1}
        />
        <Step 
          number={2} 
          text="Processando impactos tributários"
          active={currentStep >= 2}
          complete={currentStep > 2}
        />
        <Step 
          number={3} 
          text="Identificando artigos relevantes"
          active={currentStep >= 3}
          complete={currentStep > 3}
        />
        <Step 
          number={4} 
          text={`Gerando relatório para ${companyName}`}
          active={currentStep >= 4}
          complete={isComplete}
        />
      </div>
      
      <div className="flex justify-center">
        {!isComplete ? (
          <Loader2 className="h-10 w-10 text-orange-500 animate-spin" />
        ) : (
          <CheckCircle className="h-10 w-10 text-green-500" />
        )}
      </div>
    </div>
  );
};

interface StepProps {
  number: number;
  text: string;
  active: boolean;
  complete: boolean;
}

const Step: React.FC<StepProps> = ({ number, text, active, complete }) => {
  return (
    <div className={`flex items-center ${active ? 'opacity-100' : 'opacity-50'}`}>
      <div className={`flex items-center justify-center w-8 h-8 rounded-full mr-3 
        ${complete ? 'bg-green-500' : active ? 'bg-orange-500' : 'bg-gray-300'}`}>
        {complete ? (
          <CheckCircle className="h-5 w-5 text-white" />
        ) : (
          <span className="text-white">{number}</span>
        )}
      </div>
      <span className={`${complete ? 'text-green-500 font-medium' : ''}`}>{text}</span>
    </div>
  );
};

export default CompanyLoadingAnimation;
