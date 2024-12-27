"use client";

import {
    Navbar
} from "@nextui-org/navbar";

import MobileMenu from "@/app/components/mobileMenu";

import React, {useState} from 'react';

import {
    Drawer,
    DrawerContent,
    useDisclosure,
} from "@nextui-org/react";


import {HiMiniBars3} from 'react-icons/hi2';

function Header(props: any) {

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (


        <Navbar shouldHideOnScroll className="-hidden -md:block mb-5 bg-blue-100 border-b -border-divider"
                maxWidth="full">

            <Drawer
                isOpen={isOpen}
                //size="xs"
                radius="sm"
                className="max-w-xs2 sm:max-w-sm"
                motionProps={{
                    variants: {
                        enter: {
                            x: 0,
                            opacity: 1,
                            transition: {
                                //duration: 0.9, // Продолжительность анимации
                            },
                        },
                        exit: {
                            x: -100,
                            opacity: 0,
                            transition: {
                                //duration: 0.9, // Продолжительность анимации
                            },
                        },
                    },
                }}
                onOpenChange={onOpenChange}
                placement="left"

            >
                <DrawerContent>
                    {(onClose) => (
                        <>
                            <MobileMenu/>
                        </>
                    )}
                </DrawerContent>
            </Drawer>

            <div className="flex container mx-auto px-0 sm:px-3 items-center justify-between">
                <div className="flex items-center">
                    <button id="menu-close-btn" className="-ml-1 md:hidden"
                            onClick={onOpen}
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                            }}
                    >
                        <HiMiniBars3 size={30} className="-ml-1 md:hidden"/>
                    </button>

                </div>
                <div className="text-right">
                    <p className="font-medium text-lg leading-4 pb-1">Вячеслав Вето</p>
                    <p className="leading-4 text-sm italic">персональный сайт психолога</p>
                </div>
            </div>
        </Navbar>
    );
}

export default Header;