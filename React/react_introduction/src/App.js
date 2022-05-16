import React, { useRef, useState, useMemo } from 'react';
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
// 활성 사용자 수를 세는건 users에 변화가 있을때만 세어야되는데 input값이 바뀔때도 리렌더링 되므로 
// 이런 불필요한 호출로 자원이 낭비된다. 이런 상황에서 useMeo라는 hook을 사용해 성능을 최적화 할 수 있다.
// Memo 는 memoized를 의미하는데, 이는 이전에 계산 한 값을 재사용한다는 의미를 가지고있다.


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

  // 첫번째 파라미터 연산할지 정의하는 함수
  // 두번째 파라미터 deps 배열, 이 배열 안에 내용이 바뀌면 등록한 함수를 호출해서 값 연산
  // 만약에 내용이 바뀌지 않았다면 이전에 연산한 값을 재사용
  const count = useMemo( () => countActiveUsers(users), [users] );
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