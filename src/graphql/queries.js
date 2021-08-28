import gql from 'graphql-tag'

export const ALL_USERS = gql`
    query
        { users 
            {id, 
             username, 
             password
            } 
        }
    `

export const LOGGED_IN_USER = gql`
    query {
        me {
            id
            username
        }
    }
`

//export default ALL_USERS