'use client'
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import "./style.css";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";

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
        fetch("https://casamento.pollheim.com.br/api/padrinhos")
            .then((res) => res.json())
            .then((data) => setPadrinhos(data))
            .catch((err) => console.error("Erro ao buscar padrinhos:", err));
    }, []);

    return (
        <>
            <h2 className="text-4xl font-extrabold text-center mb-8 pt-4 text-[#d6b293]">
                Nossos Padrinhos
            </h2>
            <div className="container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
                    {/* Coluna Esquerda: Lista de Padrinhos */}
                    <div className="flex justify-center items-center">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {padrinhos.map((padrinho: any) => (
                                <Card
                                    key={padrinho.id}
                                    onClick={() => handleOpen(padrinho)}
                                    className="cursor-pointer card-custom shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-lg"
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
                                    <CardTitle className="text-center text-sm font-semibold py-2 text-[#d6b293]">
                                        {padrinho.nome}
                                    </CardTitle>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Coluna Direita: Texto de Agradecimento */}
                    <div className="flex flex-col justify-center items-start text-lg leading-relaxed space-y-4 pl-6 pr-6 text-[#d6b293]">
                        <h2 className="text-3xl font-semibold mb-4 text-[#d6b293] text-center">
                            Aos nossos amados padrinhos:
                        </h2>
                        <p className="text-justify">
                            Sentimos muita emoção por ter vocês ao nosso lado e por podermos
                            compartilhar toda a alegria desta nova fase em nossas vidas:
                            nosso casamento! Estamos imensamente gratos por todo o apoio,
                            carinho e amor que sempre nos dedicaram.
                        </p>
                        <p className="text-justify">
                            A presença de vocês torna este momento ainda mais especial e
                            memorável. Queremos que saibam que são parte essencial da nossa
                            história e que cada gesto de vocês ficará eternamente guardado em
                            nossos corações.
                        </p>
                        <p className="text-justify">
                            Vocês são exemplos de amizade, lealdade e companheirismo, e temos
                            a sorte de poder contar com pessoas tão maravilhosas em nossas
                            vidas.
                        </p>
                        <br />
                        <p className="mt-6 font-bold text-xl text-center">Com todo o carinho,</p>
                        <p className="font-bold text-2xl mt-4 text-center text-[#d6b293]">
                            Eduardo & Jéssica
                        </p>
                        <br />
                        <br />
                    </div>
                </div>
            </div>
            <Dialog open={!!selectedPadrinho} onOpenChange={handleClose}>
                <DialogContent className="max-h-4xl p-6">
                    {selectedPadrinho && (
                        <div className="text-center">
                            <h3 className="text-lg font-bold">{selectedPadrinho.nome}</h3>
                            <Image
                                src={selectedPadrinho.base64Foto}
                                alt={selectedPadrinho.nome}
                                width={300}
                                height={900}
                                className="mx-auto w-full object-contain rounded-t-lg border-2 border-[#d6b293] p-1 rounded-lg"
                            />
                            <p className="mx-auto w-full object-contain rounded-t-lg border-2 border-[#d6b293] p-1 rounded-lg mt-2">{selectedPadrinho.descricao}</p>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}