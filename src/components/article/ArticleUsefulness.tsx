
import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';

interface ArticleUsefulnessProps {
  articleId: string;
}

const ArticleUsefulness: React.FC<ArticleUsefulnessProps> = ({ articleId }) => {
  const [rating, setRating] = useState<'useful' | 'not_useful' | null>(null);
  const [comments, setComments] = useState<string>('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleRate = (newRating: 'useful' | 'not_useful') => {
    if (rating === newRating) {
      setRating(null); // Unselect if clicking the same option
      return;
    }
    
    setRating(newRating);
    
    // If rating as not useful, show feedback dialog
    if (newRating === 'not_useful') {
      setDialogOpen(true);
    } else {
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
    setDialogOpen(false);
  };

  return (
    <>
      <div className="flex items-center gap-1.5">
        <Button 
          variant={rating === 'useful' ? 'default' : 'outline'} 
          size="sm" 
          className="flex items-center gap-1.5"
          onClick={() => handleRate('useful')}
        >
          <ThumbsUp className="h-3.5 w-3.5" />
          Sim, foi útil
        </Button>
        <Button 
          variant={rating === 'not_useful' ? 'default' : 'outline'} 
          size="sm" 
          className="flex items-center gap-1.5"
          onClick={() => handleRate('not_useful')}
        >
          <ThumbsDown className="h-3.5 w-3.5" />
          Não foi útil
        </Button>
      </div>
      
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Como podemos melhorar?</DialogTitle>
            <DialogDescription>
              Seu feedback nos ajuda a melhorar a qualidade das informações apresentadas.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitFeedback}>
            <textarea
              className="w-full p-2 border rounded-md text-sm"
              rows={3}
              placeholder="Como podemos melhorar este conteúdo?"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
            ></textarea>
            <DialogFooter className="mt-4">
              <Button 
                type="submit" 
                disabled={comments.trim().length === 0}
              >
                Enviar feedback
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ArticleUsefulness;
