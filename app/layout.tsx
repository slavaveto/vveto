import type {Metadata} from "next";
import {Inter} from 'next/font/google';
import "./globals.css";
import {Providers} from "./_components/Providers";
import Header from "./_components/Header"; // Подключаем Header
import Footer from "./_components/Footer"; // Подключаем Footer
import FadeWrapper from "@/app/_components/FadeWrapper";
import toast, { Toaster } from 'react-hot-toast';

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "В.Вето | Консультирование и коучинг",
    description: "Консультирование, коучинг",
    icons: {
        icon: "/favicon.ico"
    }
};

export default function RootLayout({children}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
        </head>
        <body className={`${inter.variable} antialiased`}>
        <Providers>
            <FadeWrapper>
            <div className="flex flex-col min-h-svh">
                    <Header/>
                    <Toaster />
                    <main className="flex-grow container mx-auto px-3 max-w-screen-md">
                        {children}
                    </main>

                    <Footer/>
                </div>
            </FadeWrapper>
        </Providers>
        </body>
        </html>
    );
}
