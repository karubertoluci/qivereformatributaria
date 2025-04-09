
/**
 * Formats a CNPJ string into the standard Brazilian format (XX.XXX.XXX/XXXX-XX)
 */
export const formatCNPJ = (cnpj: string | undefined): string => {
  if (!cnpj) return '';
  
  // If already formatted, return as is
  if (cnpj.includes('.')) return cnpj;
  
  // Clean the CNPJ to get only digits
  const digits = cnpj.replace(/\D/g, '');
  
  // Check if we have exactly 14 digits (standard CNPJ length)
  if (digits.length !== 14) return cnpj; // Return original if not valid
  
  // Format CNPJ: XX.XXX.XXX/XXXX-XX
  return digits.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
};
