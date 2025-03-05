import { useState, useContext } from "react";
import MyContext from "../context/MyContext";
import TextareaLines from "./TextareaLines";

function FormTextarea({ onChange, labelMovedUp, onPaste, ref, eventHappened }) {
    const { textareaLineNumbers } = useContext(MyContext).state;
    const [textarea, setTextarea] = useState("");
    const [entries, setEntries] = useState(0);
    const [vertScroll, setVertScroll] = useState(0);

    if (eventHappened?.type === "click" && eventHappened?.target.textContent === "Reset" && textarea.length > 0) {
        setTextarea(""); // resetting textarea and Entries if Reset btn was clicked and textarea wasn't empty
        setEntries(0);
    }

    const handleChange = (e) => {
        setTextarea(e.target.value); // handling textarea change
        onChange(e);
        setEntries(e.target.value.split("\n").map((x) => x.trim()).length);
    };

    const handleScroll = () => setVertScroll(ref.current.scrollTop); // handle textarea scroll

    const classes = [`form__label`, `${labelMovedUp ? "moved-up" : ""}`].join(" ").trim();

    return (
        <div className="form__input-box">
            <textarea
                value={textarea}
                onChange={handleChange}
                onPaste={onPaste}
                onScroll={handleScroll}
                className="form__input form__textarea"
                id="input-textarea"
                name="textarea"
                autoComplete="off"
                spellCheck={false}
                ref={ref}
            ></textarea>
            <label className={classes} htmlFor="input-textarea">
                Enter values, one per line. No empty lines. Separate categories within a line using <code>|</code>.
                {labelMovedUp && (
                    <span>
                        &nbsp;Example: <code>Mary | female | 25 | Aberdeen</code>
                    </span>
                )}
            </label>
            <div className="form__bottom">
                <div className="form__note">
                    Note: when specifying keys or values, you don't need to include an ID — it will be generated automatically.
                </div>
                {entries > 0 && textarea.length > 0 && (
                    <div className="form__length" title="Entries to be generated">
                        Entries: {entries}
                    </div>
                )}
            </div>
            {textareaLineNumbers.length > 0 && textareaLineNumbers[0] !== 0 && <TextareaLines vertDisplacement={vertScroll} />}
        </div>
    );
}

export default FormTextarea;
