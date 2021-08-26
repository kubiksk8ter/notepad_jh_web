import gql from 'graphql-tag'

const CREATE_USER = gql`
    mutation CreateUserMutation($createUserUsername: String, $createUserPassword: String) {
        createUser(username: $createUserUsername, password: $createUserPassword) {
            username
            password
        }
    }`

export default CREATE_USER