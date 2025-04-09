
import { z } from 'zod';

// Define the form schema
export const formSchema = z.object({
  nome: z.string().min(2, { message: 'Por favor, informe seu nome' }),
  cargo: z.string().min(2, { message: 'Por favor, informe seu cargo' }),
  email: z.string().email({ message: 'Email inválido' }),
  telefone: z.string().min(10, { message: 'Telefone inválido' }).optional(),
  cnpj: z.string().min(14, { message: 'CNPJ inválido' }).max(18),
  possuiContaQive: z.boolean().default(false),
});

// Type definition for form values based on the schema
export type FormValuesBase = z.infer<typeof formSchema>;
