import gql from 'graphql-tag'

export const REGISTER_USER = gql`
    mutation createUserMutation($username: String! $password: String!) {
        createUser(username: $username password: $password) {
            token
        }
    }`

export const LOGIN_USER = gql`
    mutation LoginMutation($username: String! $password: String!) {
        login(username: $username password: $password) {
            token                   
            }
        }   
`

export const CREATE_NOTE = gql`
    mutation CreateNoteMutation($title: String!, $body: String!, $isDone: Boolean!) {
        createNote(title: $title, body: $body, isDone: $isDone) {
            id
            title
            body
            isDone
            user{
            username
            }
        }
    }
`

export const DELETE_NOTE = gql`
    mutation DeleteNoteMutation($deleteNoteId: ID!) {
        deleteNote(id: $deleteNoteId) {
            id
            title
        }
    }
`