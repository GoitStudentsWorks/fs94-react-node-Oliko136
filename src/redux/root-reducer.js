import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authReducer } from './auth/auth-slice';
import { themeReducer } from './theme/theme-slice';
import { needhelpReducer } from './needhelp/needhelpSlice';
import { boardReducer } from './boards/boards-slice';
import { columnReducer } from './column/column-slice';
import { cardReducer } from './cards/cards-slice';
import {filterReducer} from './filter/filter-slice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['token', 'selectedTheme'],
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedThemeReducer = persistReducer(persistConfig, themeReducer);
const persistedneedhelpReducer = persistReducer(persistConfig, needhelpReducer);
const persistedFilterReducer = persistReducer(persistConfig, filterReducer);

const rootReducer = combineReducers({
  auth: persistedAuthReducer,
  theme: persistedThemeReducer,
  boards: boardReducer,
  columns: columnReducer,
  cards: cardReducer,
  needhelp: persistedneedhelpReducer,
  filter: persistedFilterReducer,
});

export default rootReducer;
