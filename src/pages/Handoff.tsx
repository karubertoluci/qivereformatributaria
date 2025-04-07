
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Info, ArrowRight, ChevronRight, Book, FileText, Highlighter } from 'lucide-react';

const Handoff = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Handoff - Componentes Qive</h1>
        <p className="text-muted-foreground">
          Esta página reúne todos os componentes utilizados na aplicação Qive para facilitar a implementação pela equipe de engenharia.
        </p>
      </div>

      <Tabs defaultValue="buttons">
        <TabsList className="w-full justify-start mb-8 flex-wrap">
          <TabsTrigger value="buttons">Botões</TabsTrigger>
          <TabsTrigger value="cards">Cards</TabsTrigger>
          <TabsTrigger value="inputs">Inputs</TabsTrigger>
          <TabsTrigger value="navigation">Navegação</TabsTrigger>
          <TabsTrigger value="charts">Gráficos</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
          <TabsTrigger value="layout">Layout</TabsTrigger>
        </TabsList>

        {/* Buttons Section */}
        <TabsContent value="buttons" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Botões</CardTitle>
              <CardDescription>Variações de botões utilizadas na aplicação Qive.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Botões Primários</h3>
                <div className="flex flex-wrap gap-4">
                  <Button>Botão Padrão</Button>
                  <Button variant="secondary">Botão Secundário</Button>
                  <Button variant="destructive">Botão Destrutivo</Button>
                  <Button variant="outline">Botão Outline</Button>
                  <Button variant="ghost">Botão Ghost</Button>
                </div>
                <pre className="bg-muted p-4 rounded-md mt-4 overflow-x-auto">
                  {'<Button>Botão Padrão</Button>\n<Button variant="secondary">Botão Secundário</Button>\n<Button variant="destructive">Botão Destrutivo</Button>\n<Button variant="outline">Botão Outline</Button>\n<Button variant="ghost">Botão Ghost</Button>'}
                </pre>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Botões com Ícones</h3>
                <div className="flex flex-wrap gap-4">
                  <Button>
                    <ArrowRight className="mr-2 h-4 w-4" />
                    Botão com Ícone
                  </Button>
                  <Button variant="outline">
                    Botão com Ícone
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <pre className="bg-muted p-4 rounded-md mt-4 overflow-x-auto">
                  {'<Button>\n  <ArrowRight className="mr-2 h-4 w-4" />\n  Botão com Ícone\n</Button>\n\n<Button variant="outline">\n  Botão com Ícone\n  <ChevronRight className="ml-2 h-4 w-4" />\n</Button>'}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Cards Section */}
        <TabsContent value="cards" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Cards</CardTitle>
              <CardDescription>Exemplos de cards utilizados na aplicação.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Card Padrão</CardTitle>
                      <CardDescription>Descrição do card</CardDescription>
                    </CardHeader>
                    <CardContent>
                      Conteúdo do card com texto e outros elementos.
                    </CardContent>
                  </Card>
                  
                  <pre className="bg-muted p-4 rounded-md mt-4 overflow-x-auto">
                    {'<Card>\n  <CardHeader>\n    <CardTitle>Card Padrão</CardTitle>\n    <CardDescription>Descrição do card</CardDescription>\n  </CardHeader>\n  <CardContent>\n    Conteúdo do card com texto e outros elementos.\n  </CardContent>\n</Card>'}
                  </pre>
                </div>

                <div>
                  <Card className="border-primary">
                    <CardHeader className="bg-primary/10">
                      <CardTitle>Card com Destaque</CardTitle>
                      <CardDescription>Card com borda e fundo especial</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4">
                      Conteúdo do card com borda destacada.
                    </CardContent>
                  </Card>
                  
                  <pre className="bg-muted p-4 rounded-md mt-4 overflow-x-auto">
                    {'<Card className="border-primary">\n  <CardHeader className="bg-primary/10">\n    <CardTitle>Card com Destaque</CardTitle>\n    <CardDescription>Card com borda e fundo especial</CardDescription>\n  </CardHeader>\n  <CardContent className="pt-4">\n    Conteúdo do card com borda destacada.\n  </CardContent>\n</Card>'}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Inputs Section */}
        <TabsContent value="inputs" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Inputs</CardTitle>
              <CardDescription>Elementos de formulário utilizados na aplicação.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Input de Texto</h3>
                <div className="grid gap-4 max-w-md">
                  <Input placeholder="Input padrão" />
                  <Input placeholder="Input desabilitado" disabled />
                </div>
                <pre className="bg-muted p-4 rounded-md mt-4 overflow-x-auto">
                  {'<Input placeholder="Input padrão" />\n<Input placeholder="Input desabilitado" disabled />'}
                </pre>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Checkbox</h3>
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Aceitar termos e condições
                  </label>
                </div>
                <pre className="bg-muted p-4 rounded-md mt-4 overflow-x-auto">
                  {'<div className="flex items-center space-x-2">\n  <Checkbox id="terms" />\n  <label\n    htmlFor="terms"\n    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"\n  >\n    Aceitar termos e condições\n  </label>\n</div>'}
                </pre>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Switch</h3>
                <div className="flex items-center space-x-2">
                  <Switch id="airplane-mode" />
                  <label
                    htmlFor="airplane-mode"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Modo avião
                  </label>
                </div>
                <pre className="bg-muted p-4 rounded-md mt-4 overflow-x-auto">
                  {'<div className="flex items-center space-x-2">\n  <Switch id="airplane-mode" />\n  <label\n    htmlFor="airplane-mode"\n    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"\n  >\n    Modo avião\n  </label>\n</div>'}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Navigation Section */}
        <TabsContent value="navigation" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Elementos de Navegação</CardTitle>
              <CardDescription>Componentes de navegação utilizados na interface.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Tabs</h3>
                <Tabs defaultValue="account" className="w-full max-w-md">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="account">Conta</TabsTrigger>
                    <TabsTrigger value="password">Senha</TabsTrigger>
                    <TabsTrigger value="settings">Configurações</TabsTrigger>
                  </TabsList>
                  <TabsContent value="account" className="p-4 border rounded-md mt-2">
                    Conteúdo da aba Conta
                  </TabsContent>
                  <TabsContent value="password" className="p-4 border rounded-md mt-2">
                    Conteúdo da aba Senha
                  </TabsContent>
                  <TabsContent value="settings" className="p-4 border rounded-md mt-2">
                    Conteúdo da aba Configurações
                  </TabsContent>
                </Tabs>
                <pre className="bg-muted p-4 rounded-md mt-4 overflow-x-auto">
                  {'<Tabs defaultValue="account" className="w-full max-w-md">\n  <TabsList className="grid w-full grid-cols-3">\n    <TabsTrigger value="account">Conta</TabsTrigger>\n    <TabsTrigger value="password">Senha</TabsTrigger>\n    <TabsTrigger value="settings">Configurações</TabsTrigger>\n  </TabsList>\n  <TabsContent value="account" className="p-4 border rounded-md mt-2">\n    Conteúdo da aba Conta\n  </TabsContent>\n  <TabsContent value="password" className="p-4 border rounded-md mt-2">\n    Conteúdo da aba Senha\n  </TabsContent>\n  <TabsContent value="settings" className="p-4 border rounded-md mt-2">\n    Conteúdo da aba Configurações\n  </TabsContent>\n</Tabs>'}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Charts Section */}
        <TabsContent value="charts" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Gráficos</CardTitle>
              <CardDescription>Exemplos de gráficos e visualizações de dados.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Barra de Progresso</h3>
                  <Progress value={60} className="w-full" />
                  <pre className="bg-muted p-4 rounded-md mt-4 overflow-x-auto">
                    {'<Progress value={60} className="w-full" />'}
                  </pre>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">Utilização de Recharts</h3>
                  <p>Os gráficos do projeto utilizam a biblioteca Recharts. Veja exemplos em:</p>
                  <ul className="list-disc list-inside pl-4 space-y-1 mt-2">
                    <li>FavorabilityRelevanceChart.tsx</li>
                    <li>ArticleImportanceChart.tsx</li>
                    <li>ArticlesPriorityChart.tsx</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Feedback Section */}
        <TabsContent value="feedback" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Elementos de Feedback</CardTitle>
              <CardDescription>Componentes para fornecer feedback ao usuário.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Badges</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge>Padrão</Badge>
                  <Badge variant="secondary">Secundário</Badge>
                  <Badge variant="destructive">Destrutivo</Badge>
                  <Badge variant="outline">Outline</Badge>
                </div>
                <pre className="bg-muted p-4 rounded-md mt-4 overflow-x-auto">
                  {'<Badge>Padrão</Badge>\n<Badge variant="secondary">Secundário</Badge>\n<Badge variant="destructive">Destrutivo</Badge>\n<Badge variant="outline">Outline</Badge>'}
                </pre>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Alertas com Ícones</h3>
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 flex items-start">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-800">Atenção</h4>
                    <p className="text-yellow-700 text-sm">Este é um alerta de advertência com ícone.</p>
                  </div>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-md p-4 flex items-start mt-2">
                  <Info className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-800">Informação</h4>
                    <p className="text-blue-700 text-sm">Este é um alerta informativo com ícone.</p>
                  </div>
                </div>
                
                <pre className="bg-muted p-4 rounded-md mt-4 overflow-x-auto">
                  {'<div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 flex items-start">\n  <AlertTriangle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />\n  <div>\n    <h4 className="font-medium text-yellow-800">Atenção</h4>\n    <p className="text-yellow-700 text-sm">Este é um alerta de advertência com ícone.</p>\n  </div>\n</div>\n\n<div className="bg-blue-50 border border-blue-200 rounded-md p-4 flex items-start mt-2">\n  <Info className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />\n  <div>\n    <h4 className="font-medium text-blue-800">Informação</h4>\n    <p className="text-blue-700 text-sm">Este é um alerta informativo com ícone.</p>\n  </div>\n</div>'}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Layout Section */}
        <TabsContent value="layout" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Elementos de Layout</CardTitle>
              <CardDescription>Componentes estruturais utilizados na aplicação.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Separador</h3>
                <div className="py-4">
                  <div>Texto acima do separador</div>
                  <Separator className="my-4" />
                  <div>Texto abaixo do separador</div>
                </div>
                <pre className="bg-muted p-4 rounded-md mt-4 overflow-x-auto">
                  {'<div>Texto acima do separador</div>\n<Separator className="my-4" />\n<div>Texto abaixo do separador</div>'}
                </pre>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Tabs de Navegação (ResultsContainer)</h3>
                <div className="border rounded-md p-4">
                  <div className="flex space-x-2 justify-center border-b pb-2">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-md bg-muted">
                      <FileText className="h-4 w-4" /> Visão Geral
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2">
                      <Book className="h-4 w-4" /> Artigos e Impactos
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2">
                      <Highlighter className="h-4 w-4" /> Meus Destaques
                    </div>
                  </div>
                  <div className="p-4">
                    Conteúdo da aba selecionada
                  </div>
                </div>
                <pre className="bg-muted p-4 rounded-md mt-4 overflow-x-auto">
                  {'<Tabs defaultValue="overview" className="w-full">\n  <TabsList className="mb-6 flex justify-center w-full">\n    <TabsTrigger value="overview" className="flex items-center gap-2">\n      <FileText className="h-4 w-4" /> Visão Geral\n    </TabsTrigger>\n    <TabsTrigger value="articles" className="flex items-center gap-2">\n      <Book className="h-4 w-4" /> Artigos e Impactos\n    </TabsTrigger>\n    <TabsTrigger value="highlights" className="flex items-center gap-2">\n      <Highlighter className="h-4 w-4" /> Meus Destaques\n    </TabsTrigger>\n  </TabsList>\n  <TabsContent value="overview">\n    {/* Conteúdo da aba */}\n  </TabsContent>\n</Tabs>'}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Handoff;
