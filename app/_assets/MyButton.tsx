// MyButton.tsx
import {extendVariants, Button} from "@nextui-org/react";

export const MyButton = extendVariants(Button, {
    variants: {
        // <- modify/add variants
        color: {
            olive: "text-[#000] bg-[#84cc16] dark:text-[#fff] dark:bg-[#4a6c2a]"
        },
        isDisabled: {
            true: "bg-[#eaeaea] text-[#000] opacity-50 cursor-not-allowed",
        },
        size: {
            xs: "px-2 min-w-12 h-6 text-tiny gap-1 rounded-small",
            md: "px-4 min-w-20 h-10 text-small gap-2 rounded-small",
            xl: "px-8 min-w-28 h-14 text-large gap-4 rounded-medium",
        },
    },
    defaultVariants: { // <- modify/add default variants
        color: "olive",
        size: "xl",
    },
    compoundVariants: [ // <- modify/add compound variants
        {
            isDisabled: true,
            color: "olive",
            class: "bg-[#84cc16]/80 opacity-100",
        },
    ],
});