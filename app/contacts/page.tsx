'use client';

import ContactForm from "@/app/_components/ContactForm";

const isEmailSendingEnabled = false;
const isMessageRequired = false;

export default function ContactPage() {
    return (
        <div>
            <ContactForm
                isEmailSendingEnabled={isEmailSendingEnabled}
                isMessageRequired={isMessageRequired}
                onSubmitSuccess={() => {}} />

        </div>
    );
}