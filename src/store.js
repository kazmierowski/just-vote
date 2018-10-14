import { combineReducers } from 'redux';
import { menuReducer } from './Components/SideMenu/reducers';

export default combineReducers({
    menu: menuReducer
})