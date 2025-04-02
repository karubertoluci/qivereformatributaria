
import React, { useState } from 'react';
import { 
  Share2, 
  Mail, 
  Download, 
  Copy, 
  CheckCheck, 
  MessageSquare,
  UserPlus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { BusinessSegment } from '@/data/segments';

interface ReportActionsProps {
  companyData: any;
  segment: BusinessSegment;
}

const ReportActions: React.FC<ReportActionsProps> = ({ companyData, segment }) => {
  const { toast } = useToast();
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    
    toast({
      title: "Link copiado!",
      description: "O link para este relatório foi copiado para a área de transferência.",
    });
    
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    toast({
      title: "Relatório compartilhado!",
      description: `Um link para este relatório foi enviado para ${email}.`,
    });
    setShowShareDialog(false);
    setEmail('');
    setMessage('');
  };

  const handleInvite = () => {
    toast({
      title: "Convite enviado!",
      description: `${email} foi convidado para visualizar este relatório.`,
    });
    setShowInviteDialog(false);
    setEmail('');
  };

  const companyName = companyData?.razaoSocial || companyData?.nomeFantasia || "sua empresa";

  // Dialogs for sharing and inviting users
  return (
    <>
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Compartilhar Relatório</DialogTitle>
            <DialogDescription>
              Envie este relatório sobre a reforma tributária por e-mail.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="email">E-mail</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="email@exemplo.com" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message">Mensagem (opcional)</Label>
              <Textarea 
                id="message" 
                placeholder="Escreva uma mensagem personalizada..." 
                value={message}
                onChange={e => setMessage(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={handleShare} disabled={!email}>Enviar</Button>
          </div>
        </DialogContent>
      </Dialog>
      
      <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Convidar Colaborador</DialogTitle>
            <DialogDescription>
              Convide alguém para visualizar e colaborar com este relatório.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="invite-email">E-mail</Label>
              <Input 
                id="invite-email" 
                type="email" 
                placeholder="email@exemplo.com" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
              />
            </div>
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                O colaborador poderá adicionar comentários e destaques.
              </span>
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={handleInvite} disabled={!email}>Enviar Convite</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ReportActions;
