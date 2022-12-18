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
        Paginate(Match(Index("todo-List")))
    ).then((res) => {
        return {
            statusCode: 200,
            headers:{
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
                'Access-Control-Allow-Methods': "*"
            },
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