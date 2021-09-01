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

export default { REGISTER_USER, LOGIN_USER }