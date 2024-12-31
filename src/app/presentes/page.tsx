'use client';

// Importação de hooks do React para gerenciamento de estado, efeitos colaterais e referência a elementos DOM
import { useEffect, useState, useRef } from 'react';
// Biblioteca para realizar chamadas HTTP
import axios from 'axios';
// Importação de componentes de UI para estilizar os cartões
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
// Biblioteca para gerar QR Codes para pagamentos PIX
import PIX from "react-qrcode-pix";

// URL base do backend para chamadas à API
const BACKEND_URL = 'http://localhost:3001';

// Tipagem para os dados de presentes
type Present = {
    id: number; // ID único do presente
    name: string; // Nome do presente
    category: string; // Categoria do presente
    estimatedValue: number; // Valor estimado do presente
    status: string; // Status do presente (ex.: disponível, reservado, etc.)
    quantity: number; // Quantidade disponível
};

// Componente principal
export default function Home() {
    // Estados para armazenar os presentes, status de carregamento, erro, presente selecionado e método de pagamento
    const [presents, setPresents] = useState<Present[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedPresent, setSelectedPresent] = useState<Present | null>(null);
    const [paymentMethod, setPaymentMethod] = useState<string | null>(null);

    // Referência para o cartão modal, usado para detectar cliques fora dele
    const cardRef = useRef<HTMLDivElement>(null);

    // Efeito para carregar os presentes ao montar o componente
    useEffect(() => {
        const fetchPresents = async () => {
            try {
                // Requisição para buscar a lista de presentes no backend
                const response = await axios.get(`${BACKEND_URL}/presentes`);
                setPresents(response.data); // Atualiza o estado com os dados recebidos
            } catch (error) {
                // Trata erros de carregamento
                setError('Erro ao carregar presentes.');
                console.error('Erro ao carregar presentes:', error);
            } finally {
                setLoading(false); // Define o carregamento como concluído
            }
        };

        // Chamada à função de carregamento de presentes
        fetchPresents().then(r => r);
    }, []);

    // Função para selecionar um presente
    const handleGift = (present: Present) => {
        setSelectedPresent(present); // Define o presente selecionado
        setPaymentMethod(null); // Reseta o método de pagamento
    };

    // Função para selecionar o método de pagamento
    const selectPaymentMethod = (method: string) => {
        setPaymentMethod(method); // Atualiza o estado com o método selecionado
    };

    // Função para fechar o modal do presente
    const closeGiftCard = () => {
        setSelectedPresent(null); // Reseta o presente selecionado
        setPaymentMethod(null); // Reseta o método de pagamento
    };

    // Efeito para detectar cliques fora do modal e fechá-lo
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
                closeGiftCard(); // Fecha o modal ao clicar fora
            }
        };

        if (selectedPresent) {
            // Adiciona o evento somente quando um presente está selecionado
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            // Remove o evento ao desmontar ou quando o presente é deselecionado
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [selectedPresent]);

    // Renderização da tela de carregamento, erro ou lista de presentes
    if (loading) return <div className="text-center text-xl text-gray-700">Carregando...</div>;
    if (error) return <div className="text-center text-xl text-red-500">{error}</div>;

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-3xl font-semibold text-center mb-6">Lista de Presentes de Casamento</h1>

            {/* Lista de presentes exibida em um layout de grade */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {presents.map((present) => (
                    <Card key={present.id}>
                        <CardContent>
                            <CardTitle>{present.name}</CardTitle>
                            <CardDescription>{present.category}</CardDescription>
                            <p>Valor Estimado: R$ {present.estimatedValue}</p>
                            <p>Status: {present.status}</p>
                            <p>Quantidade: {present.quantity}</p>

                            <button
                                onClick={() => handleGift(present)}
                                className="px-4 py-2 mt-4 bg-green-600 text-white rounded-lg hover:bg-green-700"
                            >
                                Presentear
                            </button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Modal para presente selecionado */}
            {selectedPresent && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div ref={cardRef} className="bg-gray-700 rounded-lg shadow-lg p-6 max-w-sm w-full">
                        {/* Exibição da escolha do método de pagamento */}
                        {!paymentMethod ? (
                            <>
                                <h2 className="text-2xl font-semibold text-center mb-4">
                                    Escolha o Método de Pagamento
                                </h2>
                                <div className="flex justify-around">
                                    <button
                                        onClick={() => selectPaymentMethod('PIX')}
                                        className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
                                    >
                                        PIX
                                    </button>
                                    <button
                                        onClick={() => selectPaymentMethod('CREDITO')}
                                        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                                    >
                                        Crédito
                                    </button>
                                </div>
                            </>
                        ) : paymentMethod === 'PIX' ? (
                            // Exibição do QR Code para pagamento via PIX
                            <>
                                <h2 className="text-2xl font-semibold text-center mb-4">
                                    QR Code para {selectedPresent.name}
                                </h2>
                                <div className="flex justify-center">
                                    <PIX
                                        pixkey="12171959983" // Chave PIX do recebedor
                                        merchant="Eduardo Henrique Pollheim" // Nome do recebedor
                                        city="Joinville" // Cidade
                                        cep="89.225-570" // CEP
                                        code={`CASAMENTO` + Date.now()} // Código único
                                        amount={selectedPresent.estimatedValue} // Valor do presente
                                    />
                                </div>
                                <button
                                    onClick={closeGiftCard}
                                    className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                                >
                                    Fechar
                                </button>
                            </>
                        ) : (
                            // Instruções para pagamento via crédito
                            <>
                                <h2 className="text-2xl font-semibold text-center mb-4">
                                    Pagamento via Crédito
                                </h2>
                                <p className="text-center mb-4">
                                    Para concluir o pagamento, entre em contato pelo nosso site.
                                </p>
                                <button
                                    onClick={closeGiftCard}
                                    className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                                >
                                    Fechar
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
