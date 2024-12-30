"use client";

import React from "react";
import { Navbar } from "@nextui-org/navbar";
import { Drawer, DrawerContent, useDisclosure } from "@nextui-org/react";
import { HiMiniBars3 } from "react-icons/hi2";
import MobileMenu from "./MobileMenu";

function Header() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <Navbar
            shouldHideOnScroll
            className="-hidden -md:block mb-5 my_navbar_bg backdrop-blur bg-opacity-50"
            maxWidth="full"
        >
            {/* Drawer для мобильного меню */}
            <Drawer
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="left"
                className="max-w-xs2 sm:max-w-md"
                motionProps={{
                    variants: {
                        enter: {
                            opacity: 1,
                            x: 0,
                        },
                        exit: {
                            x: -100,
                            opacity: 0,
                        },
                    },
                }}
            >
                <DrawerContent>

                    <MobileMenu onClose={() =>
                        // @ts-ignore
                        onOpenChange(false)} />
                </DrawerContent>
            </Drawer>

            {/* Основной контент Header */}
            <div className="flex container mx-auto px-0 sm:px-3 items-center justify-between max-w-screen-md">
                <div className="flex items-center">
                    <button
                        className="-md:hidden"
                        onClick={onOpen}
                        style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                        }}
                    >
                        <HiMiniBars3 size={30} className="-ml-[3px]"/>
                    </button>
                </div>
                <div className="text-right">
                    <p className="font-medium text-2xl leading-4 pb-1">Вячеслав Вето</p>
                    <p className="leading-4 text-2sm italic">консультирование и коучинг</p>
                </div>
            </div>
        </Navbar>
    );
}

export default Header;