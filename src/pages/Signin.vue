<template
  ><q-layout>
    <q-page-container>
      <q-page class="flex flex-center">
        <q-card flat bordered class="card no-border-radius no-box-shadow ">
          <q-tabs
            v-model="tab"
            class="bg-grey-3 text-grey-7"
            indicator-color="primary"
            active-color="secondary"
            align="justify"
            narrow-indicator
          >
            <q-tab name="login" label="Login" />
            <q-tab name="signup" label="Sign up" />
          </q-tabs>

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="login">
              <LoginForm
                v-on:error="showNotification"
                v-on:done="getUserByToken"
              />
            </q-tab-panel>

            <q-tab-panel name="signup" class="full-height">
              <SignupForm
                v-on:error="showNotification"
                v-on:done="doneSignup"
                :signupByCode="signupByCode"
                :code="signupCode"
                :coach="coach"
                :clubCoach="club"
                :coachEmail="coachEmail"
                :error="showNotification"
              />
            </q-tab-panel>
          </q-tab-panels>
        </q-card> </q-page
    ></q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import LoginForm from "../components/Signin/LoginForm";
import SignupForm from "../components/Signin/SignupForm";

import Login from "../graphql/login";

export default {
  name: "Signin",
  components: {
    LoginForm,
    SignupForm
  },
  data() {
    return {
      tab: "login",
      signupByCode: false,
      signupCode: "",
      coach: "",
      coachEmail: "",
      club: ""
    };
  },
  computed: {
    ...mapGetters("user", ["user", "token"])
  },
  created() {
    if (this.token) {
      this.$router.push({
        path: "/dashboard"
      });
    } else if (this.$route.query.code) {
      this.getCode(this.$route.query.code);
    }
  },
  methods: {
    ...mapActions("user", [
      "updateUser",
      "updateTokenCookie",
      "updateTokenSession",
      "logout"
    ]),
    getUserByToken(payload) {
      this.$apollo
        .query({
          query: Login.getUserByToken(),
          variables: {
            token: payload.token
          }
        })
        .then(data => {
          this.updateUser(data.data.getUserByToken);
          if (payload.remember) this.updateTokenCookie(payload.token);
          else this.updateTokenSession(payload.token);

          // this.$router.push({ path: "/filter" });
          this.$router.go();
        })
        .catch(error => {
          if (error) {
            this.showNotification({
              message: error.graphQLErrors[0].message,
              error: true
            });
          }
        });
    },
    getCode(code) {
      this.$apollo
        .query({
          query: Login.getCode(),
          variables: {
            code
          }
        })
        .then(data => {
          const coach = data.data.useSignupCode;
          this.signupCode = coach.code;
          this.coach = `${coach.firstname} ${coach.lastname}`;
          this.coachEmail = coach.email;
          this.signupByCode = true;
          this.tab = "signup";
          this.club = coach.club;
        })
        .catch(error => {
          if (error) {
            this.showNotification({
              message: error.graphQLErrors[0].message,
              error: true
            });
          }
        });
    },
    doneSignup() {
      this.tab = "login";
      this.showNotification({ message: "Success", error: false });
    },
    showNotification(payload) {
      let color, icon;
      if (payload.error) {
        color = "negative";
        icon = "o_new_releases";
      } else {
        color = "positive";
        icon = "fas fa-check-circle";
      }
      this.$q.notify({
        message: payload.message,
        color: color,
        icon: icon,
        actions: [
          {
            label: "Dismiss",
            color: "white",
            handler: () => {
              /* ... */
            }
          }
        ]
      });
      if (payload.message == "Authentication token is invalid, please log in") {
        this.logout();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.card {
  width: 30%;
}

@media only screen and (min-width: 1921px) {
}
@media only screen and (max-width: 1920px) {
}
@media only screen and (max-width: 1500px) {
  .card {
    width: 40%;
  }
}
@media only screen and (max-width: 1200px) {
  .card {
    width: 45%;
  }
}
@media only screen and (max-width: 900px) {
  .card {
    width: 70%;
  }
}
@media only screen and (max-width: 600px) {
  .card {
    width: 100%;
  }
}
</style>
