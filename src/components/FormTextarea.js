import { useState } from "react";

function FormTextarea({ onChange, labelMovedUp }) {
    const [textarea, setTextarea] = useState("");

    const handleChange = (e) => {
        setTextarea(e.target.value);
        onChange(e);
    };

    const classes = [`form__label`, `${labelMovedUp ? "moved-up" : ""}`].join(" ").trim();

    return (
        <div className="form__input-box">
            <textarea
                value={textarea}
                onChange={handleChange}
                className="form__input form__textarea"
                id="input-textarea"
                name="textarea"
                autoComplete="off"
            ></textarea>
            <label className={classes} htmlFor="input-textarea">
                Enter values, one per line. No empty lines. Separate categories within a line using <code>|</code>.
                {labelMovedUp && (
                    <span>
                        &nbsp;Example: <code>Mary | female | 25 | Aberdeen</code>
                    </span>
                )}
            </label>
        </div>
    );
}

export default FormTextarea;
