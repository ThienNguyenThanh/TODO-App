require('dotenv').config()

const faunadb = require('faunadb')
const client = new faunadb.Client({secret: process.env.FAUNA_SECRET_KEY})

const {
    Paginate,
    Documents,
    Collection
} = faunadb.query

exports.handler = (event, content, callback) => {
    return client.query(
        Paginate(Documents(Collection("TODO-List")))
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