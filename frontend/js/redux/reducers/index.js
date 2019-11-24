import { combineReducers } from 'redux';

import repositories from './repositories';
import commits from './commits';
import base from './base';

export default combineReducers({ repositories, commits, base });
