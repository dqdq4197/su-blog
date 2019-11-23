import authentication from './authentication';
import posts from './posts';
import home from './home';

import { combineReducers } from 'redux';

export default combineReducers({
    authentication,
    posts,
    home,
});