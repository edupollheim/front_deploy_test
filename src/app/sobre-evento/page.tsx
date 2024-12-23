'use client'

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SobreEvento = () => {
    const openGoogleMaps = () => {
        window.open(
            'https://maps.app.goo.gl/NNrbXGPsFADVTRaw6', 
            '_blank'
        );
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid md:grid-cols-2 gap-8">
                {/* Left Column: Event Details */}
                <Card className="bg-white shadow-lg rounded-lg overflow-hidden h-full">
                    <CardHeader className="bg-gray-50 border-b">
                        <CardTitle className="text-2xl font-bold text-gray-900">
                            Cerimônia e Recepção
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                        <div className="text-gray-700 space-y-4">
                            <p className="text-justify">
                                Estamos ansiosos para ter todos vocês conosco na ocasião em que nossa união será abençoada diante de Deus! A cerimônia será breve e seremos muito pontuais. Contamos com a presença de cada um de vocês!
                            </p>
                            <p className="text-justify">
                                Os noivos estão super empolgados e te convidam para a recepção após a cerimônia no dia 06 de julho de 2025, e adivinha? É no mesmo lugar! A festa começa às 12h. Não vai ficar de fora dessa, né?!
                            </p>
                        </div>

                        <div className="bg-gray-100 rounded-lg p-4">
                            <h3 className="font-bold text-lg mb-3 text-gray-900">Detalhes do Evento:</h3>
                            <ul className="space-y-2 text-gray-700">
                                <li className="flex items-center">
                                    <span className="font-semibold mr-2">Data:</span>
                                    06 de julho de 2025
                                </li>
                                <li className="flex items-center">
                                    <span className="font-semibold mr-2">Cerimônia:</span>
                                    10h
                                </li>
                                <li className="flex items-center">
                                    <span className="font-semibold mr-2">Recepção:</span>
                                    12h
                                </li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>

                {/* Right Column: Map */}
                {/* Título do local no topo */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center">
                        <MapPin className="w-8 h-8 text-blue-500 mr-3" />
                        Sítio Paiol Velho
                    </h1>
                    <p className="text-lg text-gray-600 mt-2">
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
                        className="w-full h-12 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white"
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