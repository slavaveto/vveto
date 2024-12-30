'use client';

import { useState, useEffect, useRef } from "react";
import { Input, Button, Textarea, Alert } from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import emailjs from "emailjs-com"; // Подключение EmailJS

const isEmailSendingEnabled = false;


export default function Home() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        telegram: "",
        message: "",
    });
    const [errors, setErrors] = useState({
        name: false,
        email: false,
        telegram: false,
    });
    const [emailTouched, setEmailTouched] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const suggestionsRef = useRef<HTMLDivElement | null>(null);

    const popularDomains = ["gmail.com", "yandex.ru", "yahoo.com", "outlook.com"];

    const isFormEmpty =
        !formData.name.trim() &&
        !formData.email.trim() &&
        !formData.telegram.trim();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                suggestionsRef.current &&
                !suggestionsRef.current.contains(event.target as Node)
            ) {
                setSuggestions([]);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSubmit = async () => {
        const newErrors = {
            name: formData.name.trim() === "",
            email: formData.email.trim() === "",
            telegram: formData.telegram.trim() === "",
        };

        setErrors(newErrors);

        if (!newErrors.email && !validateEmail(formData.email)) {
            setErrors((prev) => ({ ...prev, email: true }));
            setEmailTouched(true);
        }

        if (
            !newErrors.name &&
            !newErrors.email &&
            !newErrors.telegram &&
            validateEmail(formData.email)
        ) {
            setIsLoading(true);

            try {

                if (isEmailSendingEnabled) { // Проверяем, включена ли отправка
                    await emailjs.send(
                        "service_cmjqu15", // Ваш Service ID
                        "template_3bi5wrp", // Ваш Template ID
                        {
                            name: formData.name,
                            email: formData.email,
                            telegram: formData.telegram,
                            message: formData.message,
                        },
                        "kf-Uuxi5EoVT_l-8a" // Ваш Public Key
                    );
                    console.log("Сообщение отправлено через EmailJS.");
                } else {
                    console.log("Отправка через EmailJS временно отключена.");
                }

                setIsSubmitted(true);
                setFormData({
                    name: "",
                    email: "",
                    telegram: "",
                    message: "",
                });
                setErrors({ name: false, email: false, telegram: false });
            } catch (error) {
                console.error("Ошибка отправки через EmailJS:", error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (name === "email") {
            if (value.length >= 3 && !value.includes("@")) {
                const suggestions = popularDomains.map(
                    (domain) => `${value}@${domain}`
                );
                setSuggestions(suggestions);
            } else {
                setSuggestions([]);
            }

            if (emailTouched) {
                if (validateEmail(value)) {
                    setErrors((prev) => ({
                        ...prev,
                        email: false,
                    }));
                } else {
                    setErrors((prev) => ({
                        ...prev,
                        email: true,
                    }));
                }
            }
        } else {
            if (value.trim() !== "") {
                setErrors((prev) => ({
                    ...prev,
                    [name]: false,
                }));
            } else {
                setErrors((prev) => ({
                    ...prev,
                    [name]: true,
                }));
            }
        }
    };

    const handleSuggestionClick = (suggestion: string) => {
        setFormData((prev) => ({
            ...prev,
            email: suggestion,
        }));
        setSuggestions([]);
        setErrors((prev) => ({
            ...prev,
            email: false,
        }));
    };

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    return (
        <div className="flex flex-col gap-4 w-full max-w-xs mx-auto">
            <AnimatePresence mode="wait">
                {!isSubmitted ? (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col gap-4"
                    >
                        <Input
                            label={
                                <span>
                                    Имя<span className="text-danger-300"> *</span>
                                </span>
                            }
                            name="name"
                            type="text"
                            size="sm"
                            value={formData.name}
                            onChange={handleChange}
                            isInvalid={errors.name}
                        />
                        <div className="relative">
                            <Input
                                label={
                                    <span>
                                        Email<span className="text-danger-300"> *</span>
                                    </span>
                                }
                                name="email"
                                type="email"
                                size="sm"
                                value={formData.email}
                                onChange={handleChange}
                                isInvalid={errors.email}
                            />
                            <AnimatePresence>
                                {errors.email && formData.email.trim() && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="text-danger-500 text-xs mt-1 ml-1"
                                        transition={{ duration: 0.3 }}
                                    >
                                        Неверный формат email
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            {suggestions.length > 0 && (
                                <div
                                    ref={suggestionsRef}
                                    className={`absolute z-50 bg-primary-50 shadow-lg rounded-lg py-2 w-full transition-transform duration-300 ${
                                        errors.email ? "-mt-5" : "mt-0"
                                    }`}
                                >
                                    {suggestions.map((suggestion, index) => {
                                        const [userInput, domain] = suggestion.split("@");
                                        return (
                                            <div
                                                key={index}
                                                onClick={() => handleSuggestionClick(suggestion)}
                                                className="text-sm cursor-pointer px-2 py-2 hover:bg-gray-200"
                                            >
                                                <span className="font-bold">{userInput}</span>@{domain}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                        <Input
                            label={
                                <span>
                                    Telegram<span className="text-danger-300"> *</span>
                                </span>
                            }
                            name="telegram"
                            type="text"
                            size="sm"
                            value={formData.telegram}
                            onChange={handleChange}
                            isInvalid={errors.telegram}
                        />
                        <Textarea
                            label="Сообщение"
                            name="message"
                            size="sm"
                            value={formData.message}
                            onChange={handleChange}
                        />
                        <Button
                            color="primary"
                            onPress={handleSubmit}
                            isDisabled={isFormEmpty || isLoading}
                            isLoading={isLoading}
                        >
                            {isLoading ? "Отправляем..." : "Отправить"}
                        </Button>
                    </motion.div>
                ) : (
                    <motion.div
                        key="alert"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center gap-4"
                    >
                        <Alert
                            color="success"
                            variant="faded"
                            description="Ваше сообщение успешно отправлено!"
                        >
                            Успех!
                        </Alert>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}