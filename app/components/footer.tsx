import ThemeToggle from "@/app/components/themeToggle";
import LangToggle from "@/app/components/langToggle";


function Footer() {
    return (
        <footer className="bg-blue-50 flex h-[60px] mt-5 items-center">
            <div className="container flex mx-auto px-3 justify-end">
                <div className="flex flex-col pr-2">
                    <LangToggle className="">
                    </LangToggle>
                </div>
                <div className="flex flex-col">
                    <ThemeToggle/>
                </div>
                </div>
        </footer>
);
}

export default Footer;