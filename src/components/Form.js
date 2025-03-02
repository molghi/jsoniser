import { useReducer } from "react";
import ReactDOM from "react-dom/client";
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
};

function Form() {
    const [state, dispatch] = useReducer(stateReducer, initialState);
    let object;
    console.log(state);

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
        exportNotesJson(state.textInputValue, state.textareaValue);
    };

    // preview is show modal window
    const onPreviewClick = () => {
        object = makeObject(state.textInputValue, state.textareaValue);
        dispatch({
            type: "toggle-modal",
            payload: object,
        });
        if (document.querySelector(".modal")) document.querySelector(".modal").remove();
        document.querySelector("body").insertAdjacentHTML("afterbegin", `<div class="modal"></div>`); // for React portals
    };

    return (
        <div className="form">
            <form onSubmit={handleFormSubmit} className="form__itself">
                <FormInput onChange={handleTyping} labelMovedUp={state.inputLabelMovedUp} />
                <FormTextarea onChange={handleTyping} labelMovedUp={state.inputTextareaMovedUp} />
                <FormButtons onPreviewClick={onPreviewClick} />

                {state.modalShown && createPortal(<Modal data={state.jsonised} />, document.querySelector(".modal"))}
            </form>
        </div>
    );
}

export default Form;
