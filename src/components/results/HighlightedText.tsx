
import React, { useState } from 'react';
import { HighlightType } from './types';
import HighlightToolbar from './HighlightToolbar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface HighlightedTextProps {
  text: string;
  highlights: HighlightType[];
  articleId: string;
  onAddHighlight: (text: string, color: HighlightType['color']) => void;
}

const HighlightedText: React.FC<HighlightedTextProps> = ({
  text,
  highlights,
  articleId,
  onAddHighlight
}) => {
  const [selectedText, setSelectedText] = useState('');
  const [toolbarPosition, setToolbarPosition] = useState({ x: 0, y: 0 });
  const [isToolbarVisible, setIsToolbarVisible] = useState(false);

  // Apply existing highlights to the text
  const renderHighlightedText = () => {
    if (highlights.length === 0) return text;

    // Create a copy of the text to work with
    let result = text;
    
    // Sort highlights by length (longest first) to avoid nested highlight issues
    const sortedHighlights = [...highlights].sort((a, b) => b.text.length - a.text.length);
    
    // Apply each highlight
    sortedHighlights.forEach(highlight => {
      const colorClasses = {
        yellow: 'bg-yellow-200',
        green: 'bg-green-200',
        blue: 'bg-blue-200',
        pink: 'bg-pink-200'
      };
      
      // Use a unique ID to avoid conflicts when replacing
      const uniqueId = `highlight-${highlight.id}`;
      
      // Replace the text with a span containing the highlight
      result = result.replace(
        highlight.text, 
        `<span class="${colorClasses[highlight.color]} rounded px-0.5" data-highlight-id="${highlight.id}">${highlight.text}</span>`
      );
    });
    
    return <div dangerouslySetInnerHTML={{ __html: result }} />;
  };

  const handleMouseUp = () => {
    const selection = window.getSelection();
    if (selection && !selection.isCollapsed) {
      const text = selection.toString().trim();
      if (text) {
        setSelectedText(text);
        
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        
        // Position the toolbar above the selection
        setToolbarPosition({
          x: rect.left + (rect.width / 2),
          y: rect.top - 10
        });
        
        setIsToolbarVisible(true);
      }
    }
  };

  const handleHighlight = (color: HighlightType['color']) => {
    if (selectedText) {
      onAddHighlight(selectedText, color);
      resetHighlightState();
    }
  };

  const resetHighlightState = () => {
    setSelectedText('');
    setIsToolbarVisible(false);
    window.getSelection()?.removeAllRanges();
  };

  return (
    <div>
      <div 
        onMouseUp={handleMouseUp} 
        className="text-sm cursor-text"
      >
        {renderHighlightedText()}
      </div>
      
      {isToolbarVisible && (
        <div 
          style={{ 
            position: 'fixed',
            top: `${toolbarPosition.y}px`,
            left: `${toolbarPosition.x}px`,
            transform: 'translateX(-50%)',
            zIndex: 1000
          }}
        >
          <HighlightToolbar 
            isVisible={isToolbarVisible}
            onHighlight={handleHighlight}
            onCancelHighlight={resetHighlightState}
          />
        </div>
      )}
    </div>
  );
};

export default HighlightedText;
