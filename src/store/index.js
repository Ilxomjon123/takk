import { createStore } from 'vuex';
import main from './main';
import sideMenu from './side-menu';
import simpleMenu from './simple-menu';
import topMenu from './top-menu';
import user from './user';

const store = createStore({
  modules: {
    main,
    sideMenu,
    simpleMenu,
    topMenu,
    user
  }
});

export function useStore() {
  return store;
}

export default store;
