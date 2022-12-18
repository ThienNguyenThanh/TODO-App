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
