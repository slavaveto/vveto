'use client';

import React, { useEffect, useState } from "react";

const FadeWrapper = ({ children }: { children: React.ReactNode }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true); // Анимация через 500ms
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            className={`transition-opacity duration-1000 ${
                isLoaded ? "opacity-100" : "opacity-0"
            }`}
        >
            {children}
        </div>
    );
};

export default FadeWrapper;