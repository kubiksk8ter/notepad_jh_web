const { gql } = require('apollo-server')
//const { DateTimeTypeDefinition } = require('graphql-scalars')

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
        id: ID!,       
        title: String!,
        body: String!,
        isDone: Boolean!,
        user: User,
        createdAt: Float,
        updatedAt: Float,
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