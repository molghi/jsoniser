import { useRef, useContext } from "react";
import { createPortal } from "react-dom";

import "./Form.css";
import FormInput from "./FormInput";
import FormTextarea from "./FormTextarea";
import FormButtons from "./FormButtons";
import Modal from "./Modal";
import MyContext from "../context/MyContext";

// ================================================================================================

function Form() {
    const {
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
    } = useContext(MyContext);

    console.log(state);

    return (
        <div className="form">
            <form onSubmit={handleFormSubmit} className="form__itself">
                <FormInput onChange={handleTyping} labelMovedUp={state.inputLabelMovedUp} eventHappened={state.eventHappened} />
                <FormTextarea
                    onChange={handleTyping}
                    labelMovedUp={state.inputTextareaMovedUp}
                    onPaste={handlePaste}
                    ref={myTextarea}
                    eventHappened={state.eventHappened}
                />
                <FormButtons
                    onPreviewClick={onPreviewClick}
                    inputsAreFilled={inputsAreFilled}
                    error={state.error}
                    notification={state.notification}
                    isTyping={state.isTyping}
                    state={state}
                    onResetClick={onResetClick}
                />

                {state.modalShown &&
                    createPortal(<Modal data={state.jsonised} onClick={hideModal} />, document.querySelector(".modal"))}
            </form>
        </div>
    );
}

export default Form;
