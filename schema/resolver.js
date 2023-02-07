const Book = require('../model/book.schema')

module.exports = {
    books: async function () {
        const books = await Book.find();
        return {
            books: books.map((b) => {
                return {
                    ...b._doc,
                    _id: b._id.toString(),
                }
            })
        }
    },
    createbooks: async function ({ bookInput }) {
        const book = new Book({
            name: bookInput.name,
            genre: bookInput.genre
        })

        const createbooks = await book.save();
        return {
            ...createbooks._doc,
            _id: createbooks._id.toString()
        }
    },
    updatebooks : async function ({ id ,bookInput }) {
        const book = await Book.findById(id)

        if(!book){
            throw new Error('No book found')
        }

        book.name = bookInput.name
        book.genre = bookInput.genre

        const updatebooks = await book.save()
        return {
            ...updatebooks._doc,
            _id: updatebooks._id.toString()
        }

    },
    deletebooks : async function ({ id}) {
        const book = await Book.findById(id)

        if(!book){
            throw new Error('No book found')
        }

        await Book.findByIdAndRemove(id)
        return{
            ...book._doc,
            _id: book._id.toString()

        }

    },
}