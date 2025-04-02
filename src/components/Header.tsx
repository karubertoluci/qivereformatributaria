import React from 'react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'react-router-dom';
import { FileText } from 'lucide-react';
import { useFormDialogContext } from './home/FormDialogContext';
const Header = () => {
  const location = useLocation();
  const {
    openFormDialog
  } = useFormDialogContext();
  return;
};
export default Header;