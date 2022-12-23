require('dotenv').config()

const faunadb = require('faunadb')
const client = new faunadb.Client({secret: process.env.FAUNA_SECRET_KEY})

const {
    Get,
    Ref,
    Collection
} = faunadb.query

exports.handler = (event, content, callback) => {
    const id = event.queryStringParameters.id

    return client.query(
        Get(Ref(Collection('TODO-List'), id))
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