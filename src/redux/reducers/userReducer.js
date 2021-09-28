const initalState = {
    text: ''
}

const userReducer = (state = initalState, action) => {
    const {payload} = action;
    switch(action.type) {
        case 'SET_TEXT':
            return {
                ...state,
                text: payload
            }
        default:
            return state;
    }

}

export default userReducer;