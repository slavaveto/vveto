"use client";

import {Tabs, Tab, Card, CardBody} from "@nextui-org/react";
import {LightThemeIcon,DarkThemeIcon,AutoThemeIcon,} from "@/app/assets/svg_icons";


function ThemeToggle(props: any) {
    return (
            <Tabs aria-label="Options" color="primary" size="sm" variant="bordered">
                <Tab key="light_theme"
                     title={
                         <div className="flex items-center">
                             <LightThemeIcon/>
                         </div>
                     }
                >
                </Tab>
                <Tab key="auto_theme" title={
                    <div className="flex items-center">
                        <AutoThemeIcon/>
                    </div>
                }>
                </Tab>
                <Tab key="dark_theme" title={
                    <div className="flex items-center">
                        <DarkThemeIcon/>
                    </div>
                }
                >
                </Tab>
            </Tabs>
    );
}

export default ThemeToggle;