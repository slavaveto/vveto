'use client';

import React, { useState, useEffect } from 'react';
import { Spinner } from "@nextui-org/react";

interface SpinnerLoaderProps {
    children: React.ReactNode; // Контент, который будет отображаться после загрузки
}

const SpinnerLoader: React.FC<SpinnerLoaderProps> = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [fadeIn, setFadeIn] = useState(false); // Для плавного появления контента
    const [isClient, setIsClient] = useState(false); // Проверка на клиентскую среду

    useEffect(() => {
        // Устанавливаем состояние isClient в true только на клиенте
        setIsClient(true);

        const timer = setTimeout(() => {
            setLoading(false); // Убираем лоадер
            setFadeIn(true); // Включаем эффект fade
        }, 2000);

        return () => clearTimeout(timer); // Очищаем таймер при размонтировании
    }, []);

    if (!isClient) {
        return null; // Ничего не рендерим на сервере, чтобы избежать ошибки гидратации
    }

    if (loading) {
        return (
            <div
                className="fixed inset-0 flex items-center justify-center z-50"
                style={{ transform: 'translateY(-5vh)' }}
            >
                <Spinner />
            </div>
        );
    }

    return (
        <div
            className={`flex flex-col min-h-screen transition-opacity duration-500 ${
                fadeIn ? 'opacity-100' : 'opacity-0'
            }`}
        >
            {children}
        </div>
    );
};

export default SpinnerLoader;