export default function() {
  return {
    pageLoaded: {
      messages: false,
      channels: false,
      chats: false,
      addMessage: false,
      newMessage: false,
      clubs: false,
      players: false,
      coaches: false,
      researchers: false,
      channel: false
    },
    selectedMembersSetting: [],
    searchTypeSetting: "Team",
    addMemberSetting: false,
    selectedUserChat: "",
    selectedMembersCreate: [],
    searchTypeCreateChat: "Team",
    chatSetting: false,
    addMemberChannelCreation: false,
    channelNameCreation: "",
    channelCreation: false,
    channels: [],
    chats: [],
    messages: [],
    currentChat: { id: "", isChannel: true }
  };
}
