import { useState } from "react";

function FormTextarea({ onChange, labelMovedUp, onPaste, ref, eventHappened }) {
    const [textarea, setTextarea] = useState("");
    const [entries, setEntries] = useState(0);

    if (eventHappened?.type === "click" && eventHappened?.target.textContent === "Reset" && textarea.length > 0) {
        setTextarea("");
        setEntries(0);
    }

    const handleChange = (e) => {
        setTextarea(e.target.value);
        onChange(e);
        setEntries(e.target.value.split("\n").map((x) => x.trim()).length);
    };

    const classes = [`form__label`, `${labelMovedUp ? "moved-up" : ""}`].join(" ").trim();

    return (
        <div className="form__input-box">
            <textarea
                value={textarea}
                onChange={handleChange}
                onPaste={onPaste}
                className="form__input form__textarea"
                id="input-textarea"
                name="textarea"
                autoComplete="off"
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
                {entries > 0 && (
                    <div className="form__length" title="Entries to be generated">
                        Entries: {entries}
                    </div>
                )}
            </div>
        </div>
    );
}

export default FormTextarea;
