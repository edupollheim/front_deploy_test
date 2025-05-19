'use client'
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import "./style.css";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001/api';


export default function Padrinhos() {
    const [padrinhos, setPadrinhos] = useState([]);
    const [selectedPadrinho, setSelectedPadrinho] = useState<any>(null);

    const handleOpen = (padrinho: any) => {
        setSelectedPadrinho(padrinho);
    };

    const handleClose = () => {
        setSelectedPadrinho(null);
    };

    useEffect(() => {
        fetch(`${BACKEND_URL}/padrinhos`)
            .then((res) => res.json())
            .then((data) => setPadrinhos(data))
            .catch((err) => console.error("Erro ao buscar padrinhos:", err));
    }, []);

    return (
        <div className="bg-[#f5f1ee] min-h-screen">
            <h2 className="text-[4rem] lg:text-[6rem] font-thin text-center mb-8 pt-4 text-[#d6b293] letter" style={{ fontFamily: "'Luxurious Script'" }}>
                Nossos Padrinhos
            </h2>
            <div className="container mx-auto max-w-5xl px-4">
                <div className="grid grid-cols-1 lg:grid-cols-1 gap-24">
                    <div className="flex justify-center items-center">
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 w-full">
                            {padrinhos.map((padrinho: any) => (
                                <Card
                                    key={padrinho.id}
                                    onClick={() => handleOpen(padrinho)}
                                    className="cursor-pointer shadow-lg hover:shadow-xl transition duration-300 rounded-lg bg-[#fff8f2] border border-gray-200"
                                >
                                    <CardHeader>
                                        <Image
                                            src={padrinho.base64Foto}
                                            alt={padrinho.nome}
                                            width={400}
                                            height={300}
                                            className="w-full h-32 md:h-40 object-cover rounded-t-lg"
                                        />
                                    </CardHeader>
                                    <CardTitle className="text-center text-sm font-semibold py-2 text-[#d6b293]" style={{ fontFamily: "'Inter'" }}>
                                        {padrinho.nome}
                                    </CardTitle>
                                </Card>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center text-lg leading-tight space-y-4 px-0 text-[#637c8b] font['Inter'] font-thin" style={{ fontFamily: "'Inter'", fontWeight: 200 }}>
                        <h2 className="text-6xl mb-4 text-[#d6b293] text-center" style={{ fontWeight: 600, fontFamily: "'Luxurious Script'" }}>
                            Aos nossos amados padrinhos:
                        </h2>
                        <p className="text-center max-w-xl">
                            Sentimos muita emoção por ter vocês ao nosso lado e por podermos compartilhar toda a alegria desta nova fase em nossas vidas: nosso casamento!
                        </p>
                        <p className="text-center max-w-xl">
                            A presença de vocês torna este momento ainda mais especial e memorável. Queremos que saibam que são parte essencial da nossa história.
                        </p>
                        <p className="text-center max-w-xl">
                            Vocês são exemplos de amizade, lealdade e companheirismo, e temos a sorte de contar com pessoas tão maravilhosas em nossas vidas.
                        </p>
                        <p className="mt-6 font-bold text-xl text-center text-[#d6b293]" style={{ fontWeight: 600 }}>
                            Com todo o carinho,
                        </p>
                        <p className="font-thin text-[3rem] mt-4 text-center text-[#d6b293]" style={{ fontFamily: "'Luxurious Script'" }}>
                            Eduardo & Jéssica
                        </p>
                    </div>
                </div>
            </div>
            <Dialog open={!!selectedPadrinho} onOpenChange={handleClose}>
                <DialogContent className="max-h-4xl p-6 bg-[#fff8f2] border border-gray-200">
                    {selectedPadrinho && (
                        <div className="text-center">
                            <h3 className="text-lg font-bold text-[#d6b293]">{selectedPadrinho.nome}</h3>
                            <Image
                                src={selectedPadrinho.base64Foto}
                                alt={selectedPadrinho.nome}
                                width={300}
                                height={900}
                                className="mx-auto w-full object-contain rounded-lg border-2 border-gray-200 p-1"
                            />
                            <p className="mt-2 text-[#637c8b]">{selectedPadrinho.descricao}</p>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
