'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

const PageTransitionWrapper = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname(); // Отслеживаем текущий путь

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname} // Уникальный ключ для анимации переходов
                initial={{ opacity: 0, y: 20 }} // Начальное состояние (fade + сдвиг вниз)
                animate={{ opacity: 1, y: 0 }} // Появление (fade + возвращение в позицию)
                exit={{ opacity: 0, y: -20 }} // Исчезновение (fade + сдвиг вверх)
                transition={{ duration: 0.5 }} // Настройка анимации (0.5 сек)
                className="flex-grow" // Гибкий контейнер
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};

export default PageTransitionWrapper;