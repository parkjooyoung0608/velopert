import React, {useRef, useState, useMemo} from 'react';
import './App.css';
// import Counter from './Counter';
// import InputSample from './InputSample';
import UserList from './UserList';
import CreateUser from './CreateUser';

function countActiveUsers(users){
  console.log('활성 사용자 수를 세는중...');
  return users.filter(user => user.active ).length;
}

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
          email: 'mirkduddl@naver.com',
          active: true
      },
      {
          id: 2,
          username: 'peddrtz',
          email: 'rdddl@naver.com',
          active: false
      },
      {
          id: 3,
          username: 'opert',
          email: 'irkdl@naver.com',
          active: true
      },
    ]
  )
const nextId = useRef(4);
const onCreate = () => {

  // Create 이벤트가 실행되면 Users state에 {} 객체 값이 추가!!
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

  const onRemove = (id) => {
    // console.log(id)
    // user.id가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열 만듦
    // = user.id 가 id 인 것을 제거함
    setUsers(users.filter(user => user.id !== id));
  }

  const onToggle = (id) => {
    setUsers(
      users.map( user =>
        user.id === id ? { 
          ...user, 
          active : !user.active 
        } : user )
    ) 
  }

  const count = useMemo(() => countActiveUsers(users), [users]);
  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      {/* 여기는 왜 value 값이 없을까? */}
      <UserList users={users} onRemove={onRemove} onToggle={onToggle}/>
      <div>활성사용자 수 : {count}</div>
    </>
  );
}

export default App;
