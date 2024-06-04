
import { combineReducers, createStore } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from '../storage'
import likeReducer from './likeReducer'
import authReducer from './authReducer'
import persistStore from 'redux-persist/es/persistStore'

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  likes: likeReducer,
  auth: authReducer,
})

export const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = createStore(persistedReducer) 
export const persistor = persistStore(store)

export type RootState = ReturnType<typeof rootReducer>
