import { apolloProvider } from "../../boot/apollo";
import gql from "graphql-tag";

const gqlClient = apolloProvider.defaultClient;

export function updatePageLoaded({ commit }, payload) {
  commit("updatePageLoaded", payload);
}

// Create channel related
export function updateSelectedMembersCreate({ commit }, payload) {
  commit("updateSelectedMembersCreate", payload);
}
export function addSelectedMembersCreate({ commit }, payload) {
  commit("addSelectedMembersCreate", payload);
}
export function removeSelectedMembersCreate({ commit }, payload) {
  commit("removeSelectedMembersCreate", payload);
}
export function emptySelectedMembersCreate({ commit }) {
  commit("emptySelectedMembersCreate");
}
export function updateAddMemberChannelCreation({ commit }, payload) {
  commit("updateAddMemberChannelCreation", payload);
}
export function updateChannelCreation({ commit }, payload) {
  commit("updateChannelCreation", payload);
}
export function updateChannelNameCreation({ commit }, payload) {
  commit("updateChannelNameCreation", payload);
}

// Chat Setting related
export function addSelectedMembersSetting({ commit }, payload) {
  commit("addSelectedMembersSetting", payload);
}
export function removeSelectedMembersSetting({ commit }, payload) {
  commit("removeSelectedMembersSetting", payload);
}
export function emptySelectedMembersSetting({ commit }) {
  commit("emptySelectedMembersSetting");
}
export function updateSearchTypeSetting({ commit }, payload) {
  commit("updateSearchTypeSetting", payload);
}
export function updateAddMemberSetting({ commit }, payload) {
  commit("updateAddMemberSetting", payload);
}

// Create private chat related
export function updateSelectedUserChat({ commit }, payload) {
  commit("updateSelectedUserChat", payload);
}
export function updateSearchTypeCreateChat({ commit }, payload) {
  commit("updateSearchTypeCreateChat", payload);
}

