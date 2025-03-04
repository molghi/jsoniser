import { createContext, useReducer, useRef } from "react";
import { exportNotesJson, makeObject } from "../components/export";
import stateReducer from "../components/stateReducer";
import getLineNumbers from "../components/getLineNumbers";

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
};

function Provider({ children }) {
    const [state, dispatch] = useReducer(stateReducer, initialState);
    const myTextarea = useRef();

    // ================================================================================================

    // if you type in input fields, label stays at the top -- input empty, label is inside of it -- and also upd the current input/textarea value
    const handleTyping = (e) => {
        dispatch({
            type: "move-labels",
            payload: e.target.value,
        });
        const [object, duplicates] = makeObject(state.textInputValue, state.textareaValue);
        if (Array.isArray(duplicates) && duplicates.length > 0) {
            dispatch({
                type: "notification",
                payload: `Note: Duplicate entries on these lines: ${duplicates.join(", ").trim()}.`,
            });
        }
    };

    // ================================================================================================

    // form submit is export
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const object = exportNotesJson(state.textInputValue, state.textareaValue);
        if (typeof object === "string") {
            dispatch({
                type: "toggle-modal",
                payload: object,
            });
        }
    };

    // ================================================================================================

    // preview is show modal window
    const onPreviewClick = () => {
        const [object, duplicates] = makeObject(state.textInputValue, state.textareaValue);
        dispatch({
            type: "toggle-modal",
            payload: object,
        });
        if (typeof object !== "string") {
            if (document.querySelector(".modal")) document.querySelector(".modal").remove();
            document.querySelector("body").insertAdjacentHTML("afterbegin", `<div class="modal"></div>`); // for React portals
        }
    };

    // ================================================================================================

    // are both inputs filled?
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
        const result = getLineNumbers(state.textareaValue);
        const pastedData = e.clipboardData.getData("text");
        console.log(pastedData);
        setTimeout(() => {
            const textareaMinimalHeight = Math.floor(window.innerHeight * 0.4);
            myTextarea.current.style.height = "auto";
            myTextarea.current.style.height = myTextarea.current.scrollHeight + "px";
            const textareaAfterReset = parseInt(window.getComputedStyle(myTextarea.current).height);
            if (textareaAfterReset > window.innerHeight) {
                myTextarea.current.style.height = "84vh";
            } else if (textareaAfterReset < textareaMinimalHeight) {
                myTextarea.current.style.height = Math.floor(window.innerHeight * 0.55) + "px";
            }

            console.log(state.textareaValue);
            const [object, duplicates] = makeObject(state.textInputValue, state.textareaValue);
            if (Array.isArray(duplicates) && duplicates.length > 0) {
                dispatch({
                    type: "notification",
                    payload: `Note: Duplicate entries on these lines: ${duplicates.join(", ").trim()}.`,
                });
            }
        }, 10);
    };

    // ================================================================================================

    // handling reset btn click
    const onResetClick = (e) => {
        myTextarea.current.style.height = Math.floor(window.innerHeight * 0.55) + "px";
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
