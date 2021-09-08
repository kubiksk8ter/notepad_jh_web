const { gql } = require('apollo-server');

const typeDefs = gql`
    type AuthPayload {
        token: String!
        user: User!
    }   
    type User {
        id: ID!
        username: String!,
        password: String!,
        notes: [Note]!
    }
    type Note {
        id: ID!
        title: String,
        body: String,
        isDone: Boolean,
        user: User!
    }
    type Query {
        users: [User]
        user(id:ID): User
	    me: User
        notes: [Note]
        note(id:ID): Note       
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
        createNote(
            userId:ID!
            title: String!
            body: String!
            isDone: Boolean!
        ): Note!
    }
`;

module.exports = typeDefs;