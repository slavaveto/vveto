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
    const [theme, setTheme] = useState<'light' | 'dark'>('light'); // Текущая тема

    // Определяем системную тему
    const detectSystemTheme = (): 'light' | 'dark' => {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    // Загружаем пользовательскую тему или системную
    const loadUserTheme = () => {
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null;
        if (savedTheme === 'light' || savedTheme === 'dark') {
            return savedTheme; // Если сохранена пользовательская тема
        }
        return detectSystemTheme(); // Иначе используем системную тему
    };

    useEffect(() => {
        // Устанавливаем тему перед отображением лоадера
        setTheme(loadUserTheme());

        // Устанавливаем состояние isClient в true только на клиенте
        setIsClient(true);

        const timer = setTimeout(() => {
            setLoading(false); // Убираем лоадер
            setFadeIn(true); // Включаем эффект fade
        }, 3000);

        return () => clearTimeout(timer); // Очищаем таймер при размонтировании
    }, []);

    if (!isClient) {
        return null; // Ничего не рендерим на сервере, чтобы избежать ошибки гидратации
    }

    if (loading) {
        return (
            <div
                className={`fixed inset-0 flex items-center mt-10 justify-center z-50 ${
                    theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'
                }`}
                style={{ transform: 'translateY(-5vh)' }}
            >
                {/* Спиннер с доступным цветом */}
                <Spinner color={theme === 'dark' ? "white" : "default"} size="lg" />
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