import "./TextareaLines.css";
import { useContext, useRef, useEffect } from "react";
import MyContext from "../context/MyContext";

function TextareaLines({ vertDisplacement }) {
    const myArea = useRef();
    const { textareaLineNumbers } = useContext(MyContext).state;

    useEffect(() => {
        myArea.current.scrollTop = vertDisplacement; // making this textarea, which is "pointer-events:none", scroll when I scroll the main textarea (syncing)
    });

    const times = (symbol, multiplier) => {
        // small helper function, returns type string: "symbol" multiplied "multiplier" times
        let result = "";
        for (let i = 0; i < multiplier; i++) {
            result += symbol;
        }
        return result;
    };

    const textareaValue = textareaLineNumbers
        .map((height, i) => {
            const lines = Math.floor(height / 16); // how many real lines one logical textarea line has
            return `${i + 1} ${times(`\n`, lines)}`;
        })
        .join("");

    return <textarea ref={myArea} className="line-numbers" readOnly value={textareaValue}></textarea>;
}

export default TextareaLines;
