'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

const FadeWrapper = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname(); // Следим за изменением пути

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname} // Уникальный ключ для отслеживания переходов
                initial={{ opacity: 0 }} // Анимация появления
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }} // Анимация исчезновения
                transition={{ duration: 0.5 }} // Длительность анимации
                className="flex-grow" // Flexbox для сохранения структуры
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};

export default FadeWrapper;