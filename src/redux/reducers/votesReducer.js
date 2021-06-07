const initialState = {
    upvoted: 0,
    downvoted: 0,
    currentVotes: 0,
    status: null
}

const votesReducer = (state = initialState, action) => {
    const {type} = action;
    switch(type) {
        case 'UP': 
           return {
                ...state, 
                upvoted: state.upvoted + 1,
                status: true
            }
        case 'DOWN':
            return {
                ...state, 
                downvoted: state.downvoted + 1,
                status: false
            }
        case 'UNDO_UP':
            return {
                ...state,
                upvoted: state.upvoted - 1,
                status: null
            }
        case 'UNDO_DOWN':
            return {
                ...state,
                downvoted: state.downvoted - 1,
                status: null
            }
        default:
            return state;
    }
}

export default votesReducer;