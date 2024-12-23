import React from 'react';
import noiva from '../images/noiva.webp';
import noivo from '../images/noivo.webp';
import casal from '../images/casal.webp';
import Divider from "@/app/components/divider";

export default function SobreNos() {
    return (
        <div className="flex flex-col">
            {/* Seção dos Noivos */}
            <section className="flex flex-col items-center justify-center min-h-screen mt-[-5.5rem] p-4 md:p-8 -z-10">
                <h1 className="text-3xl md:text-4xl font-semibold mb-6 text-[#b6b187]" style={{fontFamily: "Italiana"}}>
                    Os Noivos
                </h1>
                <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-8">
                    {/* Imagem do Noivo */}
                    <div className="text-center">
                        <img
                            src={noivo.src}
                            alt="Retrato do Noivo"
                            className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full object-cover border-4 shadow-lg border-[#DAA520]"
                        />
                        <p className="mt-4 text-lg font-bold text-[#b6b187]" style={{fontFamily: "Italiana"}}>Noivo</p>
                    </div>
                    {/* Imagem da Noiva */}
                    <div className="text-center">
                        <img
                            src={noiva.src}
                            alt="Retrato da Noiva"
                            className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full object-cover border-4 border-[#DAA520] shadow-lg"
                        />
                        <p className="mt-4 text-lg font-bold text-[#b6b187]" style={{fontFamily: "Italiana"}}>Noiva</p>
                    </div>
                </div>
                {/* Citação */}
                <div className="w-full px-4 md:px-8 mt-10">
                    <div className="bg-slate-100 bg-opacity-75 p-4 rounded-lg shadow-lg">
                        <p className="text-center text-lg text-[#b6b187]" style={{ fontFamily: 'Italiana' }}>
                            “Foi o Senhor que fez isto, e é maravilhoso aos nossos olhos” <br /> Salmos 118:23
                        </p>
                    </div>
                </div>
            </section>
            {/* Divider */}
            <Divider />
            {/* Seção do Casal */}
            <section className="flex items-center justify-center">
                <img
                    src={casal.src}
                    alt="Casal feliz"
                    className="inset-0 w-full h-full object-cover"
                />
            </section>
        </div>
    );
}
