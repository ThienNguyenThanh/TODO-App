require('dotenv').config()

const faunadb = require('faunadb')
const client = new faunadb.Client({secret: process.env.FAUNA_SECRET_KEY})

const {
    Update,
    Ref,
    Collection
} = faunadb.query

exports.handler = (event, content, callback) => {
    if(event.httpMethod == 'POST'){
        const id = event.queryStringParameters.id
        const title = event.queryStringParameters.title
        const isDone = event.queryStringParameters.isDone
        const changeParam = {
            ...(title !== 'undefined' && {title: title}),
            ...(isDone !== 'undefined' && {isDone: isDone})
        }
                
        return client.query(
            Update(
                Ref(Collection('TODO-List'), id),
                {
                  data: changeParam
                },
              )
        ).then((response) => {
            return {
                statusCode: 200,
                headers:{
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
                    'Access-Control-Allow-Methods': "*"
                },
                body: JSON.stringify(response)
            }
        }).catch(error => {
            console.log(error)
            return{
                statusCode: 400,
                body: JSON.stringify(error)
            }
        })
         
    }

    if(event.httpMethod == 'OPTIONS'){
        return callback(null,{
            statusCode: 200,
            headers:{
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
                    'Access-Control-Allow-Methods': "*"
                },
            body: JSON.stringify({message: 'Prefight successfully called'})
        })
    }
}