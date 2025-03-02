import { useState } from "react";

function FormInput({ onChange, labelMovedUp }) {
    const [input, setInput] = useState("");

    const handleChange = (e) => {
        setInput(e.target.value);
        onChange(e);
    };

    const classes = [`form__label`, `${labelMovedUp ? "moved-up" : ""}`].join(" ").trim();

    return (
        <div className="form__input-box">
            <input value={input} onChange={handleChange} className="form__input" id="input-text" type="text" autoComplete="off" />
            <label className={classes} htmlFor="input-text">
                Enter key names, separated by pipes (<code>|</code>). Example: <code>name | sex | age | city</code>
            </label>
        </div>
    );
}

export default FormInput;
