//import {Button} from '@nextui-org/button';
import Footer from "@/app/components/footer";
import LoremText from "@/app/components/loremText";


export default function Home() {
  return (
      <div className="flex flex-col min-h-svh">

          <main className="flex flex-col flex-grow container mx-auto px-3 items-center justify-center">

              <LoremText paragraphs={5}/>

          </main>
          <Footer/>
      </div>
  );
}
