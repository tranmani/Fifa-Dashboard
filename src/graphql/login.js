import gql from "graphql-tag";

export default {
  getUserByToken() {
    return gql`
      query getUserByTokenList($token: String!) {
        getUserByToken(token: $token) {
          email
          firstname
          lastname
          role
          coach
          club
          organization
          position
          players
          picture
          chats {
            id
            unread
          }
          channels {
            id
            unread
          }
        }
      }
    `;
  },
  getCode() {
    return gql`
      query getCodeList($code: String!) {
        useSignupCode(code: $code) {
          email
          code
          firstname
          lastname
          club
        }
      }
    `;
  },
  login() {
    return gql`
      query loginList($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          token
          email
        }
      }
    `;
  },
  signUp() {
    return gql`
      mutation createUserList(
        $email: String!
        $password: String!
        $confirm: String!
        $firstname: String!
        $lastname: String!
        $role: String!
        $coach: String!
        $coachEmail: String!
        $club: String!
        $organization: String!
        $position: String!
      ) {
        createUser(
          email: $email
          password: $password
          confirm: $confirm
          firstname: $firstname
          lastname: $lastname
          role: $role
          coach: $coach
          coachEmail: $coachEmail
          club: $club
          organization: $organization
          position: $position
        ) {
          token
          email
        }
      }
    `;
  }
};
