'use client';

import React, { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/react";

const FadeWrapper = ({ children }: { children: React.ReactNode }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true); // Анимация через 500ms
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div>
            {!isLoaded && (
                <div className="flex justify-center items-center h-screen"
                     style={{ transform: 'translateY(-5vh)' }}>
                    <Spinner />
                </div>
            )}
            <div
                className={`transition-opacity duration-1000 ${
                    isLoaded ? "opacity-100" : "opacity-0"
                }`}
            >
                {children}
            </div>
        </div>
    );
};

export default FadeWrapper;