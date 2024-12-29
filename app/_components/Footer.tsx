"use client";

import ThemeToggle from "@/app/_components/ThemeToggle";
import LangToggle from "@/app/_components/LangToggle";


function Footer() {
    return (
        <footer className="my_footer_bg flex h-[60px] mt-5 items-center ">
            <div className="container flex mx-auto px-3 justify-between items-center max-w-screen-md">
                <div>
                    <p className="font-medium text-lg leading-4 pb-1">Вячеслав Вето</p>
                    <p className="leading-4 text-sm italic">персональный сайт психолога</p>
                </div>
                <div className="flex justify-end">
                    <div className="flex flex-col pr-2">

                    </div>
                    <div className="flex flex-col">
                        <ThemeToggle/>
                    </div>
                </div>
            </div>
        </footer>
);
}

export default Footer;