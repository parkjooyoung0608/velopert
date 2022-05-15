import React, { useRef, useState } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

function App() {
  const [Inputs, setInputs] = useState({
    username: '',
    email:'',
  })
  const { username, email } = Inputs;

  const onChange = e => {
    const { name, value } = e.target;
    
    setInputs({
      ...Inputs,
      [name]: value
    })
  }
  
  const [users, setUsers] = useState([
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com'
    },
    {
      id: 2,
      username: 'lemon',
      email: 'lemon.velopert@gmail.com'
    },
    {
      id: 3,
      username: 'jooyoung',
      email: 'jooyoung.velopert@gmail.com'
    },
  ]);

  const nextId = useRef(4);
  const onCreate = () => {
    const user = {
      id: nextId.current,
      username,
      email
    }

    setUsers([...users, user]);
    
    setInputs({
      username:'',
      email:''
    })


    nextId.current += 1;
  }

  return (
    <>
      <CreateUser 
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users}/>
    </>
  )
}

export default App;