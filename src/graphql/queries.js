import gql from 'graphql-tag'

export const LOGGED_IN_USER = gql`
    query {
        me {
            id
            username
        }
    }
`

export const LOGGED_IN_USER_NOTES = gql`
    query {
        notesByUser {
            id
            title
            body
            isDone  
        }
    }
`
