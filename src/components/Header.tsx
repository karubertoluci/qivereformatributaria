import React from 'react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { FileText, Share2, Download } from 'lucide-react';
import { useFormDialogContext } from './home/FormDialogContext';
const Header = () => {
  const location = useLocation();
  const {
    openFormDialog
  } = useFormDialogContext();
  const isResultPage = location.pathname.includes('/results');
  return <header className="bg-white border-b font-lexend">
      
    </header>;
};
export default Header;