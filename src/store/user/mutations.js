import { Cookies, SessionStorage } from "quasar";

export function updateUser(state, payload) {
  Object.assign(state.user, payload);
}
export function updateTokenCookie(state, payload) {
  SessionStorage.remove("token");
  Cookies.set("token", payload, { expires: 10 });
  state.token = payload;
}
export function updateTokenSession(state, payload) {
  try {
    Cookies.remove("token");
    SessionStorage.set("token", payload);
  } catch (e) {
    console.log(e);
  }
  state.token = payload;
}
export function addChat(state, payload) {
  state.user.chats.push({ id: payload, unread: 0 });
}
export function deleteChat(state, payload) {
  const index = state.user.chats.findIndex(chat => chat.id == payload);
  state.user.chats.splice(index, 1);
}
export function addChannel(state, payload) {
  state.user.channels.push({ id: payload, unread: 0 });
}
export function logout(state) {
  SessionStorage.remove("token");
  Cookies.remove("token");
  state.token = "";
  state.user = {};
}
