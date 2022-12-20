export async function getTODO(){
    try{
        const todoList = await fetch('http://localhost:9000/.netlify/functions/todo-readall',{
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Request-Headers': "Origin"
            }}).then(res => res.json())
        return todoList
    }catch(error) {
        return error
    }
    
}

export async function postTODO(title){
    try{
        const todoList = await fetch(`http://localhost:9000/.netlify/functions/todo-create?title=${title}`,{
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

export async function updateTODO(id, title){
    try{
        const todoList = await fetch(`http://localhost:9000/.netlify/functions/todo-update?id=${id}&title=${title}`,{
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

