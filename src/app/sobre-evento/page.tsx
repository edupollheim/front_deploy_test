'use client';

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
        <div className="bg-[#fffaf6] min-h-screen flex items-center justify-center py-10 lg:py-20">
            <div className="container mx-auto px-6 lg:px-24 flex flex-col gap-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Detalhes do Evento */}
                    <Card className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200">
                        <CardHeader className="bg-gray-100 border border-gray-200 py-2 text-center">
                            <CardTitle 
                                className="text-[3rem] lg:text-[5rem] font-light text-[#d6b293] letter" 
                                style={{ fontFamily: "'Luxurious Script'" }}
                            >
                                Cerimônia e Recepção
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4 text-lg lg:text-xl text-[#637c8b] font-light font-['Inter']">
                            <p className="text-justify">
                                Estamos ansiosos para compartilhar esse momento especial com vocês! Nossa cerimônia será breve e pontual, seguida por um almoço no mesmo local. Contamos com sua presença!
                            </p>
                            <div className="mt-8">
                                <h3 className="text-2xl font-light text-[#d6b293] pt-4">Detalhes do Evento</h3>
                                <ul className="text-[#d6b293] space-y-1">
                                    <li><strong>Data:</strong> 06 de julho de 2025</li>
                                    <li><strong>Cerimônia:</strong> 10:00</li>
                                    <li><strong>Recepção:</strong> 12:00</li>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Localização */}
                    <div className="flex flex-col items-center text-center">
                        <h2 className="text-3xl text-[#d6b293] flex items-center gap-3 lg:text-4xl font-['Inter'] font-light">
                            <MapPin className="w-8 h-8 lg:w-10 lg:h-10 text-[#d6b293] font-['Inter']" />
                            Sítio Paiol Velho
                        </h2>
                        <p className="text-lg text-[#637c8b] mt-2 lg:text-2xl font-['Inter'] font-light">
                            Estr. do Oeste, 4025 - Pirabeiraba, Joinville - SC
                        </p>
                        <div className="w-full mt-6 rounded-xl overflow-hidden shadow-xl lg:h-[400px]">
                            <iframe
                                className="w-full h-80 lg:h-full border-0"
                                allowFullScreen
                                title="Local do Evento"
                                src="https://www.google.com/maps/embed/v1/place?q=S%C3%ADtio%20Paiol%20Velho%2C%204025%20Pirabeiraba%2C%20Joinville%2C%20SC&key=AIzaSyAIlmo6MsJHqZhSgK9f6adsCCklGoQRAqM"
                            ></iframe>
                        </div>
                        <Button
                            onClick={openGoogleMaps}
                            className="font-light mt-6 lg:mt-10 flex items-center gap-2 font-['Inter] min-w-full hover:bg-gray-200 text-[#637c8b]"
                        >
                            <Navigation className="w-6 h-6 lg:w-8 lg:h-8" />
                            Abrir no Google Maps
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SobreEvento;
