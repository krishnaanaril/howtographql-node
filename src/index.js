const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const AuthPayload = require('./resolvers/AuthPayload')
const Subscription = require('./resolvers/Subscription')

/*
Not required since we've created a prisma database
*/
// // 1
// let links = [{
//     id: 'link-0',
//     url: 'www.howtographql.com',
//     description: 'Fullstack tutorial for GraphQL'
// },
// {
//     id: 'link-1',
//     url: 'www.krishnamohan.me',
//     description: 'My portfolio site'
// }]

// let idCount = links.length;

/*
*/
const resolvers = {
    Query,
    Mutation, 
    AuthPayload,
    Subscription,
    // Query: {
    //     info: () => 'This is the API of a HackerNews clone.',
    //     feed: (root, args, context, info) => {
    //         return context.db.query.links({}, info);
    //     }
    // },

    // Link: {
    //     id: (root) => root.id,
    //     description: (root) => root.description,
    //     url: (root) => root.url
    // },

    // Mutation: {
    //     post: (root, args, context, info) => {
    //         return context.db.mutation.createlink({
    //             data: {
    //                 url: args.url,
    //                 description: args.description
    //             }
    //         }, info);
    //     },

        // updateLink: (root, args) => {
        //     let index = links.findIndex((x)=> x.id === args.id);
        //     links[index].url = args.url;
        //     links[index].description = args.description;
        //     return links[index]
        // },

        // deleteLink: (root, args) => {
        //     let index = links.findIndex((x)=> x.id === args.id);
        //     let link = links[index];
        //     links.splice(index, 1)
        //     return link;

        // }
    // }
}

/*
*/
const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: req => ({
        ...req,
        db: new Prisma({
            typeDefs: 'src/generated/prisma.graphql',
            endpoint: 'https://eu1.prisma.sh/krishna-mohan-36ae98/database/dev',
            secret: 'mysecret123',
            debug: true,
        })
    })
});

server.start(() => console.log('Server is running on http://localhost:4000'))