'use client';

import { Tabs, Tab } from '@nextui-org/react';
import { LightThemeIcon, DarkThemeIcon, AutoThemeIcon } from '@/app/_assets/svg_icons';
import React, { useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

const ThemeToggle: React.FC = () => {
    const [theme, setTheme] = useState<Theme>('system'); // Состояние текущей темы

    // Определяем текущую системную тему
    const getSystemTheme = (): Theme => {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    };

    // Применяем тему
    const applyTheme = (selectedTheme: Theme) => {
        const root = document.documentElement;
        root.classList.remove('light', 'dark');

        if (selectedTheme === 'system') {
            const systemTheme = getSystemTheme();
            root.classList.add(systemTheme);
            setTheme('system'); // Устанавливаем "system" для сохранения
            console.log(`Системная тема установлена: ${systemTheme}`);
        } else {
            root.classList.add(selectedTheme);
            setTheme(selectedTheme); // Устанавливаем пользовательскую тему
            console.log(`Пользователь переключился на: ${selectedTheme}`);
        }
    };

    // Загружаем сохранённую тему из localStorage
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as Theme | null;

        if (savedTheme) {
            applyTheme(savedTheme);
        } else {
            applyTheme('system');
        }
    }, []);

    // Отслеживаем изменения системной темы
    useEffect(() => {
        if (theme === 'system') {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const handleChange = () => {
                const systemTheme = getSystemTheme();
                console.log(`Системная тема изменена: ${systemTheme}`);
                applyTheme('system');
            };

            mediaQuery.addEventListener('change', handleChange);

            return () => mediaQuery.removeEventListener('change', handleChange);
        }
    }, [theme]);

    // Обработчик изменения темы
    const handleThemeChange = (newTheme: Theme) => {
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    };

    return (
        <Tabs
            aria-label="Выбор темы"
            color="primary"
            size="sm"
            selectedKey={theme} // Устанавливаем текущую выбранную тему
            onSelectionChange={(key) => handleThemeChange(key as Theme)} // Меняем тему при выборе вкладки
        >
            <Tab
                key="light" // Обязательно совпадает с состоянием 'light'
                title={
                    <div className="flex items-center">
                        <LightThemeIcon />
                    </div>
                }
            />
            <Tab
                key="system" // Обязательно совпадает с состоянием 'system'
                title={
                    <div className="flex items-center">
                        <AutoThemeIcon />
                    </div>
                }
            />
            <Tab
                key="dark" // Обязательно совпадает с состоянием 'dark'
                title={
                    <div className="flex items-center">
                        <DarkThemeIcon />
                    </div>
                }
            />
        </Tabs>
    );
};

export default ThemeToggle;