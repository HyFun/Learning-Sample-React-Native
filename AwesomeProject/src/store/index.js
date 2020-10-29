import {createStore} from 'redux';
import State from './state';
import Actions from './actions';

export default createStore(
  (state = State,actions) => {
    // 判断Actons中是否有此操作
    console.log('actions过来了', actions);
    if(!actions) {
        return state
    }
    if (Actions[actions.type]) {
      if (actions.value) {
        return {...Actions[actions.type](state, actions.value)};
      } else {
        return {...Actions[actions.type](state)};
      }
    }
    return state;
  }
);
