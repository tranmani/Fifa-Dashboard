<template>
  <div class="form-container">
    <h2 style="text-align: center">Login</h2>
    <q-form @submit="onSubmit">
      <q-input
        v-model="email"
        label="Email"
        lazy-rules
        :rules="[val => (val && val.length > 0) || 'Please type something']"
      >
        <template v-slot:prepend>
          <q-icon name="o_person" />
        </template>
      </q-input>

      <q-input
        v-model="password"
        label="Password"
        lazy-rules
        :type="isPwd ? 'password' : 'text'"
        :rules="[
          val => (val !== null && val !== '') || 'Please type your password',
          val => val.length > 2 || 'Password should be longer than 8 characters'
        ]"
      >
        <template v-slot:prepend>
          <q-icon name="o_lock" />
        </template>
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>

      <div class="q-gutter-sm">
        <q-checkbox v-model="remember" color="secondary" label="Remember Me" />
      </div>

      <div class="flex justify-center q-pt-md">
        <q-btn
          bordered
          unelevated
          label="Login"
          type="submit"
          color="secondary"
          class="login-signup-btn no-border-radius"
        />
      </div>
    </q-form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import Login from "../../graphql/login";

export default {
  name: "LoginForm",
  components: {},
  props: {},
  computed: {
    ...mapGetters("user", ["user"])
  },
  data() {
    return {
      email: "minhhuy8137@gmail.com",
      password: "huyhuyhuy",
      isPwd: true,
      remember: false
    };
  },
  methods: {
    ...mapActions("user", ["updateUserToken"]),
    onSubmit() {
      this.$apollo
        .query({
          query: Login.login(),
          variables: {
            email: this.email,
            password: this.password
          }
        })
        .then(data => {
          this.$emit("done", {
            token: data.data.login.token,
            remember: this.remember
          });
        })
        .catch(error => {
          if (error) {
            this.$emit("error", {
              message: error.graphQLErrors[0].message,
              error: true
            });
          }
        });
    },
    updateRemember() {
      this.updateRememberMe();
    }
  },
  created() {},
  beforeDestroy() {}
};
</script>

<style scoped>
@media only screen and (max-width: 600px) {
  .form-container {
    padding: 10px;
  }
}
</style>
