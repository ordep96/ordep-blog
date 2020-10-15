import gql from "graphql-tag";

//Mutations

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

export const addLikeMutation = gql`
  mutation update_posts($id: uuid! $likes: Int!) {
    update_posts(_set: {likes: $likes}, where: {id: {_eq: $id}}) {
      affected_rows
      returning {
        id
        likes
        user {
          uid
        }
      }
    }
  }
`


// Queries
export const fetchPostQuerie = gql`{
  posts {
    content
    featuredImage
    id
    title
    likes
    user {
      displayName
      email
      photoUrl
    }
  }
}`

export const fetchPostById = gql`
  query fetchPostById ($id: uuid!) {
    post: posts_by_pk(id: $id) {
      content
      featuredImage
      id
      idUser
      title
      user {
        displayName
        email
        photoUrl
      }
    }
}`