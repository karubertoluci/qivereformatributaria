
/**
 * Format CNPJ string to standard Brazilian format: XX.XXX.XXX/XXXX-XX
 */
export const formatCNPJ = (cnpj: string | undefined): string => {
  if (!cnpj) return '';
  // If already formatted, return as is
  if (cnpj.includes('.')) return cnpj;

  // Format CNPJ: XX.XXX.XXX/XXXX-XX
  return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
};
