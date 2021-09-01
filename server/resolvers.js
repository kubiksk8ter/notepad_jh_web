const jsonwebtoken = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const JWT_SECRET = 'secret'

module.exports = {
    Query: {
        //info: () => 'This is the API of a Notepad UX',
        me: async(_, args, {user}, context) => {
            return await context.prisma.user.findUnique({
                where: {id:user.id}
            });
        },        
        users: async (parent, args, context) => {                     
            return context.prisma.user.findMany();
        },
        user: async (parent, {id}, context) => {
            try {                
                let ID = parseInt(id);         
                const user = context.prisma.user.findUnique({
                    where: {id:ID}
                });
                return user;
            }
            catch (e) {
                throw new Error(e.message)
            }
                      
        }
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
        deleteUser: async (parent,{id}, context, info) => {
            let ID = parseInt(id);
            const user = context.prisma.user.delete({
                where: { id:ID }
            });
            return user;
        },         
    }
};

