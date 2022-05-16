import React, { useRef, useState } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

// 성능 최적화를 위해 연산된 값을 useMemo라는 Hook을 사용해 재사용하는 방법을 알아보자
function countActiveUsers(users){
  console.log('활성 사용자 수를 세는중...');
  return users.filter(user => user.active).length;
}
// active가 true인 사용자의 수를 세어서 화면에 렌더링
// 콘솔 메세지를 출력한 이유 : 호출될때마다 알수있게 하기 위함
// 여기서 발생하는 성능적 문제 : input의 값을 바꿀때도 countActiveUsers함수가 호출된다.

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
      email: 'public.velopert@gmail.com',
      active: true
    },
    {
      id: 2,
      username: 'lemon',
      email: 'lemon.velopert@gmail.com',
      active: false
    },
    {
      id: 3,
      username: 'jooyoung',
      email: 'jooyoung.velopert@gmail.com',
      active: false
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

  const onRemove = id => {
    // user.id가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듦
    // = user.id 가 id 인것을 제거함
    setUsers( users.filter(user => user.id !== id) )
  }

  const onToggle = id => {
    setUsers(
      users.map(user => 
          user.id === id ? {...user, active: !user.active} : user  
      )
    )
  }

  const count = countActiveUsers(users);
  return (
    <>
      <CreateUser 
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle}/>
      <div>활성사용자 수 : {count}</div>
    </>
  )
}

export default App;