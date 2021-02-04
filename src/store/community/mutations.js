export function updatePageLoaded(state, payload) {
  Object.assign(state.pageLoaded, payload);
}

export function updateSelectedMembersCreate(state, payload) {
  state.selectedMembersCreate = payload;
}
export function addSelectedMembersCreate(state, payload) {
  state.selectedMembersCreate.push(payload);
}
export function removeSelectedMembersCreate(state, payload) {
  const index = state.selectedMembersCreate.findIndex(e => e.id == payload);
  state.selectedMembersCreate.splice(index, 1);
}
export function emptySelectedMembersCreate(state) {
  state.selectedMembersCreate = [];
}
export function updateAddMemberChannelCreation(state, payload) {
  state.addMemberChannelCreation = payload;
}
export function updateChannelCreation(state, payload) {
  state.channelCreation = payload;
}
export function updateChannelNameCreation(state, payload) {
  state.channelNameCreation = payload;
}

// Chat Setting related
export function addSelectedMembersSetting(state, payload) {
  state.selectedMembersSetting.push(payload);
}
export function removeSelectedMembersSetting(state, payload) {
  const index = state.selectedMembersSetting.findIndex(e => e.id == payload);
  state.selectedMembersSetting.splice(index, 1);
}
export function emptySelectedMembersSetting(state) {
  state.selectedMembersSetting = [];
}
export function updateSearchTypeSetting(state, payload) {
  state.searchTypeSetting = payload;
}
export function updateAddMemberSetting(state, payload) {
  state.addMemberSetting = payload;
}

export function updateSelectedUserChat(state, payload) {
  state.selectedUserChat = payload;
}
export function updateSearchTypeCreateChat(state, payload) {
  state.searchTypeCreateChat = payload;
}
export function updateChatSetting(state, payload) {
  state.chatSetting = payload;
}

// Channel related
export function getChannels(state, payload) {
  state.channels = payload;
}
export function updateChannels(state, payload) {
  state.channels.push(payload);
}
export function createChannel(state, payload) {
  state.channels.push(payload);
}
export function removeMemberFromChannel(state, payload) {
  const index = state.currentChat.users.findIndex(e => e.email == payload);
  state.currentChat.users.splice(index, 1);
}
export function leaveChannel(state, payload) {
  state.currentChat = {};
  state.messages = [];
  const index = state.channels.findIndex(e => e.id == payload.id);
  state.channels.splice(index, 1);
}

// Chat related
export function getChats(state, payload) {
  state.chats = payload;
}
export function deleteChat(state, payload) {
  state.currentChat = {};
  state.messages = [];
  let index = state.chats.findIndex(e => e.id == payload);
  state.chats.splice(index, 1);
}
export function createChat(state, payload) {
  state.chats.push(payload);
}

// Message related
export function getMessages(state, payload) {
  state.messages = payload;
}
export function addMessage(state, payload) {
  let lastMessageThread = state.messages[state.messages.length - 1];

  if (state.messages.length != 0) {
    if (lastMessageThread.sender == payload.sender) {
      state.messages[state.messages.length - 1].messages.push(
        payload.messages[payload.messages.length - 1]
      );
    } else {
      state.messages.push(payload);
    }
  } else {
    state.messages.push(payload);
  }
}

export function updateCurrentChat(state, payload) {
  if (payload.isChannel) {
    state.currentChat = { ...payload.info, id: payload.id };
  } else {
    state.currentChat = state.chats.find(e => e.id == payload.id);
  }
  if (!payload) state.currentChat = {};
}
export function updateIsChannel(state, payload) {
  state.currentChat.isChannel = payload;
}
