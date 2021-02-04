<template>
  <q-card flat class="no-border-radius q-pa-md">
    <div>
      <span class="channel-creation-text">Name of Channel</span>
      <q-input
        dense
        filled
        square
        v-model="name"
        standout="bg-accent"
        color="accent"
        bg-color="accent"
      />
    </div>

    <div class="q-py-md">
      <div class="row justify-between items-center">
        <span class="channel-creation-text">Add Members</span>
        <q-btn
          dense
          size="sm"
          color="secondary"
          icon="add"
          class="no-border-radius shadow-7"
          @click="openAddMember"
          ><q-tooltip content-class="bg-primary">Add Members</q-tooltip></q-btn
        >
      </div>
    </div>

    <div class="row justify-around q-pb-md">
      <CurrentSelectedUser
        v-for="(selection, id) in selectedMembersCreate.slice(0, 6)"
        :key="selection.name"
        :name="id == 5 ? andOther : selection.name"
      />
    </div>

    <q-btn
      dense
      color="secondary"
      class="no-border-radius q-px-md shadow-7"
      label="Create Channel"
      @click="createChannelMethod"
    />
  </q-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import CurrentSelectedUser from "./CurrentSelectedUser";

export default {
  name: "ChanelCreation",
  components: {
    CurrentSelectedUser
  },
  data() {
    return {
      isAddUser: false
    };
  },
  computed: {
    ...mapGetters("community", [
      "selectedMembersCreate",
      "channelNameCreation"
    ]),
    // Calculate the remaining number of selected user
    andOther() {
      const other = this.selectedMembersCreate.length - 5;
      return `+${other} others`;
    },
    name: {
      get() {
        return this.channelNameCreation;
      },
      set(val) {
        this.updateChannelNameCreation(val);
      }
    }
  },
  methods: {
    ...mapActions("community", [
      "updateAddMemberChannelCreation",
      "createChannel",
      "updateChannelCreation",
      "updateChannelNameCreation"
    ]),
    openAddMember() {
      this.updateAddMemberChannelCreation(true);
    },
    createChannelMethod() {
      if (!this.channelNameCreation.match(/\S/g)) {
        this.showNotification("Channel name should not be empty!");
        return;
      }
      if (this.selectedMembersCreate.length == 0) {
        this.showNotification("Channel should have at least 1 member!");
        return;
      }

      this.createChannel({
        channelName: this.channelNameCreation,
        users: this.selectedMembersCreate.map(selected => selected.email)
      });
      this.updateChannelCreation(false);
    },
    // Show error notification from GraphQL call
    showNotification(message) {
      this.$q.notify({
        message: message,
        color: "negative",
        icon: "o_new_releases",
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
    }
  }
};
</script>

<style lang="scss" scoped>
.channel-creation-text {
  font-size: 1.2em;
  user-select: none;
}
</style>
