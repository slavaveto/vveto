//"use client";

import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem
} from "@nextui-org/navbar";
import {Button} from '@nextui-org/button';

function Header(props: any) {
    return (
        <Navbar shouldHideOnScroll isBordered className="-hidden -md:block mb-5" maxWidth="full"


        >

            <div className="flex container mx-auto px-0 sm:px-3">
                <NavbarBrand className=" sm:flex gap-4 bg-blue-100">
                    dfgsdfgsg
                </NavbarBrand>

                <NavbarContent className=" sm:flex gap-4 bg-red-100">
                    <NavbarItem className=" lg:flex">
                        <p>23452345</p>
                    </NavbarItem>
                    <NavbarItem>
                        <Button color="primary" href="#" variant="flat">
                            Sign Up
                        </Button>
                    </NavbarItem>
                </NavbarContent>
            </div>
        </Navbar>
    );
}

export default Header;