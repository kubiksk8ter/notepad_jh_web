const { gql } = require('apollo-server');

const typeDefs = gql`
    type AuthPayload {
        token: String!
        user: User!
    }   
    type User {
        id:ID!
        username: String!,
        password: String!
    }
    type Query {
        users: [User]
        user(id:ID): User
	me: User
    }
    type Mutation {
        createUser(
            username: String!,
            password: String!
        ): AuthPayload!
	    login(
	        username: String!,
            password: String!
	    ): AuthPayload!
        deleteUser (id:ID!): User
    }
`;

module.exports = typeDefs;