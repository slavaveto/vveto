"use client";

import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem
} from "@nextui-org/navbar";

import MobileMenu from "@/app/components/mobileMenu";

import {HiMiniBars3} from 'react-icons/hi2';

function Header(props: any) {
    return (

        <Navbar shouldHideOnScroll className="-hidden -md:block mb-5 bg-blue-100 border-b -border-divider"
                maxWidth="full">

            <div className="flex container mx-auto px-0 sm:px-3 items-center justify-between">
                <div className="flex items-center">
                    <button className="-ml-1 md:hidden"
                            //onClick={onOpen}
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