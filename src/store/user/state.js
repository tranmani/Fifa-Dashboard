import { Cookies, SessionStorage } from "quasar";

let token = "";

if (Cookies.has("token")) {
  token = Cookies.get("token");
} else if (SessionStorage.has("token")) {
  token = SessionStorage.getItem("token");
}

export default function() {
  return {
    user: {
      firstname: "",
      lastname: "",
      picture: "",
      role: ""
    },
    token: token
  };
}
