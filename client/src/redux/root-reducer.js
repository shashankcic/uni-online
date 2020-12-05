import { combineReducers } from 'redux';

import userReducer from './user/user-reducer';
import profileReducer from './profile/profile-reducer';
import postReducer from './post/post-reducer';
import messageReducer from './message/message-reducer';
import alertReducer from './alert/alert-reducer';

export default combineReducers({
    user: userReducer,
    profile: profileReducer,
    post: postReducer,
    messages: messageReducer,
    alert: alertReducer
});