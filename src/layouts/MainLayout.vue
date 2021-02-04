<template>
  <q-layout view="hHh lpR fff" class="bg-page">
    <!-- Menu -->
    <div
      class="row"
      :class="token ? `menu-container-loggedin` : `menu-container-notLoggedin`"
    >
      <!-- Left side nav bar -->
      <div class="btn-menu-left" v-if="token">
        <div class="row">
          <div
            v-if="currentTeam.name || currentPlayer.email"
            class="arrow-bottom-left"
          ></div>
          <div
            v-if="currentTeam.name || currentPlayer.email"
            class="team-name-section row"
            :class="currentTeam.picture ? 'justify-around' : 'text-center'"
          >
            <q-img
              v-if="currentTeam.picture"
              class="col-auto"
              contain
              :src="currentTeam.picture"
              style="height: 40px; width: 40px"
            />
            <span
              class="col-grow team-name"
              v-if="currentTeam.name && !currentPlayer.email"
            >
              {{ currentTeam.name }}</span
            >
            <span
              class="col team-name"
              v-if="
                (currentTeam.name && currentPlayer.email) ||
                  (!currentTeam.name && currentPlayer.email)
              "
            >
              <!-- Truncate player name if it is longer than 19 charactors -->
              {{
                (currentPlayer.firstname + " " + currentPlayer.lastname)
                  | truncate(19)
              }}</span
            >
          </div>

          <q-btn
            unelevated
            v-if="user.role == 'Researcher' || user.role == 'Coach'"
            class="btn-fixed-width q-mr-md q-py-xs no-border-radius"
            :class="isRouteActive('filter')"
            label="Team Overview"
            to="/filter"
          />
          <q-btn
            unelevated
            v-if="user.role == 'eSporter'"
            class="btn-fixed-width q-mr-md q-py-xs no-border-radius"
            :class="isRouteActive('dashboard')"
            label="Dashboard"
            to="/dashboard"
          />
          <q-btn
            unelevated
            v-if="
              user.role == 'Researcher' ||
                user.role == 'Coach' ||
                user.role == 'eSporter'
            "
            class="btn-fixed-width q-py-xs no-border-radius"
            :class="isRouteActive('community')"
            label="Community"
            to="/community"
          />
        </div>
      </div>

      <q-space />

      <!-- Right side nav bar -->
      <div
        class="arrow-top-right"
        v-if="
          user.role == 'Researcher' ||
            user.role == 'Coach' ||
            user.role == 'eSporter'
        "
      ></div>
      <div
        class="btn-menu-right"
        v-if="
          user.role == 'Researcher' ||
            user.role == 'Coach' ||
            user.role == 'eSporter'
        "
      >
        <span>
          {{ username }}
        </span>
        <router-link to="/setting">
          <q-img
            :src="user.picture"
            style="height: 44px; width: 44px"
            class="header-avatar"
          >
            <q-tooltip content-class="bg-grey-8">Setting</q-tooltip>
          </q-img>
        </router-link>
        <q-btn
          flat
          square
          v-if="token"
          @click="logoutBtn"
          size="16px"
          class="q-px-sm"
        >
          <q-tooltip content-class="bg-grey-8">Logout</q-tooltip>
          <q-icon color="black" name="exit_to_app"></q-icon>
        </q-btn>
      </div>
    </div>

    <!-- left Tabs for dashboard -->
    <transition
      name="slide-right-back-dashboard"
      v-if="currentPlayer.email || user.role == 'eSporter'"
    >
      <div
        class="tabs-container z-top"
        v-if="$route.name == 'dashboard' && width >= 1200"
      >
        <q-tabs
          v-model="tab"
          vertical
          align="justify"
          active-bg-color="secondary"
          active-color="white"
          indicator-color="transparent"
          class="bg-white"
          @input="updateDashboardExpand('')"
        >
          <q-tab name="match">
            <q-icon name="bar_chart" size="xl"></q-icon>
          </q-tab>
          <q-tab name="matchDetail">
            <q-icon name="fas fa-history" size="md"></q-icon>
          </q-tab>
        </q-tabs>
      </div>
    </transition>

    <q-page-container class="container-page">
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </q-page-container>

    <transition name="slide-up">
      <q-tabs
        v-if="$route.name == 'dashboard' && width <= 1200"
        v-model="tab"
        class="bg-white shadow-2 fixed-bottom"
        @input="updateDashboardExpand('')"
      >
        <q-tab name="match" icon="bar_chart" />
        <q-tab name="matchDetail" icon="fas fa-history" />
      </q-tabs>
    </transition>
  </q-layout>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "MainLayout",
  data() {
    return {
      width: 0
    };
  },
  computed: {
    ...mapGetters("user", ["user", "token"]),
    ...mapGetters("filter", ["currentTeam", "currentPlayer"]),
    ...mapGetters("dashboard", ["tabModel"]),
    username() {
      return this.user.firstname + " " + this.user.lastname;
    },
    tab: {
      get() {
        return this.tabModel;
      },
      set(val) {
        this.updateTabModel(val);
      }
    }
  },
  filters: {
    truncate(text, length) {
      if (text.length > length) {
        return text.substring(0, length) + "...";
      } else {
        return text;
      }
    }
  },
  mounted() {
    this.$nextTick(function() {
      window.addEventListener("resize", this.onResize);
      this.onResize();
    });
  },
  methods: {
    ...mapActions("user", [
      "updateUser",
      "updateUserToken",
      "logout",
      "getLoggedInUserInfo"
    ]),
    ...mapActions("dashboard", ["updateTabModel", "updateDashboardExpand"]),
    ...mapActions("util", ["updateMobile"]),
    logoutBtn() {
      this.logout();
      this.$router.push({
        path: "/"
      });
    },
    isRouteActive(route) {
      if (route == "filter") {
        if (this.$route.name == "filter") return "header-btn-active";
        else return "header-btn";
      } else if (route == "community") {
        if (this.$route.name == "community") return "header-btn-active";
        else return "header-btn";
      } else if (route == "dashboard") {
        if (this.$route.name == "dashboard") return "header-btn-active";
        else return "header-btn";
      }
    },
    onResize() {
      if (window.innerWidth <= 1028) {
        this.updateMobile("sm");
      }
      if (window.innerWidth >= 1029) {
        this.updateMobile("md");
      }
      this.width = window.innerWidth;
    }
  }
};
</script>

<style lang="scss" scoped>
.container-page {
  width: 85%;
  position: fixed;
  right: 0;
  left: 0;
  margin-right: auto;
  margin-left: auto;
}

.bg-page {
  background-image: url("https://fifadashboard.s3.eu-central-1.amazonaws.com/bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}

.menu-list .q-item {
  border-radius: 0 32px 32px 0;
}

.menu-container-loggedin {
  justify-items: center;
  display: flex;
}

.menu-container-loggedin {
  padding: 3% 0 2% 0;
}

.menu-container-notLoggedin {
  padding: 5% 0 0 0;
}

.btn-menu-left {
  height: 44px;
  margin-left: 7.5%;

  & .arrow-bottom-left {
    width: 0;
    height: 0;
    border-top: 44px solid transparent;
    border-left: 44px solid rgba(255, 52, 39, 0.7);
    transform: rotate(-90deg);
  }

  & .team-name-section {
    height: 44px;
    width: 200px;
    background-image: $secondaryLeftToRight;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;

    & .team-name {
      font-size: 1.2em;
      color: white;
      user-select: none;
    }
  }

  & .btn-fixed-width {
    width: 200px;
  }

  & .header-btn {
    background-color: white;
    color: black;
  }

  & .header-btn-active {
    background-image: $secondaryLeftToRight;
    color: white;
  }
}

.btn-menu-right {
  height: 44px;
  background: $accent;
  color: white;

  & span {
    margin: 0 48px;
    font-size: 1.3em;
    color: black;
    height: 44px;
    user-select: none;
    vertical-align: middle;
  }

  & .header-avatar {
    cursor: pointer;
  }
}

.logout-btn {
  height: 44px;
}

.arrow-top-right {
  width: 0;
  height: 0;
  border-bottom: 44px solid transparent;
  border-left: 44px solid $accent;
  transform: rotate(90deg);
}

.tabs-container {
  position: fixed;
  width: 60px;
  margin: 3% 0 0 0;

  & .q-tab {
    min-height: 60px;
  }
}

@media only screen and (max-width: 1920px) {
  .menu-container-loggedin {
    padding: 3% 0 2% 0;
  }
}

@media only screen and (max-width: 1400px) {
}

@media only screen and (max-width: 1200px) {
  .btn-menu-left {
    margin-left: 0;
  }

  .container-page {
    width: 100%;
  }
}

@media only screen and (max-width: 1086px) {
  .arrow-bottom-left,
  .arrow-top-right,
  .team-name-section {
    display: none;
  }
  .btn-menu-left .btn-fixed-width {
    width: 150px;
  }
}

@media only screen and (max-width: 980px) {
}

@media only screen and (max-width: 600px) {
}
</style>
