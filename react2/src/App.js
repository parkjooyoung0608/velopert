import React, {useRef, useState} from 'react';
import './App.css';
// import Counter from './Counter';
// import InputSample from './InputSample';
import UserList from './UserList';
import CreateUser from './CreateUser';

function App() {
  const [inputs, setInputs] = useState({
    username: '',
    email: ''
  })

  const {username, email} = inputs

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    })
  }

  const [users, setUsers]=useState(
    [
      {
          id: 1,
          username: 'velopert',
          email: 'mirkduddl@naver.com'
      },
      {
          id: 2,
          username: 'peddrtz',
          email: 'rdddl@naver.com'
      },
      {
          id: 3,
          username: 'opert',
          email: 'irkdl@naver.com'
      },
    ]
  )
const nextId = useRef(4);
const onCreate = () => {
  // 얜 뭐야...?
  // const user = {
  //   id:nextId.current,
  //   username,
  //   email
  // }

  // console.log(user.username);

  setUsers([
    ...users,
    {
      id:nextId.current,
      username,
      email
    }
  ])

  // 초기화
  setInputs({
    username:'',
    email:''
  })
  
  // id 숫자 값 +1 씩 증가
  nextId.current += 1 
}

  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      {/* 여기는 왜 value 값이 없을까? */}
      <UserList users={users}/>  
    </>
  );
}

export default App;
