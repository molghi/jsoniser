import { useEffect, useRef, useState } from "react";

function FormButtons({ onPreviewClick, inputsAreFilled, error, isTyping, notification, state, onResetClick }) {
    const [animation, setAnimation] = useState(false); // message is slightly animated
    const mySpan = useRef(); // error msg span

    const classes = !inputsAreFilled ? "form__button disabled" : "form__button";
    const resetClasses = [state.textInputValue, state.textareaValue].some((x) => x.length > 0)
        ? "form__button"
        : "form__button disabled"; // special case: reset btn style

    useEffect(() => {
        if (!mySpan.current || isTyping === true) return;
        setAnimation(false);
        if (error) {
            setAnimation(true);
            mySpan.current.classList.remove("zoom-in");
            void mySpan.current.offsetWidth; // trigger reflow of the element, which effectively resets any ongoing CSS animations or transitions
            mySpan.current.classList.add("zoom-in");
        }
    });

    return (
        <div
            className="form__buttons-box"
            title={`${!inputsAreFilled && "To enable Preview/Export buttons, both inputs must be filled."}`}
        >
            <button className={classes} type="button" onClick={onPreviewClick}>
                Preview
            </button>
            <button className={classes} type="submit">
                Export
            </button>
            <button className={resetClasses} type="reset" onClick={onResetClick}>
                Reset
            </button>

            <div className="msg-box">
                {error?.length > 0 && (
                    <span className="zoom-in" ref={mySpan}>
                        {error}
                    </span>
                )}

                {notification?.length > 0 && <span className="notification">{notification}</span>}
            </div>
        </div>
    );
}

export default FormButtons;
