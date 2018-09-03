import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
    uri: "https://todoappql-nfncxhqsvi.now.sh"
});
export default client;