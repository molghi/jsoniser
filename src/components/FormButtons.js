import { useEffect, useRef, useState } from "react";

function FormButtons({ onPreviewClick, inputsAreFilled, error, isTyping, notification, state, onResetClick }) {
    console.log(notification);
    console.log(state);
    const [animation, setAnimation] = useState(false);
    const mySpan = useRef();
    const classes = !inputsAreFilled ? "form__button disabled" : "form__button";
    const resetClasses = [state.textInputValue, state.textareaValue].some((x) => x.length > 0)
        ? "form__button"
        : "form__button disabled";

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
        <div
            className="form__buttons-box"
            title={`${inputsAreFilled ? "" : "To enable Preview/Export buttons, both inputs must be filled."}`}
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
