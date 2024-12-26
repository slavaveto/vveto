//"use client";
import { loremIpsum } from "lorem-ipsum";
import parse from 'html-react-parser';

interface NumberOfParagraphsProps {
    paragraphs: number;
}

function LoremText({ paragraphs }: NumberOfParagraphsProps) {

    let loremText = '';
    let firstLinePaddingTop = "pt-[0px]";

    for (let i = 0; i < paragraphs; i++) {
        if (i==0) {
            firstLinePaddingTop = "pt-[0px]";
        } else {
            firstLinePaddingTop = "pt-[10px]";
        }
        loremText = loremText.concat( `<p class="font-bold ${firstLinePaddingTop} pb-[5px]">`, loremIpsum({count: 1, units: "sentence", sentenceUpperBound: 5}), "</p>")
        loremText = loremText.concat(loremIpsum({format:"html",count: 1, units: "paragraphs", paragraphLowerBound: 3, paragraphUpperBound: 10, random: Math.random,}))
        //loremText = loremText + `<p class="font-bold ${firstLinePaddingTop} pb-[5px]">` + "452352345" + "</p>"
    }

    return (
        <div>
            {parse(loremText)}
        </div>
    );
}

export default LoremText;