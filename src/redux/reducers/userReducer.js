const initalState = {
    user: '',
    id: '',
    loggedIn: false,
    text: ''
}

const userReducer = (state = initalState, action) => {
    const {payload} = action;
    switch(action.type) {
        case 'SET_USER': 
           return {
                    ...state,
                    user: payload
            } 
        case 'SET_ID':
            return {
                ...state,
                id: payload
            }
        case 'LOG_IN':
            return {
                ...state,
                loggedIn: true
            }
        case 'LOG_OUT':
            return {
                ...state,
                loggedIn: false
            }
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