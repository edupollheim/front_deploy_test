'use client';
import { useEffect, useState } from 'react';
import PIX from 'react-qrcode-pix';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AlertCircle, Loader } from 'lucide-react';
import 'dotenv/config';

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001/api';

interface Present {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  cc: string;
}

export default function Home() {
  const [presents, setPresents] = useState<Present[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPresent, setSelectedPresent] = useState<Present | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);

  useEffect(() => {
    const fetchPresents = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/presentes`);
        if (!response.ok) {
          throw new Error('Erro ao buscar presentes.');
        }
        const data: Present[] = await response.json();
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

  const handleCreditCardPayment = async () => {
    if (!selectedPresent) return;
    window.location.href = selectedPresent.cc;
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center text-destructive">
        <AlertCircle className="h-6 w-6" /> {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fffaf6]">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-[4rem] lg:text-[6rem] font-light tracking-tight text-[#d6b293] letter" style={{ fontFamily: 'Luxurious Script' }}>
              Lista de Presentes
            </h1>
            <p
              className="text-muted-foreground font-light max-w-xl mx-auto text-center"
              style={{ fontFamily: 'Inter' }}
            >
              Caso queira nos presentear, preferimos contribuições em dinheiro.
              Você também pode escolher um dos itens da nossa lista simbólica: todos os "presentes" serão convertidos em valor para nós, e podem ser pagos via Pix, cartão de crédito ou em dinheiro.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {presents.map((present) => (
              <Card key={present.id} className="group hover:shadow-lg transition-shadow duration-200 bg-white border border-gray-200 shadow-lg hover:shadow-xl">
                <CardHeader>
                  <div className="aspect-square w-full overflow-hidden rounded-lg">
                    <img src={present.image} alt={present.name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  </div>
                  <CardTitle className="text-xl text-[#637c8b]">{present.name}</CardTitle>
                  <CardDescription className="font-['Inter'] font-light text-[#637c8b]">{present.description}</CardDescription>
                </CardHeader>
                <CardContent className='text-[#637c8b]'>
                  <div className="text-2xl font-bold]">
                    R$ {present.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full font-light font-['Inter'] text-[#637c8b] hover:bg-gray-200" size="lg" onClick={() => setSelectedPresent(present)}>
                    Presentear
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
        <Dialog open={!!selectedPresent} onOpenChange={() => setSelectedPresent(null)}>
          <DialogContent className="sm:max-w-md">
            {!paymentMethod ? (
              <>
                <DialogHeader>
                  <DialogTitle>Escolha o método de pagamento</DialogTitle>
                  <DialogDescription>
                    {selectedPresent?.name} - R$ {selectedPresent?.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-24 space-y-2" onClick={() => setPaymentMethod('PIX')}>
                    💸 PIX
                  </Button>
                  <Button variant="outline" className="h-24 space-y-2" onClick={() => setPaymentMethod('CREDITO')}>
                    💳 Cartão
                  </Button>
                </div>
              </>
            ) : paymentMethod === 'PIX' ? (
              <>
                <DialogHeader>
                  <DialogTitle>QR Code PIX</DialogTitle>
                </DialogHeader>
                <ScrollArea className="h-72 flex justify-center p-4">
                  {selectedPresent && (
                    <PIX pixkey="12171959983" merchant="Eduardo Henrique Pollheim" city="Joinville" cep="89.225-570" code={`CASAMENTO${Date.now()}`} amount={selectedPresent.price} />
                  )}
                </ScrollArea>
                <DialogFooter>
                  <Button variant="ghost" onClick={() => setSelectedPresent(null)}>
                    Fechar
                  </Button>
                </DialogFooter>
              </>
            ) : (
              <>
                <DialogHeader>
                  <DialogTitle>Pagamento com Cartão</DialogTitle>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="default" onClick={handleCreditCardPayment}>
                    Ir para pagamento
                  </Button>
                  <Button variant="ghost" onClick={() => setSelectedPresent(null)}>
                    Fechar
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
