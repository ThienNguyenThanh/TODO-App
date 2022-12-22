import axios from "axios"

export async function getTODO(){
    try {
        const response = await axios('http://localhost:9000/.netlify/functions/todo-readall')
        // console.log(response)
        return response.data
      } catch (error) {
        console.log(error);
      }
    
}

export async function postTODO(title){
    try{
        const todoList = await axios.post(`http://localhost:9000/.netlify/functions/todo-create?title=${title}`)
        return todoList.data
    }catch(error) {
        return error
    }
    
}

export async function updateTODO(id, title, isDone){
    try{
        const todoList = await fetch(`http://localhost:9000/.netlify/functions/todo-update?id=${id}&title=${title}&isDone=${isDone}`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Request-Headers': "Origin"
            }})
        return todoList
    }catch(error) {
        return error
    }
    
}

export async function deleteTODO(id){
    try{
        const todoList = await fetch(`http://localhost:9000/.netlify/functions/todo-delete?id=${id}`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Request-Headers': "Origin"
            }})
        return todoList
    }catch(error) {
        return error
    }
    
}

