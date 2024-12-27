import ThemeToggle from "@/app/components/themeToggle";
import LangToggle from "@/app/components/langToggle";


function Footer() {
    return (
        <footer className="bg-blue-50 flex h-[60px] mt-5 items-center border-t -border-divider">
            <div className="container flex mx-auto px-3 justify-between items-center">
                <div>
                    <p className="font-medium text-lg leading-4 pb-1">Вячеслав Вето</p>
                    <p className="leading-4 text-sm italic">персональный сайт психолога</p>
                </div>
                <div className="flex justify-end">
                    <div className="flex flex-col pr-2">
                        <LangToggle className="">
                        </LangToggle>
                    </div>
                    <div className="flex flex-col">
                        <ThemeToggle/>
                    </div>
                </div>
            </div>
        </footer>
);
}

export default Footer;