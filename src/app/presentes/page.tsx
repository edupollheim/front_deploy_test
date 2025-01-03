'use client';
import { useEffect, useState } from 'react';
import PIX from 'react-qrcode-pix';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AlertCircle } from 'lucide-react';

const BACKEND_URL = 'http://192.168.15.10:3001/api';

type Present = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  quantity: number;
};

export default function Home() {
  const [presents, setPresents] = useState<Present[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPresent, setSelectedPresent] = useState<Present | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);

  useEffect(() => {
    const fetchPresents = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/presentes`);
        if (!response.ok) {
          throw new Error('Failed to fetch presents');
        }
        const data = await response.json();
        setPresents(data);
      } catch (error) {
        setError('Erro ao carregar presentes.');
        console.error('Erro ao carregar presentes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPresents();
  }, []);

  const handleGift = (present: Present) => {
    setSelectedPresent(present);
    setPaymentMethod(null);
  };

  const closeGiftCard = () => {
    setSelectedPresent(null);
    setPaymentMethod(null);
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-2xl text-muted-foreground">Carregando...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex items-center gap-2 text-2xl text-destructive">
          <AlertCircle className="h-6 w-6" />
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">Lista de Presentes</h1>
            <p className="text-muted-foreground">Escolha um presente especial para celebrar conosco</p>
          </div>
          
          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {presents.map((present) => (
              <Card key={present.id} className="group hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="space-y-4">
                  <div className="aspect-square w-full overflow-hidden rounded-lg">
                    <img
                      src={present.image}
                      alt={present.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{present.name}</CardTitle>
                    <Badge variant="secondary">
                      {present.quantity} disponível{present.quantity !== 1 ? 'is' : ''}
                    </Badge>
                  </div>
                  <CardDescription className="line-clamp-2">{present.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">
                    R$ {present.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={() => handleGift(present)}
                  >
                    Presentear
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        <Dialog open={!!selectedPresent} onOpenChange={closeGiftCard}>
          <DialogContent className="sm:max-w-md">
            {!paymentMethod ? (
              <>
                <DialogHeader>
                  <DialogTitle>Escolha o método de pagamento</DialogTitle>
                  <DialogDescription>
                    {selectedPresent?.name} - R$ {selectedPresent?.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                  {selectedPresent && (
                    <div className="mb-6 aspect-video w-full overflow-hidden rounded-lg">
                      <img
                        src={selectedPresent.image}
                        alt={selectedPresent.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-4">
                    <Button 
                      variant="outline"
                      className="h-24 space-y-2"
                      onClick={() => setPaymentMethod('PIX')}
                    >
                      <div className="text-2xl">💸</div>
                      <div>PIX</div>
                    </Button>
                    <Button 
                      variant="outline"
                      className="h-24 space-y-2"
                      onClick={() => setPaymentMethod('CREDITO')}
                    >
                      <div className="text-2xl">💳</div>
                      <div>Cartão de Crédito</div>
                    </Button>
                  </div>
                </div>
              </>
            ) : paymentMethod === 'PIX' ? (
              <>
                <DialogHeader>
                  <DialogTitle>QR Code PIX</DialogTitle>
                  <DialogDescription>
                    Escaneie o código para realizar o pagamento
                  </DialogDescription>
                </DialogHeader>
                <ScrollArea className="h-72">
                  <div className="flex justify-center p-4">
                    {selectedPresent && (
                      <PIX
                        pixkey="12171959983"
                        merchant="Eduardo Henrique Pollheim"
                        city="Joinville"
                        cep="89.225-570"
                        code={`CASAMENTO${Date.now()}`}
                        amount={selectedPresent.price}
                      />
                    )}
                  </div>
                </ScrollArea>
                <DialogFooter>
                  <Button variant="ghost" onClick={closeGiftCard}>Fechar</Button>
                </DialogFooter>
              </>
            ) : (
              <>
                <DialogHeader>
                  <DialogTitle>Pagamento com Cartão de Crédito</DialogTitle>
                  <DialogDescription>
                    Para finalizar sua compra, entre em contato através do nosso site
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="ghost" onClick={closeGiftCard}>Fechar</Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}