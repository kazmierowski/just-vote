import { combineReducers } from 'redux';
import { menuReducer } from './Components/SideMenu/reducers';
import { readyToVote, namesReducer, participantsReducer } from './mainReducer';
import { userReducer } from "./reducer";
import { appReducer } from "./reducer";

export default combineReducers({
    menu: menuReducer,
    readyToVote: readyToVote,
    participants: participantsReducer,
    user: userReducer,
    names: namesReducer,
    app: appReducer
})