import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(()=>{
    fetch('http://localhost:5000/users')
    .then(res=>res.json())
    .then(data=> setUsers(data))
  },[])

  const handleAddUser = e =>{
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;

    const user = {name , email}


    fetch('http://localhost:5000/user', {
  method: 'POST', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(user),
})
.then(response => response.json())
.then(data => {
  const newUsers = [...users, data]
  setUsers(newUsers);
  console.log('Success:', data);
})

  }

  return (
    <div className="App">
      <h1>react app data from node: {users.length} </h1>

      <form onSubmit={handleAddUser}>
        <input type="text" name="name" id=""  placeholder='Your name'/> <br />
        <input type="text" name="email" id=""  placeholder='Your email'/> <br />
        <input type="submit" value="Add User" />
      </form>

      {
        users.map(user=><li key={user.id}>Name: {user.name} Id: {user.id} Email: {user.email}</li>)
      }

    </div>
  );
}

export default App;
