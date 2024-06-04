import { createStore } from 'redux'
import { persistedReducer } from './reducers/rootReducer'

const store = createStore(persistedReducer)

export default store
