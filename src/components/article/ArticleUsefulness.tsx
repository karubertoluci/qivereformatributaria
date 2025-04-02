
import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface ArticleUsefulnessProps {
  articleId: string;
}

const ArticleUsefulness: React.FC<ArticleUsefulnessProps> = ({ articleId }) => {
  const [rating, setRating] = useState<'useful' | 'not_useful' | null>(null);
  const [comments, setComments] = useState<string>('');
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const { toast } = useToast();

  const handleRate = (newRating: 'useful' | 'not_useful') => {
    if (rating === newRating) {
      setRating(null); // Unselect if clicking the same option
      return;
    }
    
    setRating(newRating);
    
    // If rating as not useful, show feedback form
    if (newRating === 'not_useful') {
      setShowFeedbackForm(true);
    } else {
      // If changing from not useful to useful, hide form
      setShowFeedbackForm(false);
      
      toast({
        title: "Obrigado pelo feedback!",
        description: "Sua avaliação nos ajuda a melhorar as informações."
      });
    }
  };
  
  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would send the feedback to your backend
    toast({
      title: "Feedback enviado",
      description: "Agradecemos suas sugestões para melhorar este conteúdo."
    });
    
    setComments('');
    setShowFeedbackForm(false);
  };

  return (
    <div className="mt-4 pt-4 border-t border-border">
      <h4 className="text-sm font-medium mb-2">Este artigo foi útil para você?</h4>
      
      <div className="flex items-center gap-3">
        <Button 
          variant={rating === 'useful' ? 'default' : 'outline'} 
          size="sm" 
          className="flex items-center gap-2"
          onClick={() => handleRate('useful')}
        >
          <ThumbsUp className="h-4 w-4" />
          Sim, foi útil
        </Button>
        <Button 
          variant={rating === 'not_useful' ? 'default' : 'outline'} 
          size="sm" 
          className="flex items-center gap-2"
          onClick={() => handleRate('not_useful')}
        >
          <ThumbsDown className="h-4 w-4" />
          Não foi útil
        </Button>
      </div>
      
      {showFeedbackForm && (
        <form onSubmit={handleSubmitFeedback} className="mt-3">
          <textarea
            className="w-full p-2 border rounded-md text-sm"
            rows={3}
            placeholder="Como podemos melhorar este conteúdo?"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          ></textarea>
          <div className="mt-2 flex justify-end">
            <Button 
              type="submit" 
              size="sm"
              disabled={comments.trim().length === 0}
            >
              Enviar feedback
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ArticleUsefulness;
