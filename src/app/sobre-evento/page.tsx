'use client'

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SobreEvento = () => {
    const openGoogleMaps = () => {
        window.open(
            'https://maps.app.goo.gl/NNrbXGPsFADVTRaw6', 
            '_blank',
            'noopener,noreferrer'
        );
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid md:grid-cols-2 gap-8">
                {/* Left Column: Event Details */}
                <Card className="bg-white shadow-lg rounded-lg overflow-hidden h-full">
                    <CardHeader className="bg-gray-50 border-b">
                        <CardTitle className="text-2xl font-bold text-[#a674c2] font-thin text-[3rem]" style={{ fontFamily: "'Fleur De Leah'" }}>
                            Cerimônia e Recepção
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4 font-['Inter'] font-thin">
                        <div className="text-[#844fa0] space-y-4">
                            <p className="text-justify">
                                Estamos ansiosos para ter todos vocês conosco na ocasião em que nossa união será abençoada diante de Deus! A cerimônia será breve e seremos muito pontuais. Contamos com a presença de cada um de vocês!
                            </p>
                            <p className="text-justify">
                                Os noivos estão super empolgados e te convidam para a recepção após a cerimônia no dia 06 de julho de 2025, e adivinha? É no mesmo lugar! A festa começa às 12h. Não vai ficar de fora dessa, né?!
                            </p>
                        </div>

                        <div className="bg-gray-100 rounded-lg p-4">
                            <h3 className="font-bold text-lg mb-3 text-[#a674c2]">Detalhes do Evento:</h3>
                            <ul className="space-y-2 text-[#a674c2]">
                                <li className="flex items-center text-[#844fa0]">
                                    <span className="font-semibold mr-2 text-[#a674c2]">Data:</span>
                                    06 de julho de 2025
                                </li>
                                <li className="flex items-center text-[#844fa0]">
                                    <span className="font-semibold mr-2 text-[#a674c2]">Cerimônia:</span>
                                    10h
                                </li>
                                <li className="flex items-center text-[#844fa0]">
                                    <span className="font-semibold mr-2 text-[#a674c2]">Recepção:</span>
                                    12h
                                </li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>

                {/* Right Column: Map */}
                {/* Título do local no topo */}
                <div className="text-center mb-8 font-['Inter'] font-thin">
                    <h1 className="text-3xl text-[#a674c2] flex items-center justify-center" style={{ fontWeight: 400 }}>
                        <MapPin className="w-8 h-8 text-[#a674c2] mr-3" />
                        Sítio Paiol Velho
                    </h1>
                    <p className="text-lg text-[#a674c2] mt-2">
                        Estr. do Oeste, 4025 - Pirabeiraba, Joinville - SC
                    </p>
                </div>
                <div className="space-y-4">
                    <div className="rounded-lg overflow-hidden shadow-lg">
                        <iframe
                            className="w-full h-96 border-0"
                            allowFullScreen
                            title="Local do Evento"
                            src="https://www.google.com/maps/embed/v1/place?q=S%C3%ADtio%20Paiol%20Velho%2C%204025%20Pirabeiraba%2C%20Joinville%2C%20SC&key=AIzaSyAIlmo6MsJHqZhSgK9f6adsCCklGoQRAqM"
                        ></iframe>
                    </div>
                    <Button 
                        onClick={openGoogleMaps}
                        className="w-full h-12 flex items-center justify-center gap-2 bg-[#a674c2] hover:bg-[#844fa0] text-white"
                    >
                        <Navigation className="w-5 h-5" />
                        Abrir no Google Maps
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SobreEvento;