import gql from "graphql-tag";

export default {
  getClubs() {
    return gql`
      query getClubsList($query: String!) {
        getClubs(query: $query) {
          name
          coachEmail
          coachFirstname
          coachLastname
          picture
          players {
            firstname
            lastname
            winlose {
              wins
              loses
              date
            }
            email
            picture
          }
        }
      }
    `;
  },
  getPlayers() {
    return gql`
      query getPlayersList($query: String!, $club: String!) {
        getPlayers(query: $query, club: $club) {
          email
          firstname
          lastname
          winlose {
            wins
            loses
            date
          }
          role
          coach
          club
          picture
        }
      }
    `;
  },
  getPlayerByEmail() {
    return gql`
      query getPlayerByEmailList($email: String!) {
        getPlayerByEmail(email: $email) {
          email
          firstname
          lastname
          winlose {
            wins
            loses
            date
          }
          verified
          role
          coach
          club
          picture
        }
      }
    `;
  }
};
