"use client";

import { Listbox, ListboxItem } from "@nextui-org/react";
import { useRouter, usePathname } from "next/navigation";
import { Key } from "react";

export const ListboxWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="w-full max-w-[260px] border-0 px-1 py-12 rounded-small border-default-200 dark:border-default-100">
        {children}
    </div>
);

function MobileMenu({ onClose }: { onClose: () => void }) {
    const router = useRouter();
    const pathname = usePathname(); // Получение текущего пути

    // Асинхронная функция для обработки действия
    const handleAction = async (key: Key) => {
        const route = String(key); // Преобразуем Key в строку

        // Сначала закрываем Drawer
        onClose();

        // Делаем паузу, чтобы Drawer успел закрыться
        await new Promise((resolve) => setTimeout(resolve, 300)); // 300ms

        // Выполняем переход на соответствующую страницу
        if (route === "home") router.push("/");
        if (route === "about") router.push("/about");
        if (route === "contacts") router.push("/contacts");
    };

    return (
        <ListboxWrapper>
            <Listbox aria-label="Actions" onAction={handleAction}>
                {/* Изменение текста "Главная" в зависимости от текущей страницы */}
                <ListboxItem
                    key="home"
                    className={pathname === "/" ? "bg-blue-500 text-white" : ""}
                >
                    {pathname === "/" ? "Главная" : "На Главную"}
                </ListboxItem>
                <ListboxItem
                    key="about"
                    className={pathname === "/about" ? "bg-blue-500 text-white" : ""}
                >
                    Обо мне
                </ListboxItem>
                <ListboxItem
                    key="contacts"
                    className={pathname === "/contacts" ? "bg-blue-500 text-white" : ""}
                >
                    Контакты
                </ListboxItem>
            </Listbox>
        </ListboxWrapper>
    );
}

export default MobileMenu;