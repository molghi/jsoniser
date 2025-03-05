function stateReducer(state, action) {
    // console.log(action);

    switch (action.type) {
        case "typing-event":
            const activeEl = document.activeElement.tagName;
            const activeElName = activeEl === "INPUT" ? "textInputValue" : "textareaValue";
            const activeElNameLabel = activeEl === "INPUT" ? "inputLabelMovedUp" : "inputTextareaMovedUp";

            if (action.payload.length > 0) {
                // payload is input value
                return {
                    ...state,
                    [activeElNameLabel]: true, // a piece of state responsible for 'is the label moved up or not?'
                    [activeElName]: action.payload, // a piece of state responsible for holding the current value of input/textarea
                    isTyping: true,
                    eventHappened: "",
                    notification: "", // notification string
                    error: "", // error string
                };
            } else {
                return {
                    ...state,
                    [activeElNameLabel]: false,
                    [activeElName]: action.payload,
                    isTyping: true,
                    eventHappened: "",
                    notification: "",
                    error: "",
                };
            }

        // ================================================================================================

        case "btn-clicked":
            // either Preview or Export btn was clicked
            if (typeof action.payload === "string" && action.payload.length > 0) {
                // payload is either json to be exported or the error string/message (if input was incorrect)
                return {
                    ...state,
                    error: action.payload,
                    isTyping: false,
                };
            } else {
                return {
                    ...state,
                    error: "",
                    isTyping: false,
                    modalShown: !state.modalShown,
                    jsonised: action.payload,
                };
            }

        // ================================================================================================

        case "notification":
            // just notifying that 'values' has duplicated entries on some lines
            // payload is notification string/message
            return {
                ...state,
                notification: action.payload,
            };

        // ================================================================================================

        case "reset":
            // Reset btn was clicked
            // payload is the event object
            return {
                ...state,
                textInputValue: "",
                textareaValue: "",
                inputLabelMovedUp: false,
                inputTextareaMovedUp: false,
                eventHappened: action.payload,
                error: "",
                notification: "",
            };

        // ================================================================================================

        case "hide-modal":
            // click to hide the modal window happened
            // no payload
            return {
                ...state,
                modalShown: false,
                isTyping: false,
            };

        // ================================================================================================

        case "textarea-line-numbers":
            // show textarea line numbers (TextareaLines)
            // payload is an array containing heights of each logical line in textarea
            return {
                ...state,
                textareaLineNumbers: action.payload,
            };

        // ================================================================================================

        default:
            return console.error(`Unknown action type`);
    }

    return state;
}

export default stateReducer;
