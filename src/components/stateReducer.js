function stateReducer(state, action) {
    console.log(action);
    switch (action.type) {
        case "move-labels":
            const activeEl = document.activeElement.tagName;
            const activeElName = activeEl === "INPUT" ? "textInputValue" : "textareaValue";
            const activeElNameLabel = activeEl === "INPUT" ? "inputLabelMovedUp" : "inputTextareaMovedUp";
            if (action.payload.length > 0) {
                return {
                    ...state,
                    [activeElNameLabel]: true, // a piece of state responsible for 'is the label moved up or not?'
                    [activeElName]: action.payload, // a piece of state responsible for holding the current value of input/textarea
                    isTyping: true,
                };
            } else {
                return {
                    ...state,
                    [activeElNameLabel]: false, // a piece of state responsible for 'is the label moved up or not?'
                    [activeElName]: action.payload, // a piece of state responsible for holding the current value of input/textarea
                    isTyping: true,
                };
            }
            return state;

        case "toggle-modal":
            if (typeof action.payload === "string" && action.payload.length > 0) {
                return {
                    ...state,
                    error: action.payload,
                    isTyping: false,
                };
            } else {
                return {
                    ...state,
                    error: "",
                    modalShown: !state.modalShown,
                    jsonised: action.payload,
                    isTyping: false,
                };
            }

        case "hide-modal":
            return {
                ...state,
                modalShown: false,
                isTyping: false,
            };

        default:
            return console.log(`Unknown action type`);
    }

    return state;
}

export default stateReducer;
