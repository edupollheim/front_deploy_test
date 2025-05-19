'use client';
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MessageSquare, Send, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";


type Message = {
    id: number;
    name: string;
    message: string;
    createdAt: string;
};
const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001/api';

const Guestbook = () => {
    const [name, setName] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const { toast } = useToast();

    const loadMessages = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${BACKEND_URL}/recados`);
            if (!response.ok) throw new Error("Erro ao carregar as mensagens.");
            const data = await response.json();
            setMessages(data);
            setError(null);
        } catch (err) {
            setError(`Erro ao carregar mensagens. ${(err as Error).message}`);
            toast({
                title: "Erro",
                description: "Não foi possível carregar as mensagens.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsSubmitting(true);

        if (name && message) {
            try {
                const response = await fetch(`${BACKEND_URL}/recados`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ name, message }),
                });

                if (!response.ok) throw new Error("Erro ao enviar mensagem.");

                setName("");
                setMessage("");
                loadMessages();
                toast({
                    title: "Sucesso!",
                    description: "Sua mensagem foi enviada com sucesso.",
                });
            } catch (err) {
                setError("Erro ao enviar sua mensagem.");
                toast({
                    title: "Erro",
                    description: "Não foi possível enviar sua mensagem.",
                    variant: "destructive",
                });
            } finally {
                setIsSubmitting(false);
            }
        } else {
            setError("Por favor, preencha todos os campos.");
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        loadMessages();
    }, []);

    return (
        <div className="bg-[#fffaf6]">
            <div className="max-w-3xl mx-auto space-y-8 py-8 min-h-screen bg-[#fffaf6]">
                <Card className="border-none shadow-lg border border-gray-200 bg-white">
                    <CardHeader>
                        <CardTitle className="text-[4rem] lg:text-[5rem] font-thin text-center flex items-center justify-center gap-2 text-[#d6b293] letter" style={{ fontFamily: "Luxurious Script" }}>
                            Livro de Recados
                        </CardTitle>
                        <p className="text-muted-foreground font-thin text-center" style={{ fontFamily: 'Inter' }}>
                            Deixe aqui seu recado para os noivos!💌
                        </p>
                    </CardHeader>
                    <CardContent>
                        {error && (
                            <Alert variant="destructive" className="mb-6">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-thin font-['Inter']">
                                    Seu nome:
                                </label>
                                <Input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Digite seu nome"
                                    required
                                    className="w-full font-thin font-['Inter'] border border-gray-200 text-black"
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-thin font-['Inter']">
                                    Sua mensagem:
                                </label>
                                <Textarea
                                    id="message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Escreva seu recado..."
                                    required
                                    className="w-full min-h-[120px] font-thin font-['Inter'] border border-gray-200 text-black"
                                    disabled={isSubmitting}
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full md:w-auto font-light font-['Inter'] hover:bg-gray-200"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Enviando...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4 mr-2" />
                                        Enviar Recado
                                    </>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-lg border border-gray-200 bg-white">
                    <CardHeader>
                        <CardTitle className="text-2xl font-thin font-['Inter'] text-[#d6b293]">
                            Recados Recentes
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <div className="flex items-center justify-center py-8">
                                <Loader2 className="w-8 h-8 animate-spin text-[#d6b293]" />
                            </div>
                        ) : messages.length === 0 ? (
                            <div className="text-center py-8 text-gray-500  font-thin font-['Inter']">
                                <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-20" />
                                <p>Nenhum recado por enquanto...</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {messages.map((msg) => (
                                    <Card key={msg.id} className="border-none transition-colors bg-gray-100 hover:bg-gray-200 hover:cursor-pointer">
                                        <CardContent className="p-4">
                                            <div className="flex items-start justify-between">
                                                <h3 className="font-semibold text-gray-500">{msg.name}</h3>
                                                <time className="text-sm text-gray-500">
                                                    {new Date(msg.createdAt).toLocaleDateString()}
                                                </time>
                                            </div>
                                            <p className="mt-2  whitespace-pre-wrap text-gray-500">{msg.message}</p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Guestbook;