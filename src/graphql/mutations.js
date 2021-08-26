import gql from 'graphql-tag'

export const REGISTER_USER = gql`
    mutation createUserMutation($createUserUsername: String, $createUserPassword: String) {
        createUser(username: $createUserUsername, password: $createUserPassword) {
            token
        }
    }`

export const LOGIN_USER = gql`
    mutation login ()
`