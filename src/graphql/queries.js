import gql from 'graphql-tag'

const ALL_USERS = gql`
    query allUsers 
        { users 
            {id, 
             username, 
             password
            } 
        }
    `
export default ALL_USERS