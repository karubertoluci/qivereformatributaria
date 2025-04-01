
import React, { useState } from 'react';
import { HighlightType } from './types';
import HighlightToolbar from './HighlightToolbar';

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

    let result = text;
    // This is a simplified approach - for production, you'd need
    // a more robust solution to handle overlapping highlights
    highlights.forEach(highlight => {
      const colorClasses = {
        yellow: 'bg-yellow-200',
        green: 'bg-green-200',
        blue: 'bg-blue-200',
        pink: 'bg-pink-200'
      };
      
      result = result.replace(
        highlight.text, 
        `<span class="${colorClasses[highlight.color]}">${highlight.text}</span>`
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
        
        setToolbarPosition({
          x: rect.left + window.scrollX,
          y: rect.top - 40 + window.scrollY // Position above the selection
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
      
      <div style={{ 
        position: 'absolute', 
        left: `${toolbarPosition.x}px`, 
        top: `${toolbarPosition.y}px` 
      }}>
        <HighlightToolbar 
          isVisible={isToolbarVisible}
          onHighlight={handleHighlight}
          onCancelHighlight={resetHighlightState}
        />
      </div>
    </div>
  );
};

export default HighlightedText;
