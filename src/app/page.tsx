"use client";

import { useEffect, useState } from 'react';
import Countdown from "@/app/components/Contagem";
import fotoCasalCel from './images/foto1.webp';
import fotoCasalPC from './images/foto1_.webp';
import fotoCasal2PC from './images/foto2_.webp';
import fotoCasal2Cel from './images/foto2.webp';
import DividerGold from "@/app/components/divider";
import Anuncios from './components/anuncios';
import Manual from './components/manual';

export default function Home() {
    const targetDate = new Date(2025, 6, 6, 10, 0, 0); // 06 de Julho de 2025 às 10:00

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Apenas no cliente
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <section className="flex-1 min-h-screen h-screen pt-4 relative mt-[-5.5rem] -z-10">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${isMobile ? fotoCasalCel.src : fotoCasalPC.src})`,
                        filter: 'blur(2.5px)',
                        zIndex: -1,
                    }}
                ></div>
                <div
                    className="absolute inset-0"
                    style={{
                        boxShadow: 'inset 0 0 600px rgba(0, 0, 0, 1)',
                        zIndex: -1,
                    }}
                ></div>
                <div className="logo-container flex justify-center items-center relative mt-[5.5rem]">
                    <h1 className="letter letter-e text-[#d6b293]">Eduardo</h1>
                    <span className="letter letter-ampersand text-[#d6b293]">e</span>
                    <h1 className="letter letter-j text-[#d6b293]">Jéssica</h1>
                </div>

                <div className="absolute bottom-10 w-full flex justify-center items-center text-center text-[#d6b293]">
                    <div>
                        <h1 className="letter max-w-screen-lg" style={{ fontFamily: "Italiana", fontSize: '1rem', lineHeight: '1rem' }}>
                            Vamos nos casar! Estamos preparando tudo com muito carinho para
                            curtir cada momento com nossos amigos e familiares queridos!
                        </h1>
                    </div>
                </div>
            </section>

            <DividerGold />

            <section className="flex-1 min-h-screen relative parent-container">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${isMobile ? fotoCasal2Cel.src : fotoCasal2PC.src})`,
                        filter: 'blur(2.5px)',
                        zIndex: -1,
                    }}
                ></div>
                <div
                    className="absolute inset-0"
                    style={{
                        boxShadow: 'inset 0 0 600px rgba(0, 0, 0, 1)',
                        zIndex: -1,
                    }}
                ></div>
                <div className="flex flex-col items-center relative">
                    <h2 className="countdown-title mb-2 letter text-[#d6b293]">Contagem regressiva</h2>
                    <Countdown targetDate={targetDate} />
                </div>
            </section>

            <DividerGold />

            <section className="flex-1 min-h-screen relative parent-container">
                <Anuncios />
            </section>

            <DividerGold />

            <section className='bg-[#fffaf6]'>
                <Manual />
            </section>
        </>
    );
}
