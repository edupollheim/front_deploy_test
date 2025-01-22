import React, { useState, useEffect, useMemo } from 'react';
import { useMediaQuery } from 'react-responsive';
import './Countdown.css'; // Certifique-se de que o CSS esteja configurado corretamente para a animação

interface CountdownProps {
    targetDate?: Date; // Data alvo é opcional
}

const Countdown = ({ targetDate }: CountdownProps) => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    // Verifica se a tela é pequena (mobile)
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    useEffect(() => {
        const target = targetDate || new Date("2025-07-06T10:00:00Z");

        const updateTimeLeft = () => {
            const now = new Date();
            const diff = target.getTime() - now.getTime();

            if (diff <= 0) {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            setTimeLeft({ days, hours, minutes, seconds });
        };

        const interval = setInterval(updateTimeLeft, 1000);
        updateTimeLeft(); // Atualiza imediatamente ao montar

        return () => clearInterval(interval);
    }, [targetDate]);

    const formatTime = useMemo(() => (time: number) => (time < 10 ? `0${time}` : time), []);

    return (
        <div className={`countdown ${isMobile ? 'mobile' : ''}`}>
            <div className={`time-container ${isMobile ? 'mobile-time-container' : ''}`}>
                <div className="flip-down flex flex-col justify-center items-center">
                    <span className="flip-item">{formatTime(timeLeft.days)}</span>
                    <span className="time-label"> Dias</span>
                </div>
                <div className="flip-down flex flex-col justify-center items-center">
                    <span className="flip-item">{formatTime(timeLeft.hours)}</span>
                    <span className="time-label"> Horas</span>
                </div>
                <div className="flip-down flex flex-col justify-center items-center">
                    <span className="flip-item">{formatTime(timeLeft.minutes)}</span>
                    <span className="time-label"> Minutos</span>
                </div>
                <div className="flip-down flex flex-col justify-center items-center">
                    <span className="flip-item">{formatTime(timeLeft.seconds)}</span>
                    <span className="time-label"> Segundos</span>
                </div>
            </div>
        </div>
    );
};

export default Countdown;
