const graphql = require('graphql')
const _ = require('lodash')
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList } = graphql;
const books = require('../model/book.schema')


const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'root',
    fields: {
        book: {
            type: BookType,
            args: {
                id: { type: GraphQLString }
            },
            resolve(parents, args) {
                return books.findById({ _id: args.id })
            }
        },
        allBook: {
            type: new GraphQLList(BookType),
            resolve() {
                return books.find()
            }
        }
    }
})


const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        createBooks: {
            type: BookType,
            args: {
                name: { type: GraphQLString },
                genre: { type: GraphQLString }
            },
            resolve(parents, args) {
                const newBook = new books({
                    name: args.name,
                    genre: args.genre
                })
                return newBook.save()
            }
        },
        deleteBooks: {
            type: BookType,
            args: {
                id: { type: GraphQLString }
            },
            resolve(parents, args) {
                return books.deleteOne({ _id: args.id })
            }
        },
        updateBooks: {
            type: BookType,
            args: {
                id: { type: GraphQLString },
                name: { type: GraphQLString },
                genre: { type: GraphQLString }
            },
            resolve(parents, args) {
                return books.findByIdAndUpdate({ _id: args.id }, {
                    $set: {
                        name: args.name,
                        genre: args.genre
                    }
                })
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})
