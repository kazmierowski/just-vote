import { combineReducers } from 'redux';
import { menuReducer } from './Components/SideMenu/reducers';
import { readyToVote, participantsReducer } from './mainReducer';
import { appReducer, namesReducer, userReducer } from "./reducer";

export default combineReducers({
    menu: menuReducer,
    readyToVote: readyToVote,
    participants: participantsReducer,
    user: userReducer,
    names: namesReducer,
    app: appReducer
})