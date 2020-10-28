
import {createStore} from 'redux'
import state from './state.js'

export default createStore((state=state,actions=>{
    return state
}))