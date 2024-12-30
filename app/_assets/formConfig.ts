// formConfig.ts
export const formConfig = {
    fields: [
        {
            name: "name",
            label: "Name",
            type: "text",
            isRequired: false,
        },
        {
            name: "email",
            label: "Email",
            type: "email",
            isRequired: true,
        },
        {
            name: "telegram",
            label: "Telegram",
            type: "text",
            isRequired: true,
        },
        {
            name: "message",
            label: "Сообщение",
            type: "textarea",
            isRequired: true,
            placeholder: "Enter your message",
        },
    ],
};