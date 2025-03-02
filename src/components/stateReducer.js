function stateReducer(state, action) {
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
                };
            } else {
                return {
                    ...state,
                    [activeElNameLabel]: false, // a piece of state responsible for 'is the label moved up or not?'
                    [activeElName]: action.payload, // a piece of state responsible for holding the current value of input/textarea
                };
            }
            return state;

        case "toggle-modal":
            return {
                ...state,
                modalShown: !state.modalShown,
                jsonised: action.payload,
            };

        default:
            return console.log(`Unknown action type`);
    }

    return state;
}

export default stateReducer;
