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
import Image from 'next/image';
import { HeartIcon } from '@heroicons/react/24/outline';

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

    const monogramStyles = "text-[#d6b293] text-[2rem] md:text-8xl font-light tracking-wide hover:text-[#e6c3a3] transition-colors -mt-1";

    return (
        <>
            <section className="flex-1 min-h-screen h-screen pt-4 relative mt-[-5.5rem] md:mt-[-5.5rem] -z-10 overflow-hidden">
                {/* Background Image - Desktop */}
                <div className="absolute inset-0 hidden md:block">
                    <Image
                        src={fotoCasalPC}
                        alt="Casal background desktop"
                        fill
                        className="object-cover"
                        style={{
                            filter: 'brightness(0.7) blur(3px)',
                            transform: 'scale(1.1)',
                        }}
                        priority
                    />
                </div>

                {/* Background Image - Mobile */}
                <div className="absolute inset-0 block md:hidden">
                    <Image
                        src={fotoCasalCel}
                        alt="Casal background mobile"
                        fill
                        className="object-cover"
                        style={{
                            filter: 'brightness(0.7) blur(3px)',
                            transform: 'scale(1.1)',
                        }}
                        priority
                    />
                </div>

                {/* Gradient Overlay */}
                <div
                    className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"
                    style={{ zIndex: -1 }}
                />

                <div className="relative mt-[5.5rem] md:mt-[8rem] flex justify-start md:justify-center items-center h-2/3">
                    <div className="grid grid-cols-[auto_1fr] gap-12 w-full px-8 md:px-16 animate-fade-in">

                        {/* Seção dos Números */}
                        <div className="sm:flex sm:flex-col justify-center items-start md:items-center gap-0 ml-[-4rem] md:ml-0 lg:flex-row lg:justify-center lg:pt-12">
                            <h2
                                className="text-[#d6b293] text-[13rem] md:text-[18rem] font-light tracking-wider hover:text-[#e6c3a3] transition-colors leading-none"
                                style={{ fontFamily: "Inter", fontWeight: 100 }}
                            >
                                06
                            </h2>
                            <span className="hidden lg:block text-[#d6b293] text-[5rem] font-light tracking-wider hover:text-[#e6c3a3] transition-colors leading-none">
                                .
                            </span>
                            <h2
                                className="text-[#d6b293] text-[13rem] md:text-[18rem] font-light tracking-wider hover:text-[#e6c3a3] transition-colors leading-none"
                                style={{ fontFamily: "Inter", fontWeight: 100 }}
                            >
                                07
                            </h2>
                            <span className="hidden lg:block text-[#d6b293] text-[5rem] font-light tracking-wider hover:text-[#e6c3a3] transition-colors leading-none">
                                .
                            </span>
                            <h2
                                className="text-[#d6b293] text-[13rem] md:text-[18rem] font-light tracking-wider hover:text-[#e6c3a3] transition-colors leading-none"
                                style={{ fontFamily: "Inter", fontWeight: 100 }}
                            >
                                25
                            </h2>
                        </div>

                        {/* Seção do Monograma */}
                        <div
                            className="
                                flex flex-col items-end gap-2 pt-12
                                md:items-start md:pl-24
                                lg:flex-row lg:gap-4 lg:pt-0 lg:pb-[32rem] lg:items-center lg:pl-[24rem] lg:justify-center
                            "
                            >  
                            <div className="flex flex-col items-center gap-4 lg:flex-row lg:gap-4 lg:items-center">
                                <span className={monogramStyles} style={{fontFamily: "Luxurious Script"}}>J</span>
                                <HeartIcon className={`${monogramStyles} w-6 h-6 md:w-24 md:h-24 ml-5`} />
                                <span className={monogramStyles} style={{fontFamily: "Luxurious Script"}}>E</span>
                            </div>
                        </div>

                    </div>
                </div>


                <div className="absolute bottom-10 w-full flex justify-center items-center text-center px-4">
                    <h1
                        className="text-[#d6b293] max-w-screen-md lg:max-w-prose animate-fade-up sm:text-[1rem] md:text-[1.5rem] lg:text-[1.5rem] font-light tracking-wider"
                        style={{
                            fontFamily: "Inter",
                            letterSpacing: '0.1em',
                            fontWeight: 300
                        }}
                    >
                        Vamos nos casar! Estamos preparando tudo com muito carinho para
                        curtir cada momento com nossos familiares e amigos queridos!
                    </h1>
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
                        zIndex: -1,
                    }}
                ></div>
                <div className="flex flex-col items-center relative">
                    <h2 className="text-[4rem] md:text-[5rem] lg:text-[10rem] font-extralight mb-2 letter text-[#d6b293] leading-[8rem]">Contagem <br/> regressiva</h2>
                    <Countdown targetDate={targetDate} />
                </div>
            </section>

            <DividerGold />

            <section className="flex-1 min-h-screen relative parent-container  bg-[#fffaf6]">
                <Anuncios />
            </section>

            <DividerGold />

            <section className='bg-[#fffaf6] '>
                <Manual />
            </section>
        </>
    );
}
