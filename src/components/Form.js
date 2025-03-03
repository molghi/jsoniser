import { useReducer } from "react";
import { createPortal } from "react-dom";

import "./Form.css";
import FormInput from "./FormInput";
import FormTextarea from "./FormTextarea";
import FormButtons from "./FormButtons";
import stateReducer from "./stateReducer";
import Modal from "./Modal";
import { exportNotesJson, makeObject } from "./export";

// ================================================================================================

const initialState = {
    inputLabelMovedUp: false,
    inputTextareaMovedUp: false,
    textInputValue: "",
    textareaValue: "",
    modalShown: false,
    jsonised: "",
    error: "",
    isTyping: false,
};

function Form() {
    const [state, dispatch] = useReducer(stateReducer, initialState);
    console.log(state);

    // ================================================================================================

    // if you type in input fields, label stays at the top -- input empty, label is inside of it -- and also upd the current input/textarea value
    const handleTyping = (e) => {
        dispatch({
            type: "move-labels",
            payload: e.target.value,
        });
    };

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

    // preview is show modal window
    const onPreviewClick = () => {
        const object = makeObject(state.textInputValue, state.textareaValue);
        dispatch({
            type: "toggle-modal",
            payload: object,
        });
        if (typeof object !== "string") {
            if (document.querySelector(".modal")) document.querySelector(".modal").remove();
            document.querySelector("body").insertAdjacentHTML("afterbegin", `<div class="modal"></div>`); // for React portals
        }
    };

    // are both inputs filled?
    const inputsAreFilled = [state.textInputValue, state.textareaValue].every((item) => item.length > 0);

    // hide modal
    const hideModal = () => {
        dispatch({
            type: "hide-modal",
        });
    };

    // ================================================================================================

    return (
        <div className="form">
            <form onSubmit={handleFormSubmit} className="form__itself">
                <FormInput onChange={handleTyping} labelMovedUp={state.inputLabelMovedUp} />
                <FormTextarea onChange={handleTyping} labelMovedUp={state.inputTextareaMovedUp} />
                <FormButtons
                    onPreviewClick={onPreviewClick}
                    inputsAreFilled={inputsAreFilled}
                    error={state.error}
                    isTyping={state.isTyping}
                />

                {state.modalShown &&
                    createPortal(<Modal data={state.jsonised} onClick={hideModal} />, document.querySelector(".modal"))}
            </form>
        </div>
    );
}

export default Form;
