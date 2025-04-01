
import React from 'react';
import { Book } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="bg-primary text-primary-foreground py-4 px-6 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <Book size={32} className="mr-2" />
          <h1 className="text-2xl font-bold">LegiScanAR</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
            Sobre a Reforma
          </Button>
          <Button variant="outline" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
            Contato
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
