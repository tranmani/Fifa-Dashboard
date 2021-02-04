import gql from "graphql-tag";

export default {
  getChannelsById() {
    return gql`
      query getChannelsByIdList($idList: [String]!) {
        getChannelsById(idList: $idList) {
          id
          channelName
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
    `;
  },
  getChatsById() {
    return gql`
      query getChatsByIdList($idList: [String]!) {
        getChatsById(idList: $idList) {
          id
          user1 {
            email
            displayName
          }
          user2 {
            email
            displayName
          }
        }
      }
    `;
  },
  getAllMessageByChatId() {
    return gql`
      query getAllMessageByChatIdList($id: String!) {
        getAllMessageByChatId(id: $id) {
          sender
          displayName
          message
          time
        }
      }
    `;
  },
  subscribeNewMessage() {
    return gql`
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
    `;
  }
};
