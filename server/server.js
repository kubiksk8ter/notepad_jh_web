const express = require('express');
const jwt = require('jsonwebtoken')
const { ApolloServer } = require('apollo-server-express');
const { PrismaClient } = require('@prisma/client');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const fs = require ('fs');
const https = require('https');
const http = require('http');

const { JWT_SECRET } = 'secret'

const getUser = token => {
  try {
    if (token) {
      return jwt.verify(token, JWT_SECRET)
    }
    return null
  } catch (err) {
    return null
  }
}

//PRISMA
const prisma = new PrismaClient();
async function main() {}
main()
  	.catch(e => {
    	throw e;
  	})
.finally(async () => {
    	await prisma.$disconnect();
});

//APOLLO SERVER
async function startApolloServer() {
  const configurations = {
    // Note: You may need sudo to run on port 443
    production: { ssl: true, port: 5000, hostname: 'notepad.jakubholecek.cz' },
    development: { ssl: false, port: 4000, hostname: 'localhost' }
  };

  const environment = process.env.NODE_ENV || 'production';
  const config = configurations[environment];

  const server = new ApolloServer({ 
    typeDefs,
    resolvers,
    context: { prisma },
    introspection: true,
    playground: true
  });
  await server.start();

  const app = express();
  server.applyMiddleware({ app });

  // Create the HTTPS or HTTP server, per configuration
  let httpServer;
  if (config.ssl) {
    // Make sure these files are secured.
    httpServer = https.createServer(
      {
        key: fs.readFileSync(`/var/www/notepad.jakubholecek.cz/ssl/notepad.jakubholecek.cz-le.key`),
        cert: fs.readFileSync(`/var/www/notepad.jakubholecek.cz/ssl/notepad.jakubholecek.cz-le.crt`)
      },
      app,
    );
  } else {
    httpServer = http.createServer(app);
  }

  await new Promise(resolve => httpServer.listen({ port: config.port }, resolve));
  console.log(
    '🚀 Server ready at',
    `http${config.ssl ? 's' : ''}://${config.hostname}:${config.port}${server.graphqlPath}`
  );
  return { server, app };
}

startApolloServer();