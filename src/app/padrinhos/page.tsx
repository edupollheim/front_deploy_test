import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import "./style.css";

const padrinhos = [
    { id: 1, nome: "Padrinho 1", foto: "https://via.placeholder.com/150" },
    { id: 2, nome: "Padrinho 2", foto: "https://via.placeholder.com/150" },
    { id: 3, nome: "Padrinho 3", foto: "https://via.placeholder.com/150" },
    { id: 4, nome: "Padrinho 4", foto: "https://via.placeholder.com/150" },
    { id: 5, nome: "Padrinho 5", foto: "https://via.placeholder.com/150" },
    { id: 6, nome: "Padrinho 6", foto: "https://via.placeholder.com/150" },
    { id: 7, nome: "Padrinho 7", foto: "https://via.placeholder.com/150" },
    { id: 8, nome: "Padrinho 8", foto: "https://via.placeholder.com/150" },
    { id: 9, nome: "Padrinho 9", foto: "https://via.placeholder.com/150" },
    { id: 10, nome: "Padrinho 10", foto: "https://via.placeholder.com/150" },
];

export default function Padrinhos() {
    return (
        <>
            <h2 className="text-4xl font-extrabold text-center text-primary mb-8 pt-4">Nossos Padrinhos</h2>
            <div className="container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
                    {/* Coluna Esquerda: Lista de Padrinhos */}
                    <div className="flex justify-center items-center">
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                            {padrinhos.map((padrinho) => (
                                <Card key={padrinho.id} className="card-custom shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-lg">
                                    <CardHeader>
                                        <img
                                            src={padrinho.foto}
                                            alt={padrinho.nome}
                                            className="w-full h-32 md:h-40 object-cover rounded-t-lg"
                                        />
                                    </CardHeader>
                                    <CardTitle className="text-center text-sm font-semibold py-2">{padrinho.nome}</CardTitle>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Coluna Direita: Texto de Agradecimento */}
                    <div className="flex flex-col justify-center items-start text-lg leading-relaxed text-gray-800 space-y-4 pl-6 pr-6">
                        <h2 className="text-3xl font-semibold mb-4 text-primary text-center">Aos nossos amados padrinhos:</h2>
                        <p className="text-justify">
                            Sentimos muita emoção por ter vocês ao nosso lado e por podermos compartilhar toda a alegria desta nova fase em nossas vidas: nosso casamento! Estamos imensamente gratos por todo o apoio, carinho e amor que sempre nos dedicaram.
                        </p>
                        <p className="text-justify">
                            A presença de vocês torna este momento ainda mais especial e memorável. Queremos que saibam que são parte essencial da nossa história e que cada gesto de vocês ficará eternamente guardado em nossos corações.
                        </p>
                        <p className="text-justify">
                            Vocês são exemplos de amizade, lealdade e companheirismo, e temos a sorte de poder contar com pessoas tão maravilhosas em nossas vidas.
                        </p>
                        <br />
                        <p className="mt-6 font-bold text-xl text-center">Com todo o carinho,</p>
                        <p className="font-bold text-2xl mt-4 text-primary text-center">Eduardo & Jéssica</p>
                        <br />
                        <br />
                    </div>
                </div>
            </div>
        </>
    );
}
