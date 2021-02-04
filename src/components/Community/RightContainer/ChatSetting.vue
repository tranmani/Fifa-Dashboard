<template>
  <q-card elevated class="no-border-radius q-pa-md" id="chat-setting-container">
    <div class="row justify-between items-center">
      <div>
        <h5 class="text">Settings</h5>
      </div>
      <!-- Close button -->
      <div>
        <q-btn
          dense
          size="md"
          color="secondary"
          icon="close"
          class="no-border-radius shadow-7"
          @click="closeChatSetting"
        />
      </div>
    </div>

    <div class="row items-center q-mt-lg q-mb-sm" v-if="currentChat.isChannel">
      <div>
        <h6 class="text">
          {{ !addMemberSetting ? "Members" : "Add Members" }}
        </h6>
      </div>
      <!-- Add button -->
      <div v-if="user.email == currentChat.owner.email">
        <q-btn
          dense
          size="sm"
          color="secondary"
          :icon="!addMemberSetting ? 'add' : 'close'"
          class="no-border-radius q-ml-md shadow-7"
          @click="openAddMember"
          ><q-tooltip v-if="!addMemberSetting" content-class="bg-primary"
            >Add Members</q-tooltip
          ></q-btn
        >
      </div>
    </div>

    <div class="q-mt-lg q-mb-sm" v-else>
      <div>
        <h6 class="text q-mb-sm">
          Chat Members
        </h6>
        <SearchItem
          :isUser="true"
          :inverted="true"
          :name="currentChat.user1.displayName"
          :picture="currentChat.user1.picture"
        />
        <SearchItem
          :isUser="true"
          :inverted="true"
          :name="currentChat.user2.displayName"
          :picture="currentChat.user2.picture"
        />
      </div>
    </div>

    <!-- Add members component -->
    <div v-if="!addMemberSetting && currentChat.isChannel" :key="'member'">
      <SearchItem v-bind="channelOwner" :inverted="true" :isUser="true" />

      <q-scroll-area
        ref="scrollAreaMembers"
        :thumb-style="scrollStyle"
        :bar-style="barStyle"
        class="scroll-area"
      >
        <SearchItem
          v-for="user in channelMembers"
          :key="user.email"
          v-bind="user"
          v-on:remove-member="removeMember"
          :inverted="true"
          :isUser="true"
          :isChatSetting="isChannelOwner"
        />
      </q-scroll-area>
    </div>
    <div
      v-if="addMemberSetting && currentChat.isChannel"
      :key="'addMemberSetting'"
    >
      <UserSearchChatSetting :members="channelMembersAndOwnerEmail" />
    </div>

    <!-- Leave and delete chat button -->
    <div class="leave-btn">
      <div v-if="currentChat.isChannel">
        <SearchItem :leaveChannel="true" v-on:leave-channel="leave" />
      </div>
      <div v-else>
        <SearchItem :deleteChat="true" v-on:delete-chat="deleteChatMethod" />
      </div>
    </div>
  </q-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import UserSearch from "../LeftContainer/UserSearch";
import SearchItem from "../LeftContainer/SearchItem";
import UserSearchChatSetting from "./UserSearchChatSetting";

export default {
  name: "ChatSetting",
  components: {
    SearchItem,
    UserSearch,
    UserSearchChatSetting
  },
  data() {
    return {
      scrollStyle: {
        backgroundColor: "secondary",
        width: "6px",
        opacity: 0.75,
        right: "-11px"
      },
      barStyle: {
        right: "-11px"
      }
    };
  },
  computed: {
    ...mapGetters("user", ["user"]),
    ...mapGetters("community", ["currentChat", "addMemberSetting"]),
    channelMembers() {
      let members = this.currentChat.users.map(e => e);
      return members;
    },
    channelOwner() {
      return this.currentChat.owner;
    },
    channelMembersAndOwnerEmail() {
      let members = this.currentChat.users.map(e => e.email);
      members.push(this.currentChat.owner.email);
      return members;
    },
    isChannelOwner() {
      return this.currentChat.owner.email == this.user.email;
    }
  },
  methods: {
    ...mapActions("community", [
      "updateChatSetting",
      "removeMemberFromChannel",
      "leaveChannel",
      "deleteChat",
      "emptySelectedMembersSetting",
      "updateAddMemberSetting"
    ]),
    changeSearchMode(e) {
      this.updateSearchModeCompare(e);
    },
    removeMember(email) {
      if (this.user.email == email) {
        this.leave();
      } else {
        this.removeMemberFromChannel({
          id: this.currentChat.id,
          owner: this.user.email,
          user: email
        });
      }
    },
    leave() {
      this.leaveChannel({ id: this.currentChat.id, user: this.user.email });
      this.updateChatSetting(false);
    },
    deleteChatMethod() {
      this.deleteChat({ id: this.currentChat.id, user: this.user.email });
      this.updateChatSetting(false);
    },
    openAddMember() {
      if (this.addMemberSetting) {
        this.updateAddMemberSetting(false);
        this.emptySelectedMembersSetting();
      } else this.updateAddMemberSetting(true);
    },
    closeChatSetting() {
      this.updateAddMemberSetting(false);
      this.updateChatSetting(false);
      this.emptySelectedMembersSetting();
    }
  }
};
</script>

<style lang="scss">
#chat-setting-container {
  width: 350px;
  height: 75vh;
  position: absolute;
  z-index: 1;
}

h5,
h6 {
  margin: 0;
}

.scroll-area {
  height: 31vh;
}

.leave-btn {
  bottom: 16px;
  padding-right: 30px;
  width: 100%;
  position: absolute;
}

@media only screen and (max-width: 1300px) {
  #chat-setting-container {
    width: 300px;
  }
}
</style>
