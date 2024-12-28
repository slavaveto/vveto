"use client";

import {Tabs, Tab, Card, CardBody} from "@nextui-org/react";


function LangToggle(props: any) {
    return (
            <Tabs className="" aria-label="Options" color="primary" size="sm" >
                <Tab key="ru_lang" title="RU" className="font-semibold">
                </Tab>
                <Tab key="ua_lang" title="UA" className="font-semibold">
                </Tab>
            </Tabs>
    );
}

export default LangToggle;