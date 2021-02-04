<template>
  <div class="form-container">
    <h2 style="text-align: center">Sign up</h2>
    <!-- Email -->
    <q-form @submit="onSubmit">
      <q-input
        stack-label
        v-model="email"
        label="Email"
        lazy-rules
        :rules="[
          val => (val && val.length > 0) || 'Please type something',
          val => val.length < 30 || 'Email is too long'
        ]"
      >
        <template v-slot:prepend>
          <q-icon name="o_person" />
        </template>
      </q-input>

      <div class="row justify-between">
        <!-- Password -->
        <q-input
          stack-label
          class="col"
          v-model="password"
          label="Password"
          ref="password"
          lazy-rules
          no-error-icon
          :type="isPwd ? 'password' : 'text'"
          :rules="[val => val !== null && val.length > 7]"
          :error="!isPasswordMatch1"
          error-message="Passwords must match"
        >
          <template v-slot:prepend>
            <div class="row items-center all-pointer-events">
              <q-icon name="o_lock" />

              <q-tooltip
                content-class="bg-grey-8"
                anchor="top left"
                self="bottom left"
                :offset="[0, 8]"
                >Password should be longer than 8 characters</q-tooltip
              >
            </div>
          </template>
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>

        <div class="col-1"></div>

        <!-- Confirm password -->
        <q-input
          stack-label
          class="col"
          v-model="confirm"
          label="Confirm password"
          ref="passwordConfirm"
          lazy-rules
          no-error-icon
          :type="isPwd2 ? 'password' : 'text'"
          :rules="[val => val !== null && val.length > 7]"
          :error="!isPasswordMatch2"
          error-message="Passwords must match"
        >
          <template v-slot:prepend>
            <div class="row items-center all-pointer-events">
              <q-icon name="o_lock" />

              <q-tooltip
                content-class="bg-grey-8"
                anchor="top left"
                self="bottom left"
                :offset="[0, 8]"
                >Password should be longer than 8 characters</q-tooltip
              >
            </div>
          </template>
          <template v-slot:append>
            <q-icon
              :name="isPwd2 ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd2 = !isPwd2"
            />
          </template>
        </q-input>
      </div>

      <div class="row justify-between">
        <!-- First name -->
        <q-input
          stack-label
          class="col"
          v-model="firstname"
          label="First Name"
          lazy-rules
          no-error-icon
          :rules="[
            val =>
              (val !== null && val.length > 1) || 'Please type your first name',
            val => val.length < 15 || 'First name is too long'
          ]"
        >
          <template v-slot:prepend>
            <q-icon name="mdi-account-box-outline" />
          </template>
        </q-input>

        <div class="col-1"></div>

        <!-- Last name -->
        <q-input
          stack-label
          class="col"
          v-model="lastname"
          label="Last Name"
          lazy-rules
          no-error-icon
          :rules="[
            val =>
              (val !== null && val.length > 1) || 'Please type your last name',
            val => val.length < 15 || 'Last name is too long'
          ]"
        >
          <template v-slot:prepend>
            <q-icon name="mdi-account-box-outline" />
          </template>
        </q-input>
      </div>

      <!-- Select role -->
      <q-select
        class="role-select"
        v-model="role"
        :readonly="signupByCode"
        :options="!signupByCode ? options : optionsForeSporter"
        label="Your Role"
      />

      <!-- If role selected is Researcher -->
      <div v-if="role == 'Researcher'">
        <q-input
          stack-label
          v-model="organization"
          label="Organization"
          lazy-rules
          :rules="[
            val => (val && val.length > 0) || 'Please type something',
            val => val.length < 50 || 'Organization name is too long'
          ]"
        >
          <template v-slot:prepend>
            <q-icon name="fas fa-sitemap" />
          </template>
        </q-input>

        <q-input
          stack-label
          v-model="position"
          label="Your Position"
          lazy-rules
          :rules="[
            val => (val && val.length > 0) || 'Please type something',
            val => val.length < 30 || 'Position is too long'
          ]"
        >
          <template v-slot:prepend>
            <q-icon name="o_supervisor_account" />
          </template>
        </q-input>
      </div>

      <!-- If role selected is Coach -->
      <q-input
        v-if="role == 'Coach'"
        stack-label
        v-model="clubRegister"
        label="Club Name"
        lazy-rules
        :rules="[
          val => (val && val.length > 0) || 'Please type something',
          val => val.length < 30 || 'Club name is too long'
        ]"
      >
        <template v-slot:prepend>
          <q-icon name="fas fa-futbol" />
        </template>
      </q-input>

      <!-- If register using invite code -->
      <div v-if="signupByCode" class="coach-chip">
        <span
          >Your coach:
          <q-chip>
            <q-avatar color="secondary" text-color="white" icon="fas fa-user" />
            {{ coach }}
          </q-chip></span
        ><span>
          <q-chip>
            <q-avatar
              color="secondary"
              text-color="white"
              icon="fas fa-futbol"
            />
            {{ clubCoach }}
          </q-chip></span
        >
      </div>

      <!-- Submit button -->
      <div class="flex justify-center q-pt-md">
        <q-btn
          bordered
          unelevated
          label="Sign up"
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
  name: "SignupForm",
  components: {},
  props: {
    signupByCode: {
      type: Boolean,
      required: true
    },
    code: {
      type: String,
      required: false
    },
    coach: {
      type: String,
      required: false
    },
    coachEmail: {
      type: String,
      required: false
    },
    clubCoach: {
      type: String,
      required: false
    }
  },
  computed: {
    ...mapGetters("pokemon", ["card", "mobile"])
  },
  data() {
    return {
      email: "",
      password: "",
      confirm: "",
      firstname: "",
      lastname: "",
      role: "Coach",
      options: ["Coach", "Researcher"],
      optionsForeSporter: ["eSporter"],
      organization: "",
      position: "",
      clubRegister: "",
      isPwd: true,
      isPwd2: true,
      isPasswordMatch1: true,
      isPasswordMatch2: true
    };
  },
  watch: {
    confirm(val, oldVal) {
      if (val.length > 7) {
        if (val !== this.$refs.password.value) this.isPasswordMatch2 = false;
        else {
          this.isPasswordMatch2 = true;
          this.isPasswordMatch1 = true;
        }
      }
    },
    password(val, oldVal) {
      if (val.length > 7) {
        if (val !== this.$refs.passwordConfirm.value)
          this.isPasswordMatch1 = false;
        else {
          this.isPasswordMatch1 = true;
          this.isPasswordMatch2 = true;
        }
      }
    }
  },
  methods: {
    ...mapActions("user", ["updateUser", "updateUserToken"]),
    onSubmit() {
      this.$apollo
        .mutate({
          mutation: Login.signUp(),
          variables: {
            email: this.email,
            password: this.password,
            confirm: this.confirm,
            firstname: this.firstname,
            lastname: this.lastname,
            role: this.role,
            coach: this.coach,
            coachEmail: this.coachEmail,
            club: this.clubRegister || this.clubCoach,
            organization: this.organization,
            position: this.position
          }
        })
        .then(data => {
          this.$emit("done");
        })
        .catch(error => {
          if (error) {
            this.$emit("error", {
              message: error.graphQLErrors[0].message,
              error: true
            });
          }
        });
    }
  },
  created() {
    if (this.signupByCode) this.role = "eSporter";
  },
  beforeDestroy() {}
};
</script>

<style scoped>
.coach-chip {
  padding: 5px 0 10px 0;
}

.role-select {
  padding-bottom: 20px;
}

@media only screen and (max-width: 600px) {
  .form-container {
    padding: 10px;
  }
}
</style>
