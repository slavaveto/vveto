"use client";

import {Tabs, Tab, Card, CardBody} from "@nextui-org/react";


function LangToggle(props: any) {
    return (
            <Tabs aria-label="Options" color="primary" size="sm" variant="bordered">
                <Tab key="ru_lang" title="RU">
                </Tab>
                <Tab key="ua_lang" title="UA">
                </Tab>
            </Tabs>
    );
}

export default LangToggle;