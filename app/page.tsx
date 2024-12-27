//import {Button} from '@nextui-org/button';
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import LoremText from "@/app/components/loremText";


export default function Home() {
    return (
        <div className="flex flex-col min-h-svh">

            <Header/>

            <main className="flex flex-col flex-grow container mx-auto px-3">

                <LoremText paragraphs={7}/>

            </main>

            <Footer/>

        </div>
    );
}
