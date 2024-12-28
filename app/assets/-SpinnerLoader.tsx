'use client';

import React, { useState, useEffect } from 'react';
import { Spinner } from "@nextui-org/react";

const SpinnerLoader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [loading, setLoading] = useState(true); // Состояние загрузки
    const [fadeIn, setFadeIn] = useState(false); // Для плавного появления контента
    const [theme, setTheme] = useState<'light' | 'dark'>('light'); // Текущая тема устройства

    const LOADER_TIME = 3000; // Время показа лоадера в миллисекундах

    // Определение системной темы
    const detectSystemTheme = (): 'light' | 'dark' => {
        console.log("Определяем системную тему...");
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    useEffect(() => {
        console.log("Компонент загружен, запускаем таймер...");

        // Определяем тему и устанавливаем её
        setTheme(detectSystemTheme());

        // Запускаем таймер
        const timer = setTimeout(() => {
            console.log("Таймер завершён. Убираем лоадер...");
            setLoading(false); // Убираем лоадер
            setFadeIn(true); // Включаем эффект плавного появления контента
        }, LOADER_TIME);

        return () => {
            console.log("Очищаем таймер...");
            clearTimeout(timer); // Очищаем таймер при размонтировании
        };
    }, []);

    if (loading) {
        console.log("Лоадер отображается. Тема:", theme);
        return (
            <div
                className={`fixed inset-0 flex items-center justify-center z-50 ${
                    theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'
                }`}
                style={{ transform: 'translateY(0vh)' }}
            >
              <Spinner color={theme === 'dark' ? 'white' : 'default'} size="lg" />
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