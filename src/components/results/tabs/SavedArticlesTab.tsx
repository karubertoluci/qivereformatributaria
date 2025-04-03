
import React, { useState } from 'react';
import { Article } from '@/data/articles';
import { HighlightType } from '../types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Bookmark } from 'lucide-react';
import ArticleCard from '@/components/ArticleCard';
import ArticleModal from '@/components/article/ArticleModal';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface SavedArticlesTabProps {
  savedArticles: string[];
  onToggleSaveArticle: (articleId: string) => void;
  allArticles: Article[];
  segmentId: string;
  highlights: HighlightType[];
  onAddHighlight: (text: string, color: HighlightType['color'], articleId: string) => void;
  onRemoveHighlight: (id: string) => void;
}

const SavedArticlesTab: React.FC<SavedArticlesTabProps> = ({
  savedArticles,
  onToggleSaveArticle,
  allArticles,
  segmentId,
  highlights,
  onAddHighlight,
  onRemoveHighlight
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Filter saved articles from all articles
  const savedArticlesData = allArticles
    .filter(article => savedArticles.includes(article.id))
    .filter(article => 
      searchTerm === '' || 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      article.simplifiedText.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleOpenArticleModal = (article: Article) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const handleAddHighlightInModal = (text: string, color: HighlightType['color']) => {
    if (selectedArticle) {
      onAddHighlight(text, color, selectedArticle.id);
    }
  };

  return (
    <div className="space-y-8">
      <Card className="border shadow-sm">
        <CardHeader>
          <div className="flex flex-wrap justify-between items-center">
            <CardTitle className="text-xl flex items-center gap-2 text-[#F97316]">
              <Bookmark className="h-6 w-6 text-[#F97316]" />
              Artigos Salvos
              <span className="ml-2 text-sm bg-primary/20 text-primary rounded-full px-2 py-0.5">
                {savedArticlesData.length}
              </span>
            </CardTitle>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar nos artigos salvos..."
                className="pl-8 w-[240px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <CardDescription>
            Acesse rapidamente os artigos que você salvou para referência futura
          </CardDescription>
        </CardHeader>
        <CardContent>
          {savedArticlesData.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              <Bookmark className="h-16 w-16 mx-auto mb-4 opacity-20" />
              <h3 className="text-lg font-medium mb-1">Nenhum artigo salvo</h3>
              <p className="max-w-sm mx-auto">
                Salve artigos importantes para acessá-los rapidamente mais tarde
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedArticlesData.map(article => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  segmentId={segmentId}
                  expanded={false}
                  onToggleExpand={() => {}}
                  highlights={highlights.filter(h => h.articleId === article.id)}
                  isCompactView={true}
                  onOpenModal={() => handleOpenArticleModal(article)}
                  savedArticles={savedArticles}
                  onToggleSaveArticle={onToggleSaveArticle}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <ArticleModal
        article={selectedArticle}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        segmentId={segmentId}
        highlights={highlights.filter(h => selectedArticle && h.articleId === selectedArticle.id)}
        onAddHighlight={handleAddHighlightInModal}
        savedArticles={savedArticles}
        onToggleSaveArticle={onToggleSaveArticle}
      />
    </div>
  );
};

export default SavedArticlesTab;
