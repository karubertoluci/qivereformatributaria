
import React from 'react';
import { FileText, Briefcase } from 'lucide-react';
import { CompanyApiData, CompanyData, CNAEData } from '@/hooks/results/types';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';

interface CNAESectionProps {
  companyData: CompanyData;
}

const CNAESection: React.FC<CNAESectionProps> = ({
  companyData
}) => {
  // Access companyData safely
  const company = companyData.companyData || {};
  
  // Get principal CNAE, with fallbacks for different API response formats
  const cnaePrincipal = company.cnaePrincipal || 
    (company.cnae_fiscal ? { 
      codigo: company.cnae_fiscal.toString(), 
      descricao: company.cnae_fiscal_descricao || '' 
    } : null);
    
  // Get secondary CNAEs, with fallbacks for different API response formats
  const cnaeSecundarios = company.cnaeSecundarios || company.cnaes_secundarios || [];
  
  return (
    <div className="space-y-4">
      {/* CNAE Principal */}
      <div className="border rounded-lg p-4">
        <div className="flex flex-col">
          <div className="flex items-center mb-2">
            <Briefcase className="h-5 w-5 text-rose-500" />
            <div className="ml-2">
              <p className="text-rose-500 font-medium">CNAE Principal</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="px-3 py-1.5 bg-rose-50 rounded-md mr-2">
              <p className="text-gray-800 font-bold">
                {cnaePrincipal?.codigo || "Não disponível"}
              </p>
            </div>
            <div className="flex-grow">
              <p className="text-gray-800 text-sm">
                {cnaePrincipal?.descricao || "Descrição não disponível"}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CNAEs Secundários */}
      <div className="border rounded-lg p-4 h-full min-h-[250px]">
        <div className="flex flex-col h-full">
          <div className="flex items-center mb-3">
            <FileText className="h-5 w-5 text-rose-500" />
            <div className="ml-2">
              <p className="text-rose-500 font-medium">CNAEs Secundários</p>
            </div>
          </div>
          
          {cnaeSecundarios && cnaeSecundarios.length > 0 ? (
            <Table>
              <TableBody>
                {cnaeSecundarios.map((cnae: CNAEData, i: number) => (
                  <TableRow key={i} className="border-b border-gray-100">
                    <TableCell className="py-2 px-3 bg-rose-50 rounded-md w-24 font-semibold text-gray-800">
                      {cnae.codigo}
                    </TableCell>
                    <TableCell className="py-2 pl-4 text-gray-700">
                      {cnae.descricao}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex-grow flex items-center justify-center h-full border border-dashed rounded-lg border-gray-200 p-6">
              <p className="text-gray-500 text-center">Nenhum CNAE Secundário foi identificado.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CNAESection;
