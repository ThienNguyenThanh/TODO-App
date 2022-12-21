import { useState} from 'react'
import { getTODO, postTODO, updateTODO, deleteTODO } from './fetch';
import {useQuery,useQueryClient, useMutation } from 'react-query';
import {Copyright,Link, Typography, TextField, Container, Box, Checkbox, Button, List, ListItem,ListItemIcon,ListItemText } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import { borderRadius } from '@mui/system';



export function TodoList() {
    // Set todo's state
  
    // const toggled = useRef()
    const [toggled, setToggled] = useState(-1)
  
  
    // Access the client
    const queryClient = useQueryClient()
  
    // Queries
    const {isLoading, error, data} = useQuery('todos', getTODO)
  
    // Mutations
    const addMutation = useMutation(title => postTODO(title), {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries('todos')
      },
    })
  
    const updateMutation = useMutation(({index, title}) => updateTODO(index, title), {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries('todos')
      },
    })
  
    const deleteMutation = useMutation(id => deleteTODO(id), {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries('todos')
      },
    })
  
    const handleAdd = (event) => {
      event.preventDefault();
      const todo = event.target.newTODO.value;
      addMutation.mutate(todo)
    }
  
    const handleDelete = (event) => {
      event.preventDefault();
      const id = event.target.id;
      deleteMutation.mutate(id);
    }  

    function TodoItem({...props}){
      return(
        (props.todoINDEX === toggled) ? (
          <input type="text" defaultValue={props.value} onBlur={props.handleBlur}/>
        ) : (
          <div>
            <li onDoubleClick={props.handleDoubleClick}>{props.value} <button id={props.todoID} onClick={props.handleDelete}>Delete</button></li>
  
          </div>
         
        )
      )
    }
  
    if (isLoading) return 'Loading...'
    if (error) return 'An error has occurred: ' + error.message
    
    return (
      <Container component="main" maxWidth="xs" sx={{backgroundColor: '#f5f5f5'}}>
        
        
        <Box

          sx={{
            marginTop: 8,
            bgcolor: 'background.paper',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderColor: 'text.primary',
            border: 1,
            borderRadius: '16px'
          }}
          >
            <Typography component="h1" variant="h5" sx={{marginTop: '50px'}}>
              TODO
            </Typography>
            <Box component="span" sx={{ p: 2, border: '1px dashed grey' }}>
              <Checkbox />a
            <ul>
              {data.data.map((todo, idx) => (
                  <TodoItem key={todo[0]}
                            todoID={todo[0]}
                            todoINDEX={idx}
                            value={todo[2]} 
                            handleDoubleClick={() => setToggled(idx)}
                            handleDelete={handleDelete}
                            handleBlur={(e)=> {
                                  e.preventDefault();
                                  const newTitle = e.target.value;
                                  
                                  if(newTitle !== todo[2]){
                                    updateMutation.mutate({index: todo[0], title: newTitle});
                                    setToggled(-1);
                                  }else{
                                    setToggled(-1);
                                  }
                            }}
                  />
              ))}
            </ul>
            </Box>
            
            
            <Box component="form" onSubmit={handleAdd} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="newTODO"
                label="Enter things todo"
                type="text"
              />
            </Box>
          </Box>

          {/* Footer  */}
          <Typography variant='body2' align='center' sx={{ mt: 10 }}>*Double Click To Edit</Typography>
          <Typography variant="body2" color="text.secondary" align="center" sx={{mt:1,  mb: 4 }}>
          {'Made with ❤️ '}
          <Link color="inherit" href="https://github.com/ThienNguyenThanh">
            Thien Nguyen.
          </Link>{' '}
        </Typography>

        
      </Container>
      
    )
  }