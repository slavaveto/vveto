'use client';

import {useState, useEffect, useRef} from "react";
import {Input, Button, Textarea, Alert} from "@nextui-org/react";
import {AnimatePresence, motion} from "framer-motion";
import emailjs from "emailjs-com";

// const isEmailSendingEnabled = false;
// const isMessageRequired = false; // Ф

interface ContactFormProps {
    isEmailSendingEnabled?: boolean; // Если это свойство необязательное
    isMessageRequired?: boolean; // Если это свойство необязательное
    onSubmitSuccess?: () => void;
}

export default function ContactForm({
                                        isEmailSendingEnabled,
                                        isMessageRequired,
                                        onSubmitSuccess,
                                    }: ContactFormProps) {
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
        message: false,
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
        !formData.telegram.trim() &&
        !formData.message.trim()
    // (isMessageRequired && !formData.message.trim());

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
            message: isMessageRequired ? formData.message.trim() === "" : false,
        };

        setErrors(newErrors);

        if (!newErrors.email && !validateEmail(formData.email)) {
            setErrors((prev) => ({...prev, email: true}));
            setEmailTouched(true);
        }

        if (
            !newErrors.name &&
            !newErrors.email &&
            !newErrors.telegram &&
            (!isMessageRequired || !newErrors.message) &&
            validateEmail(formData.email)
        ) {
            setIsLoading(true);

            try {
                if (isEmailSendingEnabled) {
                    await emailjs.send(
                        "service_cmjqu15",
                        "template_3bi5wrp",
                        {
                            name: formData.name,
                            email: formData.email,
                            telegram: formData.telegram,
                            message: formData.message,
                        },
                        "kf-Uuxi5EoVT_l-8a"
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
                setErrors({name: false, email: false, telegram: false, message: false});
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
        const {name, value} = e.target;

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

    const validateTelegram = (telegram: string) => {
        const usernameRegex = /^@[a-zA-Z0-9_]{5,}$/; // Юзернейм в Telegram
        const phoneRegex = /^\+?[1-9]\d{1,14}$/; // Номер телефона
        return usernameRegex.test(telegram) || phoneRegex.test(telegram);
    };

    return (
        <div className="flex flex-col gap-4 w-full md:max-w-xs mx-auto">
            <AnimatePresence mode="wait">
                {!isSubmitted ? (
                    <motion.div
                        key="form"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
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
                                        initial={{opacity: 0, height: 0}}
                                        animate={{opacity: 1, height: "auto"}}
                                        exit={{opacity: 0, height: 0}}
                                        className="text-danger-500 text-xs mt-1 ml-1"
                                        transition={{duration: 0.3}}
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
                                                className="suggestion-item text-md cursor-pointer px-2 py-2 hover:bg-gray-200"

                                            >
                                                <span className="-font-bold"
                                                      style={{textDecoration: "none"}}>
                                                    {userInput}
                                                </span>
                                                <span
                                                className="-font-bold"
                                                style={{textDecoration: "none"}}>
                                                    @{domain}
                                                </span>
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
                            // description={<span>Начните с <span className="
                            // text-danger-300">+</span> для номера телефона и с @ для юзернейма</span>}
                            value={formData.telegram}
                            onChange={handleChange}
                            isInvalid={errors.telegram}
                        />
                        <Textarea
                            label={
                                <span>
                                    Сообщение
                                    <span className="text-danger-300">
                                    {isMessageRequired ? " *" : ""}
                                        </span>
                                </span>
                            }


                            name="message"
                            size="sm"
                            value={formData.message}
                            onChange={handleChange}
                            isInvalid={isMessageRequired && errors.message} // Условие на обязательность
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
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
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