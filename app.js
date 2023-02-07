const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const  bodyParser = require('body-parser')
// const schema = require('./schema/schema')
const graphqlSchema = require('./schema/newschema')
const graphqlResolver = require('./schema/resolver')

const mongoose = require('mongoose')
const cors = require('cors')


const app = express()
app.use(bodyParser.json())
app.use(cors())

mongoose.connect('mongodb://localhost:27017/graphql',(err)=>{
    if(!err){
        console.log('Database connected successfully at port');
    }
    else{
        console.log('error in connection');
    }
})

app.use('/graphql', graphqlHTTP({
    schema : graphqlSchema,
    rootValue:graphqlResolver,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('server run in port : 4000');
})
