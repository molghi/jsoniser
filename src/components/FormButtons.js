import { useEffect, useRef, useState } from "react";

function FormButtons({ onPreviewClick, inputsAreFilled, error, isTyping }) {
    const [animation, setAnimation] = useState(false);
    const mySpan = useRef();
    const classes = !inputsAreFilled ? "form__button disabled" : "form__button";

    useEffect(() => {
        setAnimation(false);
        if (!mySpan.current) return;
        if (isTyping === true) return;
        if (error) {
            setAnimation(true);
            mySpan.current.classList.remove("zoom-in");
            void mySpan.current.offsetWidth; // trigger reflow of the element, which effectively resets any ongoing CSS animations or transitions
            mySpan.current.classList.add("zoom-in");
        }
    });

    return (
        <div className="form__buttons-box" title={`${inputsAreFilled ? "" : "To enable buttons, both inputs must be filled."}`}>
            <button className={classes} type="button" onClick={onPreviewClick}>
                Preview
            </button>
            <button className={classes} type="submit">
                Export
            </button>

            {error?.length > 0 && (
                <span className="zoom-in" ref={mySpan}>
                    {error}
                </span>
            )}
        </div>
    );
}

export default FormButtons;
