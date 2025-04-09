
import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { MessageSquare, Send } from 'lucide-react';
import { CommentType } from './types';

interface CommentSectionProps {
  articleId: string;
  comments: CommentType[];
  onAddComment: (text: string) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  articleId,
  comments,
  onAddComment
}) => {
  const [newComment, setNewComment] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };
  
  return (
    <div className="mt-4 space-y-4">
      {comments.length > 0 ? (
        <div className="space-y-3">
          {comments.map(comment => (
            <div key={comment.id} className="bg-secondary/30 p-3 rounded-md">
              <div className="text-sm">{comment.text}</div>
              <div className="text-xs text-gray-500 mt-1">{comment.timestamp}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-sm text-gray-500 italic">Nenhum comentário ainda.</div>
      )}

      <form onSubmit={handleSubmit} className="mt-3">
        <Textarea 
          value={newComment} 
          onChange={e => setNewComment(e.target.value)} 
          placeholder="Adicione um comentário sobre este artigo..." 
          className="mb-2" 
        />
        <Button 
          type="submit" 
          className="flex items-center gap-1" 
          size="sm" 
          disabled={!newComment.trim()}
        >
          <Send size={14} />
          <span>Enviar comentário</span>
        </Button>
      </form>
    </div>
  );
};

export default CommentSection;
