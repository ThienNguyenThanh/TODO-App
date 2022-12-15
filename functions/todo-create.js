require('dotenv').config()

const faunadb = require('faunadb')
const client = new faunadb.Client({secret: process.env.FAUNA_SECRET_KEY})

const {
    Create,
    Ref,
    Collection
} = faunadb.query

exports.handler = (event, content, callback) =>{
    
    const data = JSON.parse(event.body).data
    const todo_thing = {
        data: data
    }
    return client.query(
        Create(
            Collection('TODO-List'),
            todo_thing
        )
    ).then((response) => {
        return {
            statusCode: 200,
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