import { createContext, useReducer, useRef, useEffect } from "react";
import { exportNotesJson } from "../utilities/export";
import makeObject from "../utilities/makeObject";
import stateReducer from "../utilities/stateReducer";
import getLineNumbers from "../utilities/getLineNumbers";

// ================================================================================================

const MyContext = createContext();

const initialState = {
    inputLabelMovedUp: false,
    inputTextareaMovedUp: false,
    textInputValue: "",
    textareaValue: "",
    modalShown: false,
    jsonised: "",
    error: "",
    isTyping: false,
    notification: "",
    eventHappened: null,
    textareaLineNumbers: [],
};

function Provider({ children }) {
    const [state, dispatch] = useReducer(stateReducer, initialState);
    const myTextarea = useRef();

    // ================================================================================================

    useEffect(() => {
        const [object, duplicates] = makeObject(state.textInputValue, state.textareaValue); // looking if there are any duplicate entries in textarea
        if (Array.isArray(duplicates) && duplicates.length > 0) {
            dispatch({
                type: "notification",
                payload: `Note: Duplicate entries on these lines: ${duplicates.join(", ").trim()}.`,
            });
        }

        const lineNums = () => {
            const lineNumbersArr = getLineNumbers(state.textareaValue); // calculating the height of each logical line in textarea
            dispatch({
                type: "textarea-line-numbers",
                payload: lineNumbersArr,
            });
        };
        lineNums();

        window.addEventListener("resize", lineNums); // listening to the resize event

        return () => window.removeEventListener("resize", lineNums); // clean up
    }, [state.textareaValue]);

    // ================================================================================================

    // if you type in input fields/if they aren't empty, labels stay above them -- input empty-labels are inside of them
    // also upd the current input/textarea value
    const handleTyping = (e) => {
        dispatch({
            type: "typing-event",
            payload: e.target.value,
        });
    };

    // ================================================================================================

    // form submit is when clicking Export btn
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const object = exportNotesJson(state.textInputValue, state.textareaValue);
        if (typeof object === "string") {
            // if there was an error...
            dispatch({
                type: "btn-clicked",
                payload: object, // payload===error string
            });
        }
    };

    // ================================================================================================

    // Preview btn is show modal window
    const onPreviewClick = () => {
        const [object, duplicates] = makeObject(state.textInputValue, state.textareaValue);
        dispatch({
            type: "btn-clicked",
            payload: object, // payload is either json to be exported or the error string/message (if input was incorrect)
        });
        if (typeof object !== "string") {
            if (document.querySelector(".modal")) document.querySelector(".modal").remove();
            document.querySelector("body").insertAdjacentHTML("afterbegin", `<div class="modal"></div>`); // for React portals
        }
    };

    // ================================================================================================

    // are both inputs filled/not empty?
    const inputsAreFilled = [state.textInputValue, state.textareaValue].every((item) => item.length > 0);

    // ================================================================================================

    // hide modal
    const hideModal = () => {
        dispatch({
            type: "hide-modal",
        });
    };

    // ================================================================================================

    // handling the paste event
    const handlePaste = (e) => {
        setTimeout(() => {
            // changing textarea height (if needed):
            const textareaMinimalHeight = Math.floor(window.innerHeight * 0.4);
            myTextarea.current.style.height = "auto";
            myTextarea.current.style.height = myTextarea.current.scrollHeight + "px";
            const textareaAfterReset = parseInt(window.getComputedStyle(myTextarea.current).height);
            if (textareaAfterReset > window.innerHeight) {
                myTextarea.current.style.height = "84vh";
            } else if (textareaAfterReset < textareaMinimalHeight) {
                myTextarea.current.style.height = Math.floor(window.innerHeight * 0.55) + "px";
            }
            // checking duplicates:
            const [object, duplicates] = makeObject(state.textInputValue, state.textareaValue);
            if (Array.isArray(duplicates) && duplicates.length > 0) {
                dispatch({
                    type: "notification",
                    payload: `Note: Duplicate entries on these lines: ${duplicates.join(", ").trim()}.`,
                });
            }
        }, 10); // setTimeout is needed because the paste event takes some little time
    };

    // ================================================================================================

    // handling reset btn click
    const onResetClick = (e) => {
        myTextarea.current.style.height = Math.floor(window.innerHeight * 0.55) + "px"; // resetting textarea height
        dispatch({ type: "reset", payload: e });
    };

    // ================================================================================================

    return (
        <MyContext.Provider
            value={{
                state,
                dispatch,
                handleTyping,
                handleFormSubmit,
                onPreviewClick,
                inputsAreFilled,
                hideModal,
                handlePaste,
                onResetClick,
                myTextarea,
            }}
        >
            {children}
        </MyContext.Provider>
    );
}

export default MyContext;
export { Provider };

// const pastedData = e.clipboardData.getData("text");
