import Vue from "vue";
import Vuex from "vuex";

import user from "./user";
import filter from "./filter";
import dashboard from "./dashboard";
import community from "./community";
import compare from "./compare";
import setting from "./setting";
import util from "./util";

Vue.use(Vuex);
let store = null;
/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function(/* { ssrContext } */) {
  store = new Vuex.Store({
    modules: {
      user,
      filter,
      dashboard,
      community,
      compare,
      setting,
      util
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  });

  return store;
}
export { store };
