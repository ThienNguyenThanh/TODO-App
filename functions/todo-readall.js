require('dotenv').config()

const faunadb = require('faunadb')
const client = new faunadb.Client({secret: process.env.FAUNA_SECRET_KEY})

const {
    Index,
    Match,
    Paginate
} = faunadb.query

exports.handler = (event, content, callback) => {
    return client.query(
        Paginate(Match(Index("todo-title")))
    ).then((res) => {
        return {
            statusCode: 200,
            body: JSON.stringify(res)
        }
    }).catch(error =>{
        console.log(error)
        return{
            statusCode: 400,
            body: JSON.stringify(error)
        }
    })
}