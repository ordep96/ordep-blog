import gql from "graphql-tag";

export const addUserMutation = gql`
  mutation insert_users($displayName: String! $photoUrl: String! $email: String!  $uid: String!) {
    insert_users(objects: [{displayName: $displayName photoUrl: $photoUrl email: $email uid: $uid}]) {
      returning {
        uid
      }
    }
  }
`;

export const addPostMutation = gql`
  mutation insert_posts($title: String! $content: String! $featuredImage: String! $idUser: String!) {
    insert_posts(objects: [{title: $title content: $content featuredImage: $featuredImage idUser:$idUser }]) {
      affected_rows
      returning {
        title,
        content,
        featuredImage
      }
    }
  }
`

export const fetchPostQuerie = gql`{
  posts {
    content
    featuredImage
    id
    title
    user {
      displayName
      email
      photoUrl
    }
  }
}`