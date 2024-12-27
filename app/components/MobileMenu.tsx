"use client";

import {Listbox, ListboxItem} from "@nextui-org/react";

export const ListboxWrapper = ({children}:any) => (
    <div className="w-full -max-w-[260px] border-0 px-1 py-12 rounded-small border-default-200 dark:border-default-100">
        {children}
    </div>
);

function MobileMenu(props: any) {

    return (

        <ListboxWrapper className="">
            <Listbox className="" aria-label="Actions" onAction={(key) => alert(key)}>
                <ListboxItem key="new">New file</ListboxItem>
                <ListboxItem key="copy">Copy link</ListboxItem>
                <ListboxItem key="edit">Edit file</ListboxItem>
                <ListboxItem key="delete" className="text-danger" color="danger">
                    Delete file
                </ListboxItem>
            </Listbox>
        </ListboxWrapper>

    );
}

export default MobileMenu;