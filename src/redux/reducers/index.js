// Root reducer
import { combineReducers } from 'redux';


import authReducer from './authReducer';
import menuReducer from './menuReducer';



const rootReducer = combineReducers({
  auth: authReducer,
  menu: menuReducer,
});

export default rootReducer;
