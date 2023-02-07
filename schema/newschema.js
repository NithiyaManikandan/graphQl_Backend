const { buildSchema } = require('graphql')

module.exports = buildSchema(`
    type Book {
        _id : ID!
        name : String!
        genre : String!
    }
    type BookData {
        books : [Book!]!
    }
    input BookInputData {
        name : String! 
        genre : String!
    }
    type RootQuery{
        books : BookData!
        
    }
    type RootMutation{
        createbooks(bookInput : BookInputData) : Book!
        updatebooks(id:ID!, bookInput : BookInputData ) : Book!
        deletebooks(id:ID! ) : Book!

    }
    schema {
        query : RootQuery
        mutation : RootMutation
    }
`)