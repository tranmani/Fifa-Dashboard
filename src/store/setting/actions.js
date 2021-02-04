import { apolloProvider } from "../../boot/apollo";
import gql from "graphql-tag";

const gqlClient = apolloProvider.defaultClient;

export function getSignedUrl({ commit }, payload) {
  return gqlClient
    .query({
      query: gql`
        query getSignedUrlList($fileName: String!, $fileType: String!) {
          getSignedUrl(fileName: $fileName, fileType: $fileType) {
            signedUrl
            fileName
          }
        }
      `,
      variables: {
        fileName: payload.fileName,
        fileType: payload.fileType
      }
    })
    .then(data => {
      return data.data.getSignedUrl;
    });
}
export function updateProfile({ commit }, payload) {
  return gqlClient
    .mutate({
      mutation: gql`
        mutation updateProfileList(
          $oldPassword: String
          $newPassword: String
          $firstname: String!
          $lastname: String!
          $picture: String!
          $clubPicture: String
          $clubName: String
        ) {
          updateProfile(
            oldPassword: $oldPassword
            newPassword: $newPassword
            firstname: $firstname
            lastname: $lastname
            picture: $picture
            clubPicture: $clubPicture
            clubName: $clubName
          )
        }
      `,
      variables: {
        oldPassword: payload.oldPassword,
        newPassword: payload.newPassword,
        firstname: payload.firstname,
        lastname: payload.lastname,
        picture: payload.picture,
        clubPicture: payload.clubPicture,
        clubName: payload.clubName
      }
    })
    .then(data => {
      return data.data.updateProfile;
    });
}
export function getClub({ commit }, payload) {
  return gqlClient
    .query({
      query: gql`
        query getClubList($name: String!) {
          getClub(name: $name) {
            picture
          }
        }
      `,
      variables: {
        name: payload
      }
    })
    .then(data => {
      return data.data.getClub;
    });
}
