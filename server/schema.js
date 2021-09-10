const { gql } = require('apollo-server');

const typeDefs = gql`
    type AuthPayload {
        token: String!
        user: User!
    }   
    type User {
        id: ID!
        username: String!,
        notes: [Note]!
    }
    type Note {
        id: ID!
        title: String!,
        body: String!,
        isDone: Boolean!,
        user: User
    }
    type Query {
        users: [User]
        user(id:ID): User
	    me: User
        notes: [Note]
        notesByUser(id:ID): [Note]
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
        deleteUser (id:ID!): User!
        createNote(
            title: String!           
            body: String!
            isDone: Boolean!
        ): Note!
        updateNote(
            id:ID!
            title: String
            body: String
            isDone: Boolean
        ): Note!
        deleteNote(id:ID!): Note!
    }
`;

module.exports = typeDefs;