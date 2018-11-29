const { GraphQLServer } = require('graphql-yoga')

// 1
let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
},
{
    id: 'link-1',
    url: 'www.krishnamohan.me',
    description: 'My portfolio site'
}]

let idCount = links.length;

/*
*/
const resolvers = {
    Query: {
        info: () => 'This is the API of a HackerNews clone.',
        feed: () => links
    },

    Link: {
        id: (root) => root.id,
        description: (root) => root.description,
        url: (root) => root.url
    },

    Mutation: {
        post: (root, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url
            }
            links.push(link)
            return link;
        },

        updateLink: (root, args) => {
            let index = links.findIndex((x)=> x.id === args.id);
            links[index].url = args.url;
            links[index].description = args.description;
            return links[index]
        },

        deleteLink: (root, args) => {
            let index = links.findIndex((x)=> x.id === args.id);
            let link = links[index];
            links.splice(index, 1)
            return link;

        }
    }
}

/*
*/
const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers
});

server.start(() => console.log('Server is running on http://localhost:4000'))