export function updateChatSetting({ commit }, payload) {
  commit("updateChatSetting", payload);
}
export function getChannels({ commit, dispatch }, payload) {
  return gqlClient
    .query({
      query: gql`
        query getChannelNameByIdList($idList: [String]!) {
          getChannelNameById(idList: $idList) {
            id
            channelName
          }
        }
      `,
      variables: {
        idList: payload.map(e => e.id)
      }
    })
    .then(data => {
      const filtered = data.data.getChannelNameById.filter(e => {
        return e !== undefined;
      });
      if (data.data.getChannelNameById.length != 0) {
        commit("getChannels", filtered);
        dispatch("getChannelDetail", { id: filtered[0].id });
        commit("updatePageLoaded", { channels: true });
        return filtered[0].id;
      }
      commit("updatePageLoaded", { channels: true });
    });
}
export function getChannelDetail({ commit, dispatch }, payload) {
  commit("updatePageLoaded", { messages: false });
  return gqlClient
    .query({
      query: gql`
        query getChannelDetailList($id: String!) {
          getChannelDetail(id: $id) {
            id
            channelName
            dateCreated
            owner {
              picture
              email
              displayName
            }
            users {
              picture
              email
              displayName
            }
          }
        }
      `,
      variables: {
        id: payload.id
      },
      fetchPolicy: "network-only"
    })
    .then(data => {
      dispatch("getMessages", {
        id: payload.id,
        info: data.data.getChannelDetail,
        isChannel: true
      });

      commit("updatePageLoaded", { channel: true });
    });
}
export function createChannel({ commit, dispatch }, payload) {
  return gqlClient
    .mutate({
      mutation: gql`
        mutation createChannelList($channelName: String!, $users: [String]!) {
          createChannel(channelName: $channelName, users: $users) {
            id
            owner {
              email
              displayName
            }
            users {
              email
              displayName
            }
          }
        }
      `,
      variables: {
        channelName: payload.channelName,
        users: payload.users
      }
    })
    .then(data => {
      commit("createChannel", {
        id: data.data.createChannel.id,
        channelName: payload.channelName
      });
      dispatch("getChannelDetail", { id: data.data.createChannel.id });
      commit("user/addChannel", data.data.createChannel.id, { root: true });
    });
}
export function removeMemberFromChannel({ commit }, payload) {
  return gqlClient
    .mutate({
      mutation: gql`
        mutation removeMemberFromChannelList($id: String!, $user: String!) {
          removeMemberFromChannel(id: $id, user: $user) {
            users {
              email
              displayName
            }
          }
        }
      `,
      variables: payload
    })
    .then(data => {
      commit("removeMemberFromChannel", payload.user);
      return data.data.removeMemberFromChannel;
    });
}
export function leaveChannel({ commit }, payload) {
  return gqlClient
    .mutate({
      mutation: gql`
        mutation leaveChannelList($id: String!, $user: String!) {
          leaveChannel(id: $id, user: $user)
        }
      `,
      variables: {
        id: payload.id,
        user: payload.user
      }
    })
    .then(data => {
      commit("leaveChannel", payload.id);
      return data.data.createMessage;
    });
}
export function addMembersToChannel({ commit, dispatch }, payload) {
  return gqlClient
    .mutate({
      mutation: gql`
        mutation createChannelList($id: String!, $users: [String]!) {
          addMembersToChannel(id: $id, users: $users) {
            users {
              email
            }
          }
        }
      `,
      variables: {
        id: payload.id,
        users: payload.users
      }
    })
    .then(data => {
      dispatch("getChannelDetail", { id: payload.id });
    });
}
export function getChats({ commit }, payload) {
  return gqlClient
    .query({
      query: gql`
        query getChatsByIdList($idList: [String]!) {
          getChatsById(idList: $idList) {
            id
            user1 {
              picture
              email
              displayName
            }
            user2 {
              picture
              email
              displayName
            }
            dateCreated
          }
        }
      `,
      variables: {
        idList: payload.info.map(e => e.id)
      }
    })
    .then(data => {
      if (payload.type == "replace") {
        commit("getChats", data.data.getChatsById);
      } else if (payload.type == "add") {
        commit("createChat", data.data.getChatsById[0]);
      }
      commit("updatePageLoaded", { chats: true });
      return data.data.getChatsById;
    });
}
export function createChat({ commit, dispatch }, payload) {
  return gqlClient
    .mutate({
      mutation: gql`
        mutation createChatList($user1: String!, $user2: String!) {
          createChat(user1: $user1, user2: $user2) {
            id
            user1 {
              email
              displayName
              picture
            }
            user2 {
              email
              displayName
              picture
            }
          }
        }
      `,
      variables: payload
    })
    .then(data => {
      commit("createChat", data.data.createChat);
      commit("updateCurrentChat", data.data.createChat);
      dispatch("getMessages", {
        id: data.data.createChat.id,
        isChannel: false
      });
      commit("updateIsChannel", false);
      commit("user/addChat", data.data.createChat.id, { root: true });
      commit("updatePageLoaded", { chats: true });
    });
}
export function deleteChat({ commit }, payload) {
  return gqlClient
    .mutate({
      mutation: gql`
        mutation deleteChatList($id: String!, $user: String!) {
          deleteChat(id: $id, user: $user)
        }
      `,
      variables: {
        id: payload.id,
        user: payload.user
      }
    })
    .then(data => {
      commit("deleteChat", payload.id);
      commit("user/deleteChat", payload.id, { root: true });
      return data.data.deleteChat;
    });
}
export function getMessages({ commit }, payload) {
  commit("updatePageLoaded", { messages: false });
  return gqlClient
    .query({
      query: gql`
        query getAllMessageByChatIdList($id: String!) {
          getAllMessageByChatId(id: $id) {
            id
            sender
            displayName
            messages {
              id
              message
              time
            }
            time
          }
        }
      `,
      variables: {
        id: payload.id
      },
      fetchPolicy: "network-only"
    })
    .then(data => {
      commit("getMessages", data.data.getAllMessageByChatId);
      commit("updateCurrentChat", {
        info: payload.info,
        id: payload.id,
        isChannel: payload.isChannel
      });
      commit("updateIsChannel", payload.isChannel);
      commit("updatePageLoaded", { messages: true });
      return "done";
    });
}
export function addMessageFromSubscription({ commit }, payload) {
  commit("addMessage", payload);
}
export function getNewMessage({ commit, rootGetters }, payload) {
  gqlClient
    .subscribe({
      query: gql`
        subscription newMessageList($id: String!) {
          newMessage(id: $id) {
            id
            sender
            displayName
            time
            messages {
              message
              time
            }
          }
        }
      `,
      variables: {
        id: payload
      }
    })
    .subscribe({
      next(data) {
        if (rootGetters["user/user"].email != data.data.newMessage.sender) {
          commit("addMessage", data.data.newMessage);
        }
        commit("updatePageLoaded", { newMessage: true });
      },
      error(err) {
        console.error("err", err);
      }
    });
}
export function addMessage({ commit }, payload) {
  // Check for empty message
  if (!payload.message.match(/\S/g)) return;
  commit("updatePageLoaded", { addMessage: false });
  return gqlClient
    .mutate({
      mutation: gql`
        mutation createMessageList(
          $id: String!
          $message: String!
          $isChannel: Boolean!
        ) {
          createMessage(id: $id, message: $message, isChannel: $isChannel) {
            id
            sender
            displayName
            messages {
              id
              message
              time
            }
            time
          }
        }
      `,
      variables: {
        id: payload.id,
        message: payload.message,
        isChannel: payload.isChannel
      }
    })
    .then(data => {
      commit("addMessage", data.data.createMessage);
      commit("updatePageLoaded", { addMessage: true });

      return data.data.createMessage;
    });
}
export function getAllUserByRole({ commit }, payload) {
  return gqlClient
    .query({
      query: gql`
        query getAllUserByRoleList($role: String!) {
          getAllUserByRole(role: $role) {
            id
            email
            firstname
            lastname
            role
            picture
          }
        }
      `,
      variables: {
        role: payload
      }
    })
    .then(data => {
      commit("filter/updateSearchResults", data.data.getAllUserByRole, {
        root: true
      });
      if (payload == "Coach") commit("updatePageLoaded", { coaches: true });
      else if (payload == "Researcher")
        commit("updatePageLoaded", { researchers: true });
    });
}
