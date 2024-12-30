'use client';

import { useState } from "react";
import { Input, Button } from "@nextui-org/react";

export default function Home() {
    const [inputValue, setInputValue] = useState(""); // Состояние для значения поля

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        console.log("Текущая строка в поле Name:", e.target.value);
    };

    const handleSubmit = () => {
        console.log("Форма отправлена: Name =", inputValue);
    };

    return (
        <div className="flex flex-col gap-4 w-full max-w-xs mx-auto">
            3456456
        </div>
    );
}