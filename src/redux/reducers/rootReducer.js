import { combineReducers } from 'redux';
import userReducer from './userReducer';
import votesReducer from './votesReducer';

const rootReducer = combineReducers({
    user: userReducer,
    votes: votesReducer
})

export default rootReducer;

