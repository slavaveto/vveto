
'use client';

import React, { useState, useEffect } from 'react';
import {Spinner} from "@nextui-org/react";

//import {Button} from '@nextui-org/button';
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import LoremText from "@/app/components/loremText";

export default function Home() {

    const [loading, setLoading] = useState(true);
    const [fadeIn, setFadeIn] = useState(false); // Состояние плавного появления
    const [isClient, setIsClient] = useState(false); // Проверка, что это клиентская среда

    useEffect(() => {
        // Устанавливаем состояние isClient в true только на клиенте
        setIsClient(true);

        const timer = setTimeout(() => {
            setLoading(false); // Убираем лоадер
            setFadeIn(true); // Включаем эффект fade
        }, 1500);

        return () => clearTimeout(timer); // Очистка таймера
    }, []);

    if (!isClient) {
        return null; // Ничего не рендерим на сервере, чтобы избежать ошибки гидратации
    }

    // if (loading) {
    //     return <Spinner />; // Показываем лоадер
    // }

    return (
        <>
            {loading && <div className="fixed inset-0 flex -items-center justify-center  -top-0 z-50" style={{ transform: 'translateY(-10vh)' }}>
                <Spinner className=" " />
            </div>} {/* Показываем лоадер при загрузке */}


                <div
                    className={`flex flex-col min-h-svh transition-opacity duration-500 ${
                        fadeIn ? 'opacity-100' : 'opacity-0'
                    }`}
                >

                    <Header/>

                    <main className="flex flex-col flex-grow container mx-auto px-3">

                        <LoremText paragraphs={1}/>

                    </main>

                    <Footer/>

                </div>
            </>
            );
            }
