
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

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-6 flex flex-wrap items-center justify-between gap-4">
      <div>
        <h2 className="text-xl font-bold">
          Relatório Personalizado: Reforma Tributária
        </h2>
        <p className="text-sm text-muted-foreground">
          Análise de impactos para {companyName} no segmento {segment.name}
        </p>
      </div>
      
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              <span className="hidden sm:inline">Compartilhar</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem onClick={() => setShowShareDialog(true)}>
              <Mail className="mr-2 h-4 w-4" />
              <span>Por e-mail</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleCopyLink}>
              {copied ? (
                <CheckCheck className="mr-2 h-4 w-4 text-green-600" />
              ) : (
                <Copy className="mr-2 h-4 w-4" />
              )}
              <span>Copiar link</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setShowInviteDialog(true)}>
              <UserPlus className="mr-2 h-4 w-4" />
              <span>Convidar colaborador</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button variant="default" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">Baixar PDF</span>
        </Button>
      </div>
      
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
    </div>
  );
};

export default ReportActions;
