
/**
 * Formats a CNPJ string to the standard Brazilian format: XX.XXX.XXX/XXXX-XX
 * @param value The raw CNPJ string to format
 * @returns The formatted CNPJ string
 */
export const formatCNPJInput = (value: string): string => {
  // Remove non-digits
  const digits = value.replace(/\D/g, '');
  
  // Apply CNPJ mask: XX.XXX.XXX/XXXX-XX
  if (digits.length <= 2) {
    return digits;
  } else if (digits.length <= 5) {
    return `${digits.slice(0, 2)}.${digits.slice(2)}`;
  } else if (digits.length <= 8) {
    return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5)}`;
  } else if (digits.length <= 12) {
    return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8)}`;
  } else {
    return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12, 14)}`;
  }
};
