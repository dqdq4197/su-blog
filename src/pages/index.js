import 'semantic-ui-css/semantic.min.css';

import JavascriptTimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en'
import ru from 'javascript-time-ago/locale/ru'
 
// Initialize the desired locales.
JavascriptTimeAgo.locale(en)
JavascriptTimeAgo.locale(ru)

export { default as About} from './About';
export { default as Login } from './Login';
export { default as Home } from './Home';
export { default as Board} from './Board';
export { default as Signup} from './Signup';
export { default as Poster} from './Poster';
export { default as Search} from './Search';