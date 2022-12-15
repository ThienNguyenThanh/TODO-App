import './App.css';

function App() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const todo = event.target.newTODO.value;
    console.log(todo);
  }
  return (
    <form onSubmit={handleSubmit}>
        <input type='text' placeholder="Enter things to do." name='newTODO'/>
        <button>Add</button>
    </form>
  );
}

export default App;
