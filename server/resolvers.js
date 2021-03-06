const jsonwebtoken = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
//const { DateTimeResolver } = require('graphql-scalars')

const JWT_SECRET = 'secret'

module.exports = {
    Query: {
        //info: () => 'This is the API of a Notepad UX',
        /*       
        users: async (parent, args, context, info) => {                                
            try { 
                if(!context.user) { throw new Error('You are not authenticated!') }               
                return context.prisma.user.findMany();
            }
            catch (e) {
                throw new Error(e.message)
            }
        },
        */
        /*
        user: async (parent, {id}, context, info) => {
            try {
                if(!context.user) { throw new Error('You are not authenticated!') }                
                let ID = parseInt(id);         
                const user = context.prisma.user.findUnique({
                    where: {id:ID}
                });
                return user;
            }
            catch (e) {
                throw new Error(e.message)
            }                     
        },
        */
        me: async(parent, args, context, info) => {
            try {
                if(!context.user) { throw new Error('You are not authenticated!') }               
                const user = await context.prisma.user.findUnique({
                    where: {id:context.user.id}
                });
                return user
            }
            catch(e) {
                throw new Error (e.message)
            }          
        },
        /*
        notes: async (parent, args, context, info) => {                                
            try { 
                if(!context.user) { throw new Error('You are not authenticated!') }
                const notes = context.prisma.note.findMany()
                return notes                               
            }
            catch (e) {
                throw new Error(e.message)
            }
        },
        */
        notesByUser: async (parent, args, context, info) => {                                
            try { 
                if(!context.user) { throw new Error('You are not authenticated!') }
                const notes = context.prisma.user.findUnique({
                    where: {
                        id: context.user.id
                    },                  
                }).notes()
                return notes               
            }
            catch (e) {
                throw new Error(e.message)
            }
        },       
        /* 
        note: async (parent, {id}, context, info) => {
            try {
                if(!context.user) { throw new Error('You are not authenticated!') }                
                let ID = parseInt(id);         
                const user = context.prisma.note.findUnique({
                    where: {id:ID}
                });
                return user;
            }
            catch (e) {
                throw new Error(e.message)
            }                     
        },
        */
    },
    Mutation: {
        createUser: async (parent, args, context, info) => {
            try {
                const user = await context.prisma.user.create({
                    data: {
                        username: args.username,
                        password: await bcrypt.hash(args.password, 10)
                    }
                });
                const token = jsonwebtoken.sign(
                    { id: user.id, username: user.username },
                    JWT_SECRET,
                    { expiresIn: '1y' }
                )  
                return {token, user}
            }
            catch(e) {
                throw new Error(e.message);
            }
        },              
        login: async (parent, args, context, info) => {
            try {
                const user = await context.prisma.user.findUnique({
                    where: {username: args.username}
                });              
                const valid = await bcrypt.compare(args.password, user.password)
                if (!valid) {
                    throw new Error('Incorrect password')
                }          
                const token = jsonwebtoken.sign(
                    { id: user.id, username: user.username },
                    JWT_SECRET,
                    { expiresIn: '1y' }
                )  
                return {token, user}
            }
            catch(e) {
                throw new Error(e.message);
            }
        },
        createNote: async (parent, args, context, info) => {
            try {
                //let userID = parseInt(args.userId);
                if(!context.user) { throw new Error('You are not authenticated!') }
                const note = await context.prisma.note.create({
                    data: {
                        title: args.title,
                        body: args.body,
                        isDone: args.isDone,
                        user: {connect: {id: context.user.id}}                  
                    }
                });  
                return note
            }
            catch(e) {
                throw new Error(e.message);
            }
        },
        updateNote: async (parent, args, context, info) => {
            try {
                let ID = parseInt(args.id);
                if(!context.user) { throw new Error('You are not authenticated!') }
                const note = await context.prisma.note.update({
                    where: {id: ID},
                    data: {
                        title: args.title,
                        body: args.body,
                        isDone: args.isDone,
                        user: {connect: {id: context.user.id}}                  
                    }                    
                }, info)  
                return note
            }
            catch(e) {
                throw new Error(e.message);
            }
        },
        /*
        deleteUser: async (parent,{id}, context, info) => {
            let ID = parseInt(id);
            const user = context.prisma.user.delete({
                where: { id:ID }
            });
            return user;
        },
        */ 
        deleteNote: async (parent, {id}, context, info) => {
            let ID = parseInt(id);
            const note = context.prisma.note.delete({
                where: { id:ID }
            });
            return note;
        }        
    },
    User: {
        notes: (parent, args, context, info) => {
            const notes = context.prisma.user.findUnique({
                where: {id:parent.id}
            }).notes()
            return notes
        }
    },
    Note: {
        user: (parent, args, context, info) => {
            const user = context.prisma.note.findUnique({
                where: {id: parent.id}
            }).user()
            return user
        }
    }   
};

