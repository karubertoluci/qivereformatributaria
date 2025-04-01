
import React from 'react';
import { Button } from '@/components/ui/button';
import { Highlight, X } from 'lucide-react';
import { HighlightType } from './types';

interface HighlightToolbarProps {
  onHighlight: (color: HighlightType['color']) => void;
  onCancelHighlight: () => void;
  isVisible: boolean;
}

const HighlightToolbar: React.FC<HighlightToolbarProps> = ({ 
  onHighlight, 
  onCancelHighlight, 
  isVisible 
}) => {
  if (!isVisible) return null;
  
  return (
    <div className="fixed z-50 bg-white shadow-lg rounded-lg p-2 flex items-center space-x-2 border">
      <span className="text-xs font-medium px-2">Destacar:</span>
      
      <Button 
        size="sm" 
        variant="outline" 
        className="h-8 w-8 p-0 bg-yellow-100 hover:bg-yellow-200"
        onClick={() => onHighlight('yellow')}
      >
        <Highlight className="h-4 w-4" />
      </Button>
      
      <Button 
        size="sm" 
        variant="outline" 
        className="h-8 w-8 p-0 bg-green-100 hover:bg-green-200"
        onClick={() => onHighlight('green')}
      >
        <Highlight className="h-4 w-4" />
      </Button>
      
      <Button 
        size="sm" 
        variant="outline" 
        className="h-8 w-8 p-0 bg-blue-100 hover:bg-blue-200"
        onClick={() => onHighlight('blue')}
      >
        <Highlight className="h-4 w-4" />
      </Button>
      
      <Button 
        size="sm" 
        variant="outline" 
        className="h-8 w-8 p-0 bg-pink-100 hover:bg-pink-200"
        onClick={() => onHighlight('pink')}
      >
        <Highlight className="h-4 w-4" />
      </Button>
      
      <Button 
        size="sm" 
        variant="ghost" 
        className="h-8 w-8 p-0"
        onClick={onCancelHighlight}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default HighlightToolbar;
