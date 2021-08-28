import gql from 'graphql-tag'

export const REGISTER_USER = gql`
    mutation createUserMutation($createUserUsername: String $createUserPassword: String) {
        createUser(username: $createUserUsername password: $createUserPassword) {
            token
        }
    }`

export const LOGIN_USER = gql`
    mutation LoginMutation($loginUsername: String! $loginPassword: String!) {
        login(username: $loginUsername password: $loginPassword) {
            token                   
            }
        }   
`

export default { REGISTER_USER, LOGIN_USER